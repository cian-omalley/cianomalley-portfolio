<?php
/**
 * Admin dashboards (docs/plan/04 §9, 11 §34).
 *
 * "Portfolio → YouTube": connected channel, last sync, quota estimate, and
 * the attention queue (videos without guides, deleted/private videos, sync
 * errors, missing thumbnails). Full UI lands with Phase 5; the menu and a
 * status skeleton are scaffolded here.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_admin_pages(): void {
	add_action( 'admin_menu', 'cian_core_register_admin_pages' );
}

function cian_core_register_admin_pages(): void {
	add_menu_page(
		'Portfolio',
		'Portfolio',
		'manage_cian_portfolio',
		'cian-portfolio',
		'cian_core_render_dashboard',
		'dashicons-admin-multisite',
		58
	);

	add_submenu_page(
		'cian-portfolio',
		'YouTube Sync',
		'YouTube',
		'manage_cian_portfolio',
		'cian-portfolio-youtube',
		'cian_core_render_youtube_page'
	);
}

function cian_core_render_dashboard(): void {
	echo '<div class="wrap"><h1>Portfolio</h1>';
	echo '<p>Content overview and attention queue. Full build: Phase 4–5 (see <code>docs/plan/13</code>).</p>';

	$counts = array(
		'project'         => wp_count_posts( 'project' )->publish ?? 0,
		'guide'           => wp_count_posts( 'guide' )->publish ?? 0,
		'video'           => wp_count_posts( 'video' )->publish ?? 0,
		'review'          => wp_count_posts( 'review' )->publish ?? 0,
		'tutorial_series' => wp_count_posts( 'tutorial_series' )->publish ?? 0,
	);
	echo '<ul class="ul-disc">';
	foreach ( $counts as $type => $count ) {
		printf( '<li>%s: <strong>%d</strong> published</li>', esc_html( $type ), (int) $count );
	}
	echo '</ul></div>';
}

function cian_core_render_youtube_page(): void {
	echo '<div class="wrap"><h1>YouTube Sync</h1>';

	if ( ! cian_core_yt_configured() ) {
		echo '<div class="notice notice-warning inline"><p>';
		echo esc_html( 'Define CIAN_YT_API_KEY in wp-config.php to connect the channel. Credentials must never be stored in the database or a page builder.' );
		echo '</p></div>';
	}

	if ( cian_core_sync_is_stale() ) {
		echo '<div class="notice notice-info inline"><p>' . esc_html( 'No recent sync recorded.' ) . '</p></div>';
	}

	echo '<p>Channel connection, playlist import, and the attention queue arrive in Phase 5. ';
	echo esc_html( 'Note: the channel does not exist yet (see docs/discovery.md) — the first content is the "Building this portfolio with Oxygen 6" series and the Oxygen 6 review.' );
	echo '</p></div>';
}
