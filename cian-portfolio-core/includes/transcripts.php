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

	dbDelta(
		"CREATE TABLE {$table} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			video_id BIGINT UNSIGNED NOT NULL,
			start_ms INT UNSIGNED NOT NULL DEFAULT 0,
			end_ms INT UNSIGNED NOT NULL DEFAULT 0,
			text TEXT NOT NULL,
			sort INT UNSIGNED NOT NULL DEFAULT 0,
			PRIMARY KEY  (id),
			KEY video (video_id, sort),
			FULLTEXT KEY segment_text (text)
		) {$charset};"
	);
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
