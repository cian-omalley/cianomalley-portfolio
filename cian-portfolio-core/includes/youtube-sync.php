<?php
/**
 * YouTube synchronization orchestration (docs/plan/04 §11).
 *
 * Phase 5 module. Contract:
 *  - cian_core_sync_run( scope ) — full | single video | single playlist
 *  - diff-based updates keyed on video_youtube_id (unique)
 *  - locked fields (video_title_locked etc.) are never overwritten
 *  - deleted-on-YouTube keeps the WP post, flags status, hides player
 *  - every run writes a log entry (kept 90 days) + attention flags
 *
 * NOTE (docs/discovery.md #3): the channel does not exist yet — this module
 * will first be exercised against the new channel's first uploads (the
 * "building this portfolio with Oxygen 6" series).
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_youtube_sync(): void {}

/**
 * Run a sync pass.
 *
 * @param array{scope?: string, video_id?: string, playlist_id?: string, dry_run?: bool} $args
 * @return array{created: int, updated: int, flagged: int, errors: string[]}|WP_Error
 */
function cian_core_sync_run( array $args = array() ) {
	if ( ! cian_core_yt_configured() ) {
		return new WP_Error( 'cian_yt_unconfigured', 'Configure CIAN_YT_API_KEY before syncing.' );
	}

	// TODO(Phase 5): channels.list → uploads playlist → playlistItems pages →
	// videos.list batches (50 ids) → diff/create/update → thumbnails →
	// playlist terms → deletion detection → run log.
	return new WP_Error( 'cian_not_implemented', 'YouTube sync is scheduled for Phase 5 (see docs/plan/13).' );
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
