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
	add_shortcode( 'cian_guide_steps', 'cian_core_sc_guide_steps' );
	add_shortcode( 'cian_guide_toc', 'cian_core_sc_guide_toc' );
	add_shortcode( 'cian_review_scores', 'cian_core_sc_review_scores' );
	add_shortcode( 'cian_pros_cons', 'cian_core_sc_pros_cons' );
	add_shortcode( 'cian_spec_table', 'cian_core_sc_spec_table' );
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

/** Syntax-highlightable code block with a filename header + copy button. */
function cian_core_render_code_block( string $code, string $lang = '', string $filename = '' ): string {
	if ( '' === trim( $code ) ) {
		return '';
	}
	$out = '<div class="cian-code">';
	if ( '' !== $filename ) {
		$out .= sprintf( '<span class="cian-code__file">%s</span>', esc_html( $filename ) );
	}
	$out .= '<button type="button" class="cian-command__copy" aria-label="Copy code">Copy</button>';
	$out .= sprintf( '<pre><code class="language-%s">%s</code></pre>', esc_attr( $lang ), esc_html( $code ) );
	return $out . '</div>';
}

/** Download link. Accepts an ACF file array or a plain URL string. */
function cian_core_render_download( $file, string $label = '' ): string {
	$url = is_array( $file ) ? (string) ( $file['url'] ?? '' ) : (string) $file;
	if ( '' === $url ) {
		return '';
	}
	if ( '' === $label ) {
		$label = is_array( $file ) ? (string) ( $file['filename'] ?? 'Download' ) : 'Download';
	}
	return sprintf( '<a class="cian-download cian-btn cian-btn--ghost" href="%s" download>%s</a>', esc_url( $url ), esc_html( $label ) );
}

/** Stable anchor for a guide step (slug of title, else step-N). */
function cian_core_guide_anchor( string $title, int $step ): string {
	$slug = sanitize_title( $title );
	return '' !== $slug ? $slug : 'step-' . $step;
}

/**
 * Render the guide's flexible-content Steps field into assembled HTML.
 *
 * Walks ACF flexible-content rows (keyed by `acf_fc_layout`) and delegates to
 * the component renderers. Step sections are numbered and anchored so the TOC
 * and chapter deep-links can target them.
 *
 * @param array<int, array<string, mixed>> $rows
 */
function cian_core_render_guide_steps( array $rows ): string {
	$out  = '';
	$step = 0;
	foreach ( $rows as $row ) {
		switch ( (string) ( $row['acf_fc_layout'] ?? '' ) ) {
			case 'step_section':
				$step++;
				$title  = (string) ( $row['title'] ?? '' );
				$anchor = cian_core_guide_anchor( $title, $step );
				$out   .= sprintf( '<section class="cian-step" id="%s">', esc_attr( $anchor ) );
				$out   .= sprintf( '<h2><span class="cian-step__n">%d</span> %s</h2>', $step, esc_html( $title ) );
				if ( ! empty( $row['body'] ) ) {
					$out .= '<div class="cian-step__body">' . wp_kses_post( (string) $row['body'] ) . '</div>';
				}
				$out .= '</section>';
				break;
			case 'command_block':
				$out .= cian_core_render_command_block( (string) ( $row['code'] ?? '' ), (string) ( $row['language'] ?? '' ), (string) ( $row['description'] ?? '' ) );
				break;
			case 'code_block':
				$out .= cian_core_render_code_block( (string) ( $row['code'] ?? '' ), (string) ( $row['language'] ?? '' ), (string) ( $row['filename'] ?? '' ) );
				break;
			case 'info_callout':
				$out .= cian_core_render_callout( (string) ( $row['body'] ?? '' ), 'info' );
				break;
			case 'warning_callout':
				$out .= cian_core_render_callout( (string) ( $row['body'] ?? '' ), 'warning' );
				break;
			case 'download':
				$out .= cian_core_render_download( $row['file'] ?? '', (string) ( $row['label'] ?? '' ) );
				break;
		}
	}
	return $out;
}

/** Table of contents built from the guide's step-section titles. */
function cian_core_render_guide_toc( array $rows ): string {
	$items = '';
	$step  = 0;
	foreach ( $rows as $row ) {
		if ( 'step_section' !== (string) ( $row['acf_fc_layout'] ?? '' ) ) {
			continue;
		}
		$step++;
		$title = (string) ( $row['title'] ?? '' );
		if ( '' === $title ) {
			continue;
		}
		$items .= sprintf( '<li><a href="#%s">%s</a></li>', esc_attr( cian_core_guide_anchor( $title, $step ) ), esc_html( $title ) );
	}
	return '' === $items ? '' : '<nav class="cian-toc" aria-label="On this page"><ol>' . $items . '</ol></nav>';
}

/** Format a 0–10 score: 8.0 → "8", 7.5 → "7.5". */
function cian_core_fmt_score( float $v ): string {
	return rtrim( rtrim( number_format( $v, 1 ), '0' ), '.' );
}

/**
 * Review score panel: overall figure + labelled sub-score meters.
 * Sub-scores of 0 (unscored) are skipped. Uses <meter> for accessibility.
 *
 * @param array<string, float|int|string> $sub label => 0–10.
 */
function cian_core_render_score_panel( float $overall, array $sub = array() ): string {
	$overall = max( 0.0, min( 10.0, $overall ) );
	$out     = '<div class="cian-scores">';
	$out    .= sprintf(
		'<div class="cian-scores__overall"><span class="cian-scores__num">%s</span><span class="cian-scores__max">/10</span></div>',
		esc_html( cian_core_fmt_score( $overall ) )
	);

	$rows = '';
	foreach ( $sub as $label => $value ) {
		$value = max( 0.0, min( 10.0, (float) $value ) );
		if ( $value <= 0 ) {
			continue;
		}
		$rows .= sprintf(
			'<li><span class="cian-scores__label">%s</span><meter min="0" max="10" value="%s" aria-label="%s"></meter><span class="cian-scores__v">%s</span></li>',
			esc_html( $label ),
			esc_attr( (string) $value ),
			esc_attr( sprintf( '%s: %s out of 10', $label, cian_core_fmt_score( $value ) ) ),
			esc_html( cian_core_fmt_score( $value ) )
		);
	}
	if ( '' !== $rows ) {
		$out .= '<ul class="cian-scores__list">' . $rows . '</ul>';
	}
	return $out . '</div>';
}

/**
 * Pros / cons columns. Items may be plain strings or ACF repeater rows
 * carrying a `text` sub-field.
 *
 * @param array<int, string|array<string, string>> $pros
 * @param array<int, string|array<string, string>> $cons
 */
function cian_core_render_pros_cons( array $pros, array $cons ): string {
	$column = static function ( array $items, string $cls, string $heading ): string {
		$li = '';
		foreach ( $items as $item ) {
			$text = is_array( $item ) ? (string) ( $item['text'] ?? '' ) : (string) $item;
			if ( '' === trim( $text ) ) {
				continue;
			}
			$li .= '<li>' . esc_html( $text ) . '</li>';
		}
		return '' === $li ? '' : sprintf( '<div class="cian-%s"><h3>%s</h3><ul>%s</ul></div>', $cls, esc_html( $heading ), $li );
	};

	$p = $column( $pros, 'pros', 'Pros' );
	$c = $column( $cons, 'cons', 'Cons' );
	return ( '' === $p && '' === $c ) ? '' : '<div class="cian-proscons">' . $p . $c . '</div>';
}

/**
 * Specification table. Rows are ACF repeater rows with `spec` + `value`.
 *
 * @param array<int, array<string, string>> $specs
 */
function cian_core_render_spec_table( array $specs ): string {
	$rows = '';
	foreach ( $specs as $s ) {
		$spec = is_array( $s ) ? (string) ( $s['spec'] ?? '' ) : '';
		if ( '' === trim( $spec ) ) {
			continue;
		}
		$rows .= sprintf( '<tr><th scope="row">%s</th><td>%s</td></tr>', esc_html( $spec ), esc_html( (string) ( $s['value'] ?? '' ) ) );
	}
	return '' === $rows ? '' : '<table class="cian-specs"><tbody>' . $rows . '</tbody></table>';
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

function cian_core_sc_guide_steps( $atts ): string {
	$atts = shortcode_atts( array( 'id' => get_the_ID() ), $atts, 'cian_guide_steps' );
	$rows = get_field( 'guide_steps', (int) $atts['id'] );
	return cian_core_render_guide_steps( is_array( $rows ) ? $rows : array() );
}

function cian_core_sc_guide_toc( $atts ): string {
	$atts = shortcode_atts( array( 'id' => get_the_ID() ), $atts, 'cian_guide_toc' );
	$rows = get_field( 'guide_steps', (int) $atts['id'] );
	return cian_core_render_guide_toc( is_array( $rows ) ? $rows : array() );
}

function cian_core_sc_review_scores( $atts ): string {
	$atts = shortcode_atts( array( 'id' => get_the_ID() ), $atts, 'cian_review_scores' );
	$id   = (int) $atts['id'];
	return cian_core_render_score_panel(
		(float) get_field( 'review_score_overall', $id ),
		array(
			'Design'        => get_field( 'review_score_design', $id ),
			'Features'      => get_field( 'review_score_features', $id ),
			'Performance'   => get_field( 'review_score_performance', $id ),
			'Ease of use'   => get_field( 'review_score_ease', $id ),
			'Compatibility' => get_field( 'review_score_compatibility', $id ),
			'Value'         => get_field( 'review_score_value', $id ),
		)
	);
}

function cian_core_sc_pros_cons( $atts ): string {
	$atts = shortcode_atts( array( 'id' => get_the_ID() ), $atts, 'cian_pros_cons' );
	$id   = (int) $atts['id'];
	$pros = get_field( 'review_pros', $id );
	$cons = get_field( 'review_cons', $id );
	return cian_core_render_pros_cons( is_array( $pros ) ? $pros : array(), is_array( $cons ) ? $cons : array() );
}

function cian_core_sc_spec_table( $atts ): string {
	$atts  = shortcode_atts( array( 'id' => get_the_ID() ), $atts, 'cian_spec_table' );
	$specs = get_field( 'review_specifications', (int) $atts['id'] );
	return cian_core_render_spec_table( is_array( $specs ) ? $specs : array() );
}
