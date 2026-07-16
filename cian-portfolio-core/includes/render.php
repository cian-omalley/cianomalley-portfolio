<?php
/**
 * Render components (docs/plan/06 §20–21).
 *
 * Plugin-owned HTML for the video and guide components that Oxygen templates
 * place via shortcodes. Each component is a PURE render function that takes
 * explicit data (unit-testable, no WordPress needed) plus a thin shortcode
 * wrapper that reads ACF/post data and calls it.
 *
 * The one rule that matters most: the video facade emits ZERO player markup
 * and ZERO requests to YouTube — activation happens client-side after consent
 * (assets/js/src/video-player.js, docs/plan/11 §33).
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_render(): void {
	add_shortcode( 'cian_video_facade', 'cian_core_sc_video_facade' );
	add_shortcode( 'cian_chapters', 'cian_core_sc_chapters' );
	add_shortcode( 'cian_command', 'cian_core_sc_command' );
}

/* -------------------------------------------------------------------------
 * Pure renderers
 * ---------------------------------------------------------------------- */

/**
 * Consent-safe video facade. No <iframe>, no <video> — a click target the
 * player JS upgrades after consent. Local thumbnail only (no YouTube hotlink).
 *
 * @param array{yt_id?:string, local_src?:string, title?:string, thumb?:string, duration?:string} $a
 */
function cian_core_render_video_facade( array $a ): string {
	$yt    = isset( $a['yt_id'] ) ? cian_core_sanitize_youtube_id( (string) $a['yt_id'] ) : '';
	$local = (string) ( $a['local_src'] ?? '' );
	if ( '' === $yt && '' === $local ) {
		return '';
	}

	$title = (string) ( $a['title'] ?? 'Video' );
	$thumb = (string) ( $a['thumb'] ?? '' );
	$dur   = (string) ( $a['duration'] ?? '' );

	$attrs = sprintf( ' data-title="%s"', esc_attr( $title ) );
	if ( '' !== $yt ) {
		$attrs .= sprintf( ' data-yt-id="%s"', esc_attr( $yt ) );
	}
	if ( '' !== $local ) {
		$attrs .= sprintf( ' data-local-src="%s"', esc_url( $local ) );
	}
	$style = '' !== $thumb ? sprintf( ' style="background-image:url(%s)"', esc_url( $thumb ) ) : '';

	$out  = sprintf( '<button type="button" class="cian-facade" aria-label="%s"%s%s>', esc_attr( 'Play: ' . $title ), $attrs, $style );
	$out .= '<span class="cian-facade__play" aria-hidden="true">&#9654;</span>';
	if ( '' !== $dur ) {
		$out .= sprintf( '<span class="cian-facade__badge">%s</span>', esc_html( $dur ) );
	}
	$out .= '</button>';
	return $out;
}

/**
 * Chapter list. Each row deep-links a player seek (data-start in seconds).
 *
 * @param array<int, array<string, string>> $chapters Rows with start/title
 *        (accepts `start`/`title` or ACF `chapter_start`/`chapter_title`).
 */
function cian_core_render_chapter_list( array $chapters, string $target = '' ): string {
	$rows = '';
	foreach ( $chapters as $c ) {
		$start = (string) ( $c['start'] ?? $c['chapter_start'] ?? '' );
		$title = (string) ( $c['title'] ?? $c['chapter_title'] ?? '' );
		if ( '' === $start && '' === $title ) {
			continue;
		}
		$tgt   = '' !== $target ? sprintf( ' data-target="%s"', esc_attr( $target ) ) : '';
		$rows .= sprintf(
			'<li data-start="%d"%s><time>%s</time> %s</li>',
			cian_core_timestamp_to_seconds( $start ),
			$tgt,
			esc_html( $start ),
			esc_html( $title )
		);
	}
	return '' === $rows ? '' : '<ol class="cian-chapters">' . $rows . '</ol>';
}

/**
 * Copyable command block (assets/js/src/... wires the copy button).
 */
function cian_core_render_command_block( string $code, string $lang = '', string $note = '' ): string {
	if ( '' === trim( $code ) ) {
		return '';
	}
	$out  = '<div class="cian-command">';
	if ( '' !== $lang ) {
		$out .= sprintf( '<span class="cian-command__lang">%s</span>', esc_html( $lang ) );
	}
	$out .= '<button type="button" class="cian-command__copy" aria-label="Copy command">Copy</button>';
	$out .= sprintf( '<pre><code>%s</code></pre>', esc_html( $code ) );
	if ( '' !== $note ) {
		$out .= sprintf( '<p class="cian-command__note">%s</p>', esc_html( $note ) );
	}
	return $out . '</div>';
}

/** Info / warning callout. */
function cian_core_render_callout( string $body, string $type = 'info' ): string {
	$type = 'warning' === $type ? 'warning' : 'info';
	return sprintf( '<div class="cian-callout cian-callout--%s" role="note">%s</div>', esc_attr( $type ), wp_kses_post( $body ) );
}

/* -------------------------------------------------------------------------
 * Shortcode wrappers (read ACF/post data → call the pure renderer)
 * ---------------------------------------------------------------------- */

function cian_core_sc_video_facade( $atts ): string {
	$atts = shortcode_atts( array( 'id' => get_the_ID() ), $atts, 'cian_video_facade' );
	$id   = (int) $atts['id'];
	return cian_core_render_video_facade(
		array(
			'yt_id'    => (string) get_field( 'video_youtube_id', $id ),
			'title'    => get_the_title( $id ),
			'thumb'    => (string) get_the_post_thumbnail_url( $id, 'large' ),
			'duration' => (string) get_field( 'video_duration', $id ),
		)
	);
}

function cian_core_sc_chapters( $atts ): string {
	$atts     = shortcode_atts( array( 'id' => get_the_ID() ), $atts, 'cian_chapters' );
	$chapters = get_field( 'video_chapters', (int) $atts['id'] );
	return cian_core_render_chapter_list( is_array( $chapters ) ? $chapters : array() );
}

function cian_core_sc_command( $atts, $content = '' ): string {
	$atts = shortcode_atts( array( 'lang' => '', 'note' => '' ), $atts, 'cian_command' );
	return cian_core_render_command_block( (string) $content, (string) $atts['lang'], (string) $atts['note'] );
}
