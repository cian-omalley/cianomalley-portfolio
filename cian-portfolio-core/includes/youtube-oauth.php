<?php
/**
 * Optional OAuth 2.0 for YouTube (docs/plan/04 §9–10).
 *
 * Needed only for private-video metadata and the DEFERRED upload workflow
 * (Workflow B — rejected for implementation until hosting/queue suit it).
 * Refresh tokens are encrypted at rest with libsodium; the key lives in
 * wp-config.php (CIAN_YT_TOKEN_KEY), never in the database.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_youtube_oauth(): void {}

function cian_core_oauth_configured(): bool {
	return defined( 'CIAN_YT_OAUTH_CLIENT_ID' ) && defined( 'CIAN_YT_OAUTH_CLIENT_SECRET' ) && defined( 'CIAN_YT_TOKEN_KEY' );
}

/** Encrypt a token for storage (sodium secretbox). */
function cian_core_encrypt_token( string $token ): string {
	$key   = base64_decode( CIAN_YT_TOKEN_KEY );
	$nonce = random_bytes( SODIUM_CRYPTO_SECRETBOX_NONCEBYTES );
	return base64_encode( $nonce . sodium_crypto_secretbox( $token, $nonce, $key ) );
}

/** Decrypt a stored token; returns '' on failure. */
function cian_core_decrypt_token( string $stored ): string {
	$raw = base64_decode( $stored, true );
	if ( false === $raw || strlen( $raw ) <= SODIUM_CRYPTO_SECRETBOX_NONCEBYTES ) {
		return '';
	}
	$key    = base64_decode( CIAN_YT_TOKEN_KEY );
	$nonce  = substr( $raw, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES );
	$cipher = substr( $raw, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES );
	$plain  = sodium_crypto_secretbox_open( $cipher, $nonce, $key );
	return false === $plain ? '' : $plain;
}

// TODO(Phase 5, optional): auth-code flow endpoints, refresh, revoke
// ("Disconnect" must call Google's revoke endpoint AND wipe local tokens —
// docs/plan/11 §33 revocation process).
