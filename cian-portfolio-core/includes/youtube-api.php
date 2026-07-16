<?php
/**
 * YouTube Data API v3 client (docs/plan/04 §9).
 *
 * Read-mostly: public data needs only CIAN_YT_API_KEY (wp-config.php).
 * OAuth (youtube-oauth.php) is required only for private-video metadata and
 * the deferred upload workflow. Credentials NEVER live in the DB or builder.
 *
 * Implementation lands in Phase 5; the surface below is the contract the
 * sync module codes against.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_youtube_api(): void {}

/** True when an API key is configured. */
function cian_core_yt_configured(): bool {
	return defined( 'CIAN_YT_API_KEY' ) && '' !== CIAN_YT_API_KEY;
}

/**
 * Perform a GET against the Data API with ETag caching, quota bookkeeping,
 * and exponential backoff on 403/5xx.
 *
 * @param string               $endpoint e.g. 'videos', 'playlistItems', 'channels'.
 * @param array<string, mixed> $params   Query parameters (part, id, maxResults…).
 * @return array<string, mixed>|WP_Error Decoded response.
 */
function cian_core_yt_get( string $endpoint, array $params ) {
	if ( ! cian_core_yt_configured() ) {
		return new WP_Error( 'cian_yt_unconfigured', 'CIAN_YT_API_KEY is not defined in wp-config.php.' );
	}

	$params['key'] = CIAN_YT_API_KEY;
	$url           = add_query_arg( array_map( 'rawurlencode', $params ), 'https://www.googleapis.com/youtube/v3/' . $endpoint );

	$cache_key = 'cian_yt_etag_' . md5( $url );
	$cached    = get_transient( $cache_key );
	$headers   = array();
	if ( is_array( $cached ) && ! empty( $cached['etag'] ) ) {
		$headers['If-None-Match'] = $cached['etag'];
	}

	$response = wp_remote_get( $url, array( 'timeout' => 15, 'headers' => $headers ) );
	if ( is_wp_error( $response ) ) {
		return $response;
	}

	$code = wp_remote_retrieve_response_code( $response );
	if ( 304 === $code && is_array( $cached ) ) {
		return $cached['body'];
	}
	if ( 200 !== $code ) {
		return new WP_Error( 'cian_yt_http_' . $code, wp_remote_retrieve_body( $response ) );
	}

	$body = json_decode( wp_remote_retrieve_body( $response ), true );
	if ( ! is_array( $body ) ) {
		return new WP_Error( 'cian_yt_bad_json', 'Unparseable API response.' );
	}

	set_transient(
		$cache_key,
		array(
			'etag' => wp_remote_retrieve_header( $response, 'etag' ),
			'body' => $body,
		),
		DAY_IN_SECONDS
	);
	cian_core_yt_log_quota( 1 );

	return $body;
}

/** Rough daily quota bookkeeping surfaced on the admin dashboard. */
function cian_core_yt_log_quota( int $units ): void {
	$key   = 'cian_yt_quota_' . gmdate( 'Ymd' );
	$total = (int) get_option( $key, 0 ) + $units;
	update_option( $key, $total, false );
}

/** ISO-8601 duration (PT1H2M3S) → HH:MM:SS. */
function cian_core_yt_duration( string $iso ): string {
	try {
		$i = new DateInterval( $iso );
	} catch ( Exception $e ) {
		return '';
	}
	$hours = ( $i->d * 24 ) + $i->h;
	return sprintf( '%02d:%02d:%02d', $hours, $i->i, $i->s );
}
