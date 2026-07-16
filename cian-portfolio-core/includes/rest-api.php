<?php
/**
 * REST API namespace cian/v1 (docs/plan/09 §26).
 *
 * Read endpoints are public and cached; the frontend world consumes /world,
 * transcripts paginate via /videos/{id}/transcript. Write endpoints (webhook,
 * report-outdated) land in Phase 5 with nonce/HMAC guards.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_rest_api(): void {
	add_action( 'rest_api_init', 'cian_core_register_rest_routes' );
	// Bust the composed world payload whenever relevant content changes.
	foreach ( array( 'project', 'guide', 'video', 'review', 'tutorial_series' ) as $type ) {
		add_action( "save_post_{$type}", 'cian_core_bust_world_cache' );
	}
}

function cian_core_register_rest_routes(): void {
	register_rest_route(
		'cian/v1',
		'/world',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'cian_core_rest_world',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		'cian/v1',
		'/videos/(?P<id>\d+)/transcript',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'cian_core_rest_transcript',
			'permission_callback' => '__return_true',
			'args'                => array(
				'id'   => array( 'sanitize_callback' => 'absint' ),
				'page' => array(
					'default'           => 1,
					'sanitize_callback' => 'absint',
				),
			),
		)
	);
}

/**
 * Composed hub payload for the Digital District (cached, docs/plan/09 §27).
 */
function cian_core_rest_world(): WP_REST_Response {
	$payload = get_transient( 'cian_world_payload' );

	if ( false === $payload ) {
		$payload = array(
			'districts' => cian_core_world_districts(),
			'beacons'   => cian_core_world_beacons(),
			'generated' => gmdate( 'c' ),
		);
		set_transient( 'cian_world_payload', $payload, 15 * MINUTE_IN_SECONDS );
	}

	$response = new WP_REST_Response( $payload );
	$response->header( 'Cache-Control', 'public, max-age=300' );
	return $response;
}

/** Static district registry — labels + canonical URLs (docs/plan/05 §14). */
function cian_core_world_districts(): array {
	return array(
		array( 'id' => 'arrival', 'label' => 'Arrival Platform', 'url' => home_url( '/' ) ),
		array( 'id' => 'projects', 'label' => 'Project Sector', 'url' => get_post_type_archive_link( 'project' ) ),
		array( 'id' => 'knowledge', 'label' => 'Knowledge Archive', 'url' => get_post_type_archive_link( 'guide' ) ),
		array( 'id' => 'studio', 'label' => 'Tutorial Studio', 'url' => get_post_type_archive_link( 'video' ) ),
		array( 'id' => 'lab', 'label' => 'Review Laboratory', 'url' => get_post_type_archive_link( 'review' ) ),
		array( 'id' => 'identity', 'label' => 'Identity Chamber', 'url' => home_url( '/about/' ) ),
		array( 'id' => 'relay', 'label' => 'Communications Relay', 'url' => home_url( '/contact/' ) ),
		array( 'id' => 'experimental', 'label' => 'Experimental Sector', 'url' => home_url( '/lab/' ) ),
	);
}

/** Featured-project beacons for the Project Sector. */
function cian_core_world_beacons(): array {
	$projects = get_posts(
		array(
			'post_type'      => 'project',
			'posts_per_page' => 8,
			'meta_key'       => 'project_featured',
			'meta_value'     => '1',
			'no_found_rows'  => true,
		)
	);

	return array_map(
		static function ( WP_Post $p ): array {
			return array(
				'id'      => (int) $p->ID,
				'title'   => cian_core_field( 'project_short_title', $p->ID ) ?: get_the_title( $p ),
				'summary' => (string) cian_core_field( 'project_summary', $p->ID ),
				'accent'  => (string) cian_core_field( 'project_accent_color', $p->ID ),
				'object'  => (string) cian_core_field( 'project_object_id', $p->ID ),
				'url'     => get_permalink( $p ),
			);
		},
		$projects
	);
}

function cian_core_bust_world_cache(): void {
	delete_transient( 'cian_world_payload' );
}

/** Paged transcript segments (docs/plan/06 §20 TranscriptPanel contract). */
function cian_core_rest_transcript( WP_REST_Request $request ): WP_REST_Response|WP_Error {
	$video_id = (int) $request['id'];
	if ( 'video' !== get_post_type( $video_id ) || 'publish' !== get_post_status( $video_id ) ) {
		return new WP_Error( 'cian_not_found', 'Video not found.', array( 'status' => 404 ) );
	}

	$page = max( 1, (int) $request['page'] );
	$data = cian_core_get_transcript_page( $video_id, $page );

	$response = new WP_REST_Response(
		array(
			'video'    => $video_id,
			'status'   => get_post_meta( $video_id, 'video_transcript_status', true ) ?: 'none',
			'page'     => $page,
			'total'    => $data['total'],
			'segments' => $data['segments'],
		)
	);
	$response->header( 'Cache-Control', 'public, max-age=3600' );
	return $response;
}
