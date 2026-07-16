<?php
/**
 * Chapter parsing + render helpers (docs/plan/04 §13, 06 §20).
 *
 * Chapters are stored in the ACF `video_chapters` repeater. YouTube
 * description timestamps ("MM:SS Title") are parsed into a DRAFT the owner
 * confirms — never auto-published as authoritative.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_chapters(): void {}

/**
 * Parse "MM:SS Title" / "HH:MM:SS Title" lines from a description.
 *
 * @return array<int, array{start: string, title: string}>
 */
function cian_core_parse_chapter_lines( string $description ): array {
	$chapters = array();
	foreach ( preg_split( '/\r\n|\r|\n/', $description ) ?: array() as $line ) {
		if ( preg_match( '/^\s*((?:\d{1,2}:)?\d{1,2}:\d{2})\s+(.+?)\s*$/', $line, $m ) ) {
			$chapters[] = array(
				'start' => cian_core_sanitize_timestamp( $m[1] ),
				'title' => sanitize_text_field( $m[2] ),
			);
		}
	}
	return $chapters;
}

/** "HH:MM:SS" | "MM:SS" → seconds (for player seek). */
function cian_core_timestamp_to_seconds( string $ts ): int {
	$parts = array_reverse( explode( ':', trim( $ts ) ) );
	return (int) ( $parts[0] ?? 0 ) + 60 * (int) ( $parts[1] ?? 0 ) + 3600 * (int) ( $parts[2] ?? 0 );
}

/**
 * Fill each chapter's empty `end` with the next chapter's `start` (spec:
 * "end auto = next start"). The last chapter keeps whatever end it has.
 *
 * @param array<int, array<string, string>> $chapters Rows with `start` (+ optional `end`, `title`).
 * @return array<int, array<string, string>>
 */
function cian_core_fill_chapter_ends( array $chapters ): array {
	$count = count( $chapters );
	foreach ( $chapters as $i => &$chapter ) {
		if ( empty( $chapter['end'] ) && $i + 1 < $count ) {
			$chapter['end'] = $chapters[ $i + 1 ]['start'] ?? '';
		}
	}
	unset( $chapter );
	return $chapters;
}
