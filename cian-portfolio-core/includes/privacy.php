<?php
/**
 * Privacy / consent (docs/plan/11 §33).
 *
 * The video facade (VideoFacade, video-player.js) never contacts Google
 * before consent — thumbnails are cached locally. This module exposes the
 * consent-state bridge the facade reads and registers WP's personal-data
 * exporter/eraser for form submissions.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_privacy(): void {
	add_action( 'wp_head', 'cian_core_consent_bootstrap', 1 );
	// Personal-data exporter/eraser for contact submissions are registered
	// with the form integration in Phase 4.
}

/**
 * Emit a tiny consent-state object the facade reads before loading any
 * YouTube resource. Default: not granted (contextual per-click consent).
 */
function cian_core_consent_bootstrap(): void {
	$config = array(
		'youtube'    => array(
			'granted'  => false,               // contextual consent by default
			'provider' => 'YouTube (Google)',
			'policy'   => esc_url( home_url( '/privacy/' ) ),
		),
		'rememberKey' => 'cian_consent_youtube',
	);
	echo "\n<script>window.cianConsent = " . wp_json_encode( $config ) . ";</script>\n";
}
