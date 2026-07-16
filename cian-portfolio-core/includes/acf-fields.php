<?php
/**
 * ACF field registration (docs/plan/03 §8).
 *
 * Field groups are version-controlled as JSON in acf-json/ and loaded from
 * there — edit on staging via the ACF UI, save (auto-exports to acf-json/),
 * commit. No field group lives only in the database.
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_acf_fields(): void {
	// Load committed JSON.
	add_filter(
		'acf/settings/load_json',
		static function ( array $paths ): array {
			$paths[] = CIAN_CORE_DIR . 'acf-json';
			return $paths;
		}
	);

	// Save UI edits back into the plugin so they get committed.
	add_filter(
		'acf/settings/save_json',
		static fn (): string => CIAN_CORE_DIR . 'acf-json'
	);

	// Options page: Portfolio Settings (socials, CV, consent texts, flags).
	add_action(
		'acf/init',
		static function (): void {
			if ( ! function_exists( 'acf_add_options_page' ) ) {
				return;
			}
			acf_add_options_page(
				array(
					'page_title' => 'Portfolio Settings',
					'menu_title' => 'Portfolio Settings',
					'menu_slug'  => 'cian-portfolio-settings',
					'capability' => 'manage_cian_portfolio',
				)
			);
		}
	);

	add_action( 'admin_notices', 'cian_core_acf_missing_notice' );
}

/**
 * Safe field accessor. Returns $default when ACF is not active (so the plugin
 * degrades gracefully without ACF Pro, per docs/plan/12 §35) or the field is
 * empty. Use this instead of get_field() in frontend/render code.
 *
 * @param int|string|false $post_id
 * @return mixed
 */
function cian_core_field( string $name, $post_id = false, $default = '' ) {
	if ( ! function_exists( 'get_field' ) ) {
		return $default;
	}
	$value = get_field( $name, $post_id );
	return ( null === $value || false === $value || '' === $value ) ? $default : $value;
}

function cian_core_acf_missing_notice(): void {
	if ( function_exists( 'acf_add_local_field_group' ) || ! current_user_can( 'activate_plugins' ) ) {
		return;
	}
	echo '<div class="notice notice-warning"><p>';
	echo esc_html( 'Cian Portfolio Core: ACF Pro is not active — structured fields, relationships, and options pages are unavailable.' );
	echo '</p></div>';
}
