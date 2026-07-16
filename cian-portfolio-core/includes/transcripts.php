<?php
/**
 * Transcript storage + import (docs/plan/09 §26, 04 §11).
 *
 * Segments live in a dedicated table (not postmeta): fast timestamp lookups,
 * pagination, clean search indexing. Status workflow lives in post meta:
 * none | automatic | draft | reviewed | published.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_transcripts(): void {
	// Editing metabox + REST wiring arrive with the admin build (Phase 4/5).
}

function cian_core_transcript_table(): string {
	global $wpdb;
	return $wpdb->prefix . 'cian_transcript_segments';
}

function cian_core_create_transcript_table(): void {
	global $wpdb;
	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	$table   = cian_core_transcript_table();
	$charset = $wpdb->get_charset_collate();

	// The FULLTEXT index is added separately (below): FULLTEXT is MySQL/MariaDB
	// only, and including it in the dbDelta CREATE TABLE breaks table creation
	// on SQLite (used by the local dev environment). Frontend transcript search
	// uses SearchWP (docs/plan/09 §28); this index only accelerates the native
	// LIKE fallback, so it is optional and its absence is harmless.
	dbDelta(
		"CREATE TABLE {$table} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			video_id BIGINT UNSIGNED NOT NULL,
			start_ms INT UNSIGNED NOT NULL DEFAULT 0,
			end_ms INT UNSIGNED NOT NULL DEFAULT 0,
			text TEXT NOT NULL,
			sort INT UNSIGNED NOT NULL DEFAULT 0,
			PRIMARY KEY  (id),
			KEY video (video_id, sort)
		) {$charset};"
	);

	cian_core_maybe_add_fulltext( $table, 'segment_text', 'text' );
}

/**
 * Add a FULLTEXT index if the database supports it. No-op (silently) on
 * engines without FULLTEXT (e.g. SQLite) and when the index already exists.
 */
function cian_core_maybe_add_fulltext( string $table, string $index, string $column ): void {
	global $wpdb;
	$suppress = $wpdb->suppress_errors( true );

	$existing = $wpdb->get_results( "SHOW INDEX FROM {$table} WHERE Key_name = '" . esc_sql( $index ) . "'" ); // phpcs:ignore WordPress.DB
	if ( empty( $existing ) ) {
		$wpdb->query( "ALTER TABLE {$table} ADD FULLTEXT {$index} ({$column})" ); // phpcs:ignore WordPress.DB
	}

	$wpdb->suppress_errors( $suppress );
}

/**
 * Parse a WebVTT string into segments.
 *
 * Defensive by design: cue payloads are stripped of tags; no HTML passes
 * through (docs/plan/12 §35 upload rules).
 *
 * @return array<int, array{start_ms:int, end_ms:int, text:string}>
 */
function cian_core_parse_vtt( string $vtt ): array {
	$segments = array();
	$blocks   = preg_split( '/\n\s*\n/', str_replace( "\r\n", "\n", $vtt ) ) ?: array();

	foreach ( $blocks as $block ) {
		if ( ! preg_match( '/(\d{1,2}:)?\d{2}:\d{2}\.\d{3}\s*-->\s*(\d{1,2}:)?\d{2}:\d{2}\.\d{3}/', $block, $m, PREG_OFFSET_CAPTURE ) ) {
			continue;
		}
		list( $times ) = explode( "\n", substr( $block, $m[0][1] ), 2 ) + array( '', '' );
		list( $start, $end ) = array_map( 'trim', explode( '-->', $times ) );
		$text = trim( wp_strip_all_tags( substr( $block, $m[0][1] + strlen( $times ) ) ) );
		if ( '' === $text ) {
			continue;
		}
		$segments[] = array(
			'start_ms' => cian_core_timestamp_to_ms( $start ),
			'end_ms'   => cian_core_timestamp_to_ms( $end ),
			'text'     => $text,
		);
	}

	return $segments;
}

/**
 * Parse a SubRip (SRT) string into segments.
 *
 * SRT uses comma decimals (00:00:01,000); we normalise to dots and reuse the
 * timestamp parser. Cue numbers and blank lines are ignored; markup stripped.
 *
 * @return array<int, array{start_ms:int, end_ms:int, text:string}>
 */
function cian_core_parse_srt( string $srt ): array {
	$segments = array();
	$blocks   = preg_split( '/\n\s*\n/', str_replace( "\r\n", "\n", trim( $srt ) ) ) ?: array();

	foreach ( $blocks as $block ) {
		$lines = explode( "\n", trim( $block ) );
		// Drop a leading numeric cue index if present.
		if ( isset( $lines[0] ) && ctype_digit( trim( $lines[0] ) ) ) {
			array_shift( $lines );
		}
		if ( empty( $lines ) || false === strpos( $lines[0], '-->' ) ) {
			continue;
		}
		$times = str_replace( ',', '.', array_shift( $lines ) );
		list( $start, $end ) = array_map( 'trim', explode( '-->', $times ) );
		$text = trim( wp_strip_all_tags( implode( ' ', $lines ) ) );
		if ( '' === $text ) {
			continue;
		}
		$segments[] = array(
			'start_ms' => cian_core_timestamp_to_ms( $start ),
			'end_ms'   => cian_core_timestamp_to_ms( $end ),
			'text'     => $text,
		);
	}

	return $segments;
}

/**
 * Parse plain text into segments. Lines beginning "[MM:SS]" / "[HH:MM:SS]"
 * carry a timestamp; otherwise segments are sequential with 0 timing (an
 * unedited automatic transcript the owner times later).
 *
 * @return array<int, array{start_ms:int, end_ms:int, text:string}>
 */
function cian_core_parse_plaintext( string $text ): array {
	$segments = array();
	foreach ( preg_split( '/\r\n|\r|\n/', trim( $text ) ) ?: array() as $line ) {
		$line = trim( $line );
		if ( '' === $line ) {
			continue;
		}
		$start_ms = 0;
		if ( preg_match( '/^\[((?:\d{1,2}:)?\d{1,2}:\d{2})\]\s*(.*)$/', $line, $m ) ) {
			$start_ms = cian_core_timestamp_to_ms( $m[1] );
			$line     = $m[2];
		}
		if ( '' !== $line ) {
			$segments[] = array( 'start_ms' => $start_ms, 'end_ms' => 0, 'text' => $line );
		}
	}
	return $segments;
}

/**
 * Format-dispatching transcript importer.
 *
 * @param string $format vtt | srt | text (defaults to sniffing the content).
 * @return array<int, array{start_ms:int, end_ms:int, text:string}>
 */
function cian_core_parse_transcript( string $raw, string $format = '' ): array {
	$format = strtolower( $format );
	if ( '' === $format ) {
		$format = ( false !== stripos( $raw, 'WEBVTT' ) ) ? 'vtt'
			: ( preg_match( '/-->.*,\d{3}/', $raw ) ? 'srt' : 'text' );
	}
	switch ( $format ) {
		case 'vtt':
			return cian_core_parse_vtt( $raw );
		case 'srt':
			return cian_core_parse_srt( $raw );
		default:
			return cian_core_parse_plaintext( $raw );
	}
}

/** "HH:MM:SS.mmm" | "MM:SS.mmm" → milliseconds. */
function cian_core_timestamp_to_ms( string $ts ): int {
	$parts = array_reverse( explode( ':', trim( $ts ) ) );
	$sec   = (float) ( $parts[0] ?? 0 );
	$sec  += 60 * (int) ( $parts[1] ?? 0 );
	$sec  += 3600 * (int) ( $parts[2] ?? 0 );
	return (int) round( $sec * 1000 );
}

/**
 * Replace a video's transcript with new segments (single transaction-ish).
 *
 * @param array<int, array{start_ms:int, end_ms:int, text:string}> $segments
 */
function cian_core_store_transcript( int $video_id, array $segments, string $status = 'draft' ): void {
	global $wpdb;
	$table = cian_core_transcript_table();

	$wpdb->delete( $table, array( 'video_id' => $video_id ), array( '%d' ) );
	foreach ( array_values( $segments ) as $sort => $seg ) {
		$wpdb->insert(
			$table,
			array(
				'video_id' => $video_id,
				'start_ms' => (int) $seg['start_ms'],
				'end_ms'   => (int) $seg['end_ms'],
				'text'     => sanitize_textarea_field( $seg['text'] ),
				'sort'     => $sort,
			),
			array( '%d', '%d', '%d', '%s', '%d' )
		);
	}

	update_post_meta( $video_id, 'video_transcript_status', sanitize_key( $status ) );
}

/**
 * Paged transcript fetch for REST (docs/plan/10 §31: ≤ ~30 KB per page).
 *
 * @return array{segments: array<int, array<string, mixed>>, total: int}
 */
function cian_core_get_transcript_page( int $video_id, int $page = 1, int $per_page = 200 ): array {
	global $wpdb;
	$table  = cian_core_transcript_table();
	$offset = max( 0, ( $page - 1 ) * $per_page );

	$segments = $wpdb->get_results(
		$wpdb->prepare(
			"SELECT start_ms, end_ms, text FROM {$table} WHERE video_id = %d ORDER BY sort LIMIT %d OFFSET %d", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
			$video_id,
			$per_page,
			$offset
		),
		ARRAY_A
	);
	$total = (int) $wpdb->get_var(
		$wpdb->prepare( "SELECT COUNT(*) FROM {$table} WHERE video_id = %d", $video_id ) // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	);

	return array(
		'segments' => $segments ?: array(),
		'total'    => $total,
	);
}
