<?php
/**
 * Centralized security helpers (docs/plan/12 §35).
 *
 * Every module sanitizes inputs through these helpers and escapes at render.
 * Upload rules: modest caps on purpose — large video masters never enter WP
 * uploads (policy, docs/plan/12 §36).
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_security(): void {
	add_filter( 'upload_mimes', 'cian_core_restrict_upload_mimes' );
	add_filter( 'map_meta_cap', 'cian_core_map_portfolio_cap', 10, 2 );
}

/** Custom capability gate for plugin admin screens/actions. */
function cian_core_map_portfolio_cap( array $caps, string $cap ): array {
	if ( 'manage_cian_portfolio' === $cap ) {
		return array( 'manage_options' );
	}
	return $caps;
}

/** Allowlist additions/removals for uploads (VTT in; executables never). */
function cian_core_restrict_upload_mimes( array $mimes ): array {
	$mimes['vtt'] = 'text/vtt';
	$mimes['srt'] = 'text/plain';
	unset( $mimes['exe'], $mimes['swf'] );
	return $mimes;
}

/** Sanitize a YouTube video ID (11 chars, strict charset) or return ''. */
function cian_core_sanitize_youtube_id( string $id ): string {
	return preg_match( '/^[A-Za-z0-9_-]{11}$/', $id ) ? $id : '';
}

/** Sanitize an HH:MM:SS(.mmm) timestamp or return ''. */
function cian_core_sanitize_timestamp( string $ts ): string {
	return preg_match( '/^(\d{1,2}:)?\d{1,2}:\d{2}(\.\d{1,3})?$/', trim( $ts ) ) ? trim( $ts ) : '';
}

/**
 * Simple fixed-window rate limiter for public POST endpoints.
 * Returns true when the caller is within limits.
 */
function cian_core_rate_limit( string $action, int $max = 5, int $window = MINUTE_IN_SECONDS * 10 ): bool {
	$ip    = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$key   = 'cian_rl_' . md5( $action . '|' . $ip );
	$count = (int) get_transient( $key );

	if ( $count >= $max ) {
		return false;
	}
	set_transient( $key, $count + 1, $window );
	return true;
}
