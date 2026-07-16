<?php
/**
 * YouTube synchronization orchestration (docs/plan/04 §11).
 *
 * Flow: channels.list → uploads playlist → playlistItems pages → videos.list
 * batches (50 ids) → map → upsert (respecting field locks) → deletion
 * detection → run log. Reads only cached WP data on the frontend, so the site
 * is unaffected when the API is down.
 *
 * NOTE (docs/discovery.md #3): the channel does not exist yet — this first
 * runs against the new channel's first uploads (the "building this portfolio
 * with Oxygen 6" series). Set the channel id in the `cian_yt_channel_id`
 * option (or pass channel_id) before a full sync.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_youtube_sync(): void {}

/**
 * Run a sync pass.
 *
 * @param array{scope?:string, video_id?:string, playlist_id?:string, channel_id?:string, dry_run?:bool} $args
 * @return array{created:int, updated:int, flagged:int, errors:array<int,string>}|WP_Error
 */
function cian_core_sync_run( array $args = array() ) {
	if ( ! cian_core_yt_configured() ) {
		return new WP_Error( 'cian_yt_unconfigured', 'Configure CIAN_YT_API_KEY before syncing.' );
	}

	$result = array( 'created' => 0, 'updated' => 0, 'flagged' => 0, 'errors' => array() );
	$dry    = ! empty( $args['dry_run'] );

	// 1. Determine which video IDs to sync.
	if ( ! empty( $args['video_id'] ) ) {
		$one       = cian_core_sanitize_youtube_id( (string) $args['video_id'] );
		$video_ids = '' !== $one ? array( $one ) : array();
	} elseif ( ! empty( $args['playlist_id'] ) ) {
		$video_ids = cian_core_sync_collect_playlist_ids( (string) $args['playlist_id'], $result );
	} else {
		$channel = (string) ( $args['channel_id'] ?? get_option( 'cian_yt_channel_id', '' ) );
		if ( '' === $channel ) {
			return new WP_Error( 'cian_no_channel', 'Set cian_yt_channel_id (or pass channel_id) before a full sync.' );
		}
		$uploads = cian_core_sync_uploads_playlist( $channel );
		if ( is_wp_error( $uploads ) ) {
			return $uploads;
		}
		$video_ids = cian_core_sync_collect_playlist_ids( $uploads, $result );
	}

	$video_ids = array_values( array_unique( $video_ids ) );

	// 2. Fetch details + upsert, 50 ids per request.
	$seen = array();
	foreach ( array_chunk( $video_ids, 50 ) as $chunk ) {
		$resp = cian_core_yt_get(
			'videos',
			array(
				'part'       => 'snippet,contentDetails,status,liveStreamingDetails',
				'id'         => implode( ',', $chunk ),
				'maxResults' => 50,
			)
		);
		if ( is_wp_error( $resp ) ) {
			$result['errors'][] = $resp->get_error_message();
			continue;
		}
		foreach ( ( $resp['items'] ?? array() ) as $item ) {
			$mapped         = cian_core_yt_map_video( $item );
			$seen[]         = $mapped['youtube_id'];
			$up             = cian_core_sync_upsert_video( $mapped, $dry );
			if ( 'created' === $up['action'] ) {
				$result['created']++;
			} elseif ( 'updated' === $up['action'] ) {
				$result['updated']++;
			} elseif ( 'error' === $up['action'] ) {
				$result['errors'][] = (string) ( $up['error'] ?? 'upsert failed' );
			}
		}
	}

	// 3. Deletion detection (full sync only).
	if ( empty( $args['video_id'] ) && empty( $args['playlist_id'] ) && ! $dry ) {
		$result['flagged'] = cian_core_sync_flag_deleted( $seen );
	}

	if ( ! $dry ) {
		update_option( 'cian_last_sync', array( 'time' => time(), 'result' => $result ), false );
	}
	return $result;
}

/* -------------------------------------------------------------------------
 * Pure mapping (unit-tested)
 * ---------------------------------------------------------------------- */

/**
 * Map a videos.list API item to WP-ready fields.
 *
 * @param array<string, mixed> $item
 * @return array<string, mixed>
 */
function cian_core_yt_map_video( array $item ): array {
	$snippet = is_array( $item['snippet'] ?? null ) ? $item['snippet'] : array();
	$content = is_array( $item['contentDetails'] ?? null ) ? $item['contentDetails'] : array();
	$status  = is_array( $item['status'] ?? null ) ? $item['status'] : array();

	return array(
		'youtube_id'  => cian_core_sanitize_youtube_id( (string) ( $item['id'] ?? '' ) ),
		'title'       => sanitize_text_field( (string) ( $snippet['title'] ?? '' ) ),
		'description' => (string) ( $snippet['description'] ?? '' ),
		'published'   => ! empty( $snippet['publishedAt'] ) ? gmdate( 'Y-m-d', strtotime( (string) $snippet['publishedAt'] ) ) : '',
		'channel'     => sanitize_text_field( (string) ( $snippet['channelTitle'] ?? '' ) ),
		'tags'        => array_values( array_map( 'sanitize_text_field', (array) ( $snippet['tags'] ?? array() ) ) ),
		'duration'    => cian_core_yt_duration( (string) ( $content['duration'] ?? '' ) ),
		'thumbnail'   => cian_core_yt_best_thumbnail( is_array( $snippet['thumbnails'] ?? null ) ? $snippet['thumbnails'] : array() ),
		'privacy'     => sanitize_text_field( (string) ( $status['privacyStatus'] ?? '' ) ),
		'is_live'     => isset( $item['liveStreamingDetails'] ),
	);
}

/**
 * Highest-resolution available thumbnail URL.
 *
 * @param array<string, mixed> $thumbnails
 */
function cian_core_yt_best_thumbnail( array $thumbnails ): string {
	foreach ( array( 'maxres', 'standard', 'high', 'medium', 'default' ) as $size ) {
		if ( ! empty( $thumbnails[ $size ]['url'] ) ) {
			return (string) $thumbnails[ $size ]['url'];
		}
	}
	return '';
}

/* -------------------------------------------------------------------------
 * WordPress I/O
 * ---------------------------------------------------------------------- */

/**
 * Create or update the WP video post for a mapped item, respecting locks.
 *
 * @param array<string, mixed> $m
 * @return array{id:int, action:string, error?:string}
 */
function cian_core_sync_upsert_video( array $m, bool $dry_run = false ) {
	$yt_id = (string) $m['youtube_id'];
	if ( '' === $yt_id ) {
		return array( 'id' => 0, 'action' => 'error', 'error' => 'missing youtube id' );
	}

	$existing = cian_core_find_video_by_yt_id( $yt_id );
	if ( $dry_run ) {
		return array( 'id' => $existing, 'action' => $existing ? 'updated' : 'created' );
	}

	$title_locked = $existing && get_post_meta( $existing, 'video_title_locked', true );
	$desc_locked  = $existing && get_post_meta( $existing, 'video_desc_locked', true );

	$postarr = array( 'post_type' => 'video', 'post_status' => 'publish' );
	if ( ! $title_locked ) {
		$postarr['post_title'] = $m['title'];
	}
	if ( ! $desc_locked ) {
		$postarr['post_content'] = $m['description'];
	}

	if ( $existing ) {
		$postarr['ID'] = $existing;
		$id            = wp_update_post( $postarr, true );
		$action        = 'updated';
	} else {
		if ( empty( $postarr['post_title'] ) ) {
			$postarr['post_title'] = $m['title'];
		}
		$id     = wp_insert_post( $postarr, true );
		$action = 'created';
	}

	if ( is_wp_error( $id ) ) {
		return array( 'id' => 0, 'action' => 'error', 'error' => $id->get_error_message() );
	}

	$id = (int) $id;
	update_post_meta( $id, 'video_youtube_id', $yt_id );
	update_post_meta( $id, 'video_source', 'YouTube' );
	if ( '' !== $m['duration'] ) {
		update_post_meta( $id, 'video_duration', $m['duration'] );
	}
	if ( '' !== $m['published'] ) {
		update_post_meta( $id, 'video_publication_date', $m['published'] );
	}
	if ( '' !== $m['channel'] ) {
		update_post_meta( $id, 'video_channel_name', $m['channel'] );
	}
	update_post_meta( $id, 'video_privacy', $m['privacy'] );
	update_post_meta( $id, 'video_sync_status', 'Synced' );
	update_post_meta( $id, 'video_last_synced', gmdate( 'Y-m-d H:i:s' ) );

	// Thumbnail sideloading + tag→technology mapping are deferred (media
	// sideload + term allowlist) — they run in the admin import flow.
	return array( 'id' => $id, 'action' => $action );
}

/** channels.list → the channel's uploads playlist id. */
function cian_core_sync_uploads_playlist( string $channel_id ) {
	$resp = cian_core_yt_get( 'channels', array( 'part' => 'contentDetails', 'id' => $channel_id ) );
	if ( is_wp_error( $resp ) ) {
		return $resp;
	}
	$uploads = $resp['items'][0]['contentDetails']['relatedPlaylists']['uploads'] ?? '';
	return '' !== $uploads ? (string) $uploads : new WP_Error( 'cian_no_uploads', 'Uploads playlist not found for channel.' );
}

/**
 * Page through a playlist and collect its video IDs.
 *
 * @param array<string, mixed> $result Accumulates errors by reference.
 * @return array<int, string>
 */
function cian_core_sync_collect_playlist_ids( string $playlist_id, array &$result ): array {
	$ids  = array();
	$page = '';
	do {
		$params = array( 'part' => 'contentDetails', 'playlistId' => $playlist_id, 'maxResults' => 50 );
		if ( '' !== $page ) {
			$params['pageToken'] = $page;
		}
		$resp = cian_core_yt_get( 'playlistItems', $params );
		if ( is_wp_error( $resp ) ) {
			$result['errors'][] = $resp->get_error_message();
			break;
		}
		foreach ( ( $resp['items'] ?? array() ) as $it ) {
			$vid = (string) ( $it['contentDetails']['videoId'] ?? '' );
			if ( '' !== $vid ) {
				$ids[] = $vid;
			}
		}
		$page = (string) ( $resp['nextPageToken'] ?? '' );
	} while ( '' !== $page );

	return $ids;
}

/**
 * Flag WP videos whose YouTube id no longer appears in the channel.
 *
 * @param array<int, string> $seen_ids
 */
function cian_core_sync_flag_deleted( array $seen_ids ): int {
	$flagged = 0;
	$all     = get_posts(
		array(
			'post_type'      => 'video',
			'post_status'    => 'any',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'meta_key'       => 'video_youtube_id',
			'no_found_rows'  => true,
		)
	);
	foreach ( $all as $pid ) {
		$yt = (string) get_post_meta( $pid, 'video_youtube_id', true );
		if ( '' !== $yt && ! in_array( $yt, $seen_ids, true ) ) {
			update_post_meta( $pid, 'video_sync_status', 'Deleted on YouTube' );
			$flagged++;
		}
	}
	return $flagged;
}

/** Find the WP post for a YouTube ID (duplicate prevention). */
function cian_core_find_video_by_yt_id( string $yt_id ): int {
	$yt_id = cian_core_sanitize_youtube_id( $yt_id );
	if ( '' === $yt_id ) {
		return 0;
	}
	$found = get_posts(
		array(
			'post_type'      => 'video',
			'post_status'    => 'any',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_key'       => 'video_youtube_id',
			'meta_value'     => $yt_id,
			'no_found_rows'  => true,
		)
	);
	return $found ? (int) $found[0] : 0;
}
