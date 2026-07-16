<?php
/**
 * Bidirectional relationships + lookup table (docs/plan/03 §7, 09 §26).
 *
 * ACF relationship fields remain the editing UI; this module mirrors every
 * save into wp_cian_relationships so reverse queries ("guides for this
 * video") and the world REST payload never need postmeta LIKE-joins.
 */

defined( 'ABSPATH' ) || exit;

/** Field name => relationship type stored in the lookup table. */
const CIAN_RELATIONSHIP_FIELDS = array(
	'project_related_guides'   => 'project_guide',
	'project_related_videos'   => 'project_video',
	'project_related_reviews'  => 'project_review',
	'project_related_projects' => 'project_project',
	'guide_related_videos'     => 'guide_video',
	'guide_related_guides'     => 'guide_guide',
	'video_related_articles'   => 'video_article',
	'article_related_projects' => 'article_project',
	'article_related_guides'   => 'article_guide',
	'article_related_videos'   => 'article_video',
	'article_related_reviews'  => 'article_review',
	'review_related_guides'    => 'review_guide',
	'review_related_videos'    => 'review_video',
	'review_related_reviews'   => 'review_review',
);

function cian_core_module_relationships(): void {
	foreach ( array_keys( CIAN_RELATIONSHIP_FIELDS ) as $field ) {
		add_filter( "acf/update_value/name={$field}", 'cian_core_sync_relationship_field', 20, 3 );
	}
	add_action( 'before_delete_post', 'cian_core_purge_relationships' );
}

function cian_core_relationship_table(): string {
	global $wpdb;
	return $wpdb->prefix . 'cian_relationships';
}

function cian_core_create_relationship_table(): void {
	global $wpdb;
	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	$table   = cian_core_relationship_table();
	$charset = $wpdb->get_charset_collate();

	dbDelta(
		"CREATE TABLE {$table} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			from_id BIGINT UNSIGNED NOT NULL,
			to_id BIGINT UNSIGNED NOT NULL,
			rel_type VARCHAR(40) NOT NULL,
			sort INT UNSIGNED NOT NULL DEFAULT 0,
			PRIMARY KEY  (id),
			UNIQUE KEY rel (from_id, to_id, rel_type),
			KEY reverse_lookup (to_id, rel_type),
			KEY forward_lookup (from_id, rel_type)
		) {$charset};"
	);
}

/**
 * Mirror an ACF relationship value into the lookup table.
 *
 * @param mixed $value    Array of post IDs (or single ID / empty).
 * @param mixed $post_id  ACF post id.
 * @param array $field    ACF field array.
 * @return mixed Unmodified $value.
 */
function cian_core_sync_relationship_field( $value, $post_id, $field ) {
	global $wpdb;

	if ( ! is_numeric( $post_id ) ) {
		return $value; // Options pages etc. are not mirrored.
	}

	$rel_type = CIAN_RELATIONSHIP_FIELDS[ $field['name'] ] ?? null;
	if ( null === $rel_type ) {
		return $value;
	}

	$table = cian_core_relationship_table();
	$ids   = array_values( array_filter( array_map( 'absint', (array) $value ) ) );

	$wpdb->delete( $table, array( 'from_id' => (int) $post_id, 'rel_type' => $rel_type ), array( '%d', '%s' ) );

	foreach ( $ids as $sort => $to_id ) {
		$wpdb->query(
			$wpdb->prepare(
				"INSERT IGNORE INTO {$table} (from_id, to_id, rel_type, sort) VALUES (%d, %d, %s, %d)", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				(int) $post_id,
				$to_id,
				$rel_type,
				$sort
			)
		);
	}

	return $value;
}

/** Remove all rows touching a deleted post (both directions). */
function cian_core_purge_relationships( int $post_id ): void {
	global $wpdb;
	$table = cian_core_relationship_table();
	$wpdb->delete( $table, array( 'from_id' => $post_id ), array( '%d' ) );
	$wpdb->delete( $table, array( 'to_id' => $post_id ), array( '%d' ) );
}

/**
 * Reverse lookup: posts pointing AT $post_id with $rel_type.
 *
 * @return int[] Ordered post IDs.
 */
function cian_core_related_from( int $post_id, string $rel_type ): array {
	global $wpdb;
	$table = cian_core_relationship_table();
	return array_map(
		'intval',
		$wpdb->get_col(
			$wpdb->prepare(
				"SELECT from_id FROM {$table} WHERE to_id = %d AND rel_type = %s ORDER BY sort", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
				$post_id,
				$rel_type
			)
		)
	);
}
