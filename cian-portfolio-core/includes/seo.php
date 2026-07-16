<?php
/**
 * Structured data + video sitemap (docs/plan/11 §32).
 *
 * Single-emitter rule: for each schema type, exactly one source emits. This
 * module owns the types the SEO plugin can't do well (HowTo, VideoObject,
 * Review/Product, TechArticle, Person/WebSite, ItemList). It disables the SEO
 * plugin's overlapping output where it emits (wired per-plugin in Phase 6).
 *
 * Emitters below are scaffolds; they render valid JSON-LD from ACF data as
 * fields are populated, and stay silent when data is missing.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_seo(): void {
	add_action( 'wp_head', 'cian_core_emit_schema', 20 );
}

function cian_core_emit_schema(): void {
	$graph = array();

	if ( is_singular( 'guide' ) ) {
		$graph = cian_core_schema_guide( get_the_ID() );
	} elseif ( is_singular( 'video' ) ) {
		$graph = cian_core_schema_video( get_the_ID() );
	} elseif ( is_singular( 'review' ) ) {
		$graph = cian_core_schema_review( get_the_ID() );
	}

	if ( empty( $graph ) ) {
		return;
	}

	$doc = array(
		'@context' => 'https://schema.org',
		'@graph'   => $graph,
	);
	echo "\n<script type=\"application/ld+json\">" . wp_json_encode( $doc, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "</script>\n";
}

/** Guide → TechArticle + HowTo (from steps) + VideoObject (when linked). */
function cian_core_schema_guide( int $id ): array {
	$permalink = get_permalink( $id );
	$nodes     = array(
		array(
			'@type'         => 'TechArticle',
			'@id'           => $permalink . '#techarticle',
			'headline'      => get_the_title( $id ),
			'description'   => (string) cian_core_field( 'guide_summary', $id ),
			'datePublished' => get_the_date( 'c', $id ),
			'dateModified'  => get_post_modified_time( 'c', false, $id ),
		),
	);

	// HowTo — one HowToStep per step_section row, anchored to match the page.
	$steps = cian_core_field( 'guide_steps', $id, array() );
	$how   = cian_core_schema_howto_steps( is_array( $steps ) ? $steps : array(), $permalink );
	if ( ! empty( $how ) ) {
		$nodes[] = array(
			'@type' => 'HowTo',
			'@id'   => $permalink . '#howto',
			'name'  => get_the_title( $id ),
			'step'  => $how,
		);
	}

	// VideoObject — first related video, embedded privacy-safe.
	$videos = cian_core_field( 'guide_related_videos', $id, array() );
	$vid    = is_array( $videos ) ? (int) ( $videos[0] ?? 0 ) : (int) $videos;
	if ( $vid > 0 ) {
		$node = array_filter( cian_core_schema_video( $vid )[0] ?? array() );
		if ( ! empty( $node ) ) {
			$nodes[] = $node;
		}
	}

	return $nodes;
}

/**
 * Build a HowTo `step` list from guide flexible-content rows.
 *
 * @param array<int, array<string, mixed>> $rows
 * @return array<int, array<string, mixed>>
 */
function cian_core_schema_howto_steps( array $rows, string $permalink ): array {
	$steps = array();
	$n     = 0;
	foreach ( $rows as $row ) {
		if ( 'step_section' !== (string) ( $row['acf_fc_layout'] ?? '' ) ) {
			continue;
		}
		$title = trim( (string) ( $row['title'] ?? '' ) );
		if ( '' === $title ) {
			continue;
		}
		$n++;
		$steps[] = array_filter(
			array(
				'@type'    => 'HowToStep',
				'position' => $n,
				'name'     => $title,
				'text'     => wp_strip_all_tags( (string) ( $row['body'] ?? '' ) ) ?: $title,
				'url'      => $permalink . '#' . cian_core_guide_anchor( $title, $n ),
			)
		);
	}
	return $steps;
}

/** Video → VideoObject. */
function cian_core_schema_video( int $id ): array {
	$yt = cian_core_sanitize_youtube_id( (string) cian_core_field( 'video_youtube_id', $id ) );
	return array(
		array_filter(
			array(
				'@type'        => 'VideoObject',
				'@id'          => get_permalink( $id ) . '#video',
				'name'         => get_the_title( $id ),
				'description'  => wp_strip_all_tags( get_the_excerpt( $id ) ),
				'uploadDate'   => get_the_date( 'c', $id ),
				'thumbnailUrl' => get_the_post_thumbnail_url( $id, 'full' ) ?: null,
				'embedUrl'     => $yt ? "https://www.youtube-nocookie.com/embed/{$yt}" : null,
			)
		),
	);
}

/** Review → Review + Product, with positive/negative notes from pros/cons. */
function cian_core_schema_review( int $id ): array {
	$overall = (float) cian_core_field( 'review_score_overall', $id );
	$pros    = cian_core_field( 'review_pros', $id, array() );
	$cons    = cian_core_field( 'review_cons', $id, array() );

	return array(
		array_filter(
			array(
				'@type'         => 'Review',
				'@id'           => get_permalink( $id ) . '#review',
				'name'          => get_the_title( $id ),
				'datePublished' => get_the_date( 'c', $id ),
				'itemReviewed'  => array_filter(
					array(
						'@type' => 'Product',
						'name'  => (string) cian_core_field( 'review_product_name', $id ),
						'brand' => (string) cian_core_field( 'review_manufacturer', $id ),
					)
				),
				'reviewRating'  => $overall > 0 ? array(
					'@type'       => 'Rating',
					'ratingValue' => $overall,
					'bestRating'  => 10,
					'worstRating' => 0,
				) : null,
				'positiveNotes' => cian_core_schema_notes( is_array( $pros ) ? $pros : array() ),
				'negativeNotes' => cian_core_schema_notes( is_array( $cons ) ? $cons : array() ),
			)
		),
	);
}

/**
 * Build a schema.org ItemList of note strings (pros/cons). Items may be plain
 * strings or ACF repeater rows with a `text` sub-field. Returns null if empty.
 *
 * @param array<int, string|array<string, string>> $items
 * @return array<string, mixed>|null
 */
function cian_core_schema_notes( array $items ): ?array {
	$list = array();
	$n    = 0;
	foreach ( $items as $item ) {
		$text = is_array( $item ) ? (string) ( $item['text'] ?? '' ) : (string) $item;
		$text = trim( $text );
		if ( '' === $text ) {
			continue;
		}
		$n++;
		$list[] = array(
			'@type'    => 'ListItem',
			'position' => $n,
			'name'     => $text,
		);
	}
	return empty( $list ) ? null : array(
		'@type'           => 'ItemList',
		'itemListElement' => $list,
	);
}
