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

/** Guide → TechArticle (+ HowTo + VideoObject when a video is linked). */
function cian_core_schema_guide( int $id ): array {
	$nodes = array(
		array(
			'@type'         => 'TechArticle',
			'@id'           => get_permalink( $id ) . '#techarticle',
			'headline'      => get_the_title( $id ),
			'description'   => (string) cian_core_field( 'guide_summary', $id ),
			'datePublished' => get_the_date( 'c', $id ),
			'dateModified'  => get_post_modified_time( 'c', false, $id ),
		),
	);
	// HowTo + VideoObject nodes are added in Phase 6 once steps/video render.
	return $nodes;
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

/** Review → Review + Product. */
function cian_core_schema_review( int $id ): array {
	$overall = (float) cian_core_field( 'review_score_overall', $id );
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
			)
		),
	);
}
