<?php
/**
 * Channel / playlist import wizard logic (docs/plan/04 §9).
 *
 * Phase 5 module. Turns a channel connection or selected playlists into
 * WordPress video posts via cian_core_sync_run(). The admin UI lives in
 * admin-pages.php; this file holds the import orchestration only.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_video_import(): void {}

/**
 * List a channel's playlists for the import checklist UI.
 *
 * @return array<int, array{id: string, title: string, count: int}>|WP_Error
 */
function cian_core_list_channel_playlists( string $channel_id ) {
	$response = cian_core_yt_get(
		'playlists',
		array(
			'part'       => 'snippet,contentDetails',
			'channelId'  => $channel_id,
			'maxResults' => 50,
		)
	);
	if ( is_wp_error( $response ) ) {
		return $response;
	}

	return array_map(
		static fn ( array $item ): array => array(
			'id'    => (string) ( $item['id'] ?? '' ),
			'title' => (string) ( $item['snippet']['title'] ?? '' ),
			'count' => (int) ( $item['contentDetails']['itemCount'] ?? 0 ),
		),
		$response['items'] ?? array()
	);
}
