<?php
/**
 * Conditional asset loading (docs/plan/09 §26 asset policy).
 *
 * Nothing enqueues "just in case":
 *  - tokens/base/components + accessibility: global
 *  - content.css: reading templates (guide/article singles)
 *  - video.css + player/chapters/transcripts JS: only where a video renders
 *  - world bundle: front page only, and only via idle-time dynamic import
 *    after eligibility checks in loader.js (never a blocking <script>)
 */

defined( 'ABSPATH' ) || exit;

function cian_core_module_assets(): void {
	add_action( 'wp_enqueue_scripts', 'cian_core_enqueue_assets' );
}

function cian_core_enqueue_assets(): void {
	$css = CIAN_CORE_URL . 'assets/css/';
	$js  = CIAN_CORE_URL . 'assets/js/';
	$ver = CIAN_CORE_VERSION;

	// Global layer — tokens first so builder CSS can consume the variables.
	wp_enqueue_style( 'cian-tokens', $css . 'tokens.css', array(), $ver );
	wp_enqueue_style( 'cian-base', $css . 'base.css', array( 'cian-tokens' ), $ver );
	wp_enqueue_style( 'cian-components', $css . 'components.css', array( 'cian-base' ), $ver );
	wp_enqueue_style( 'cian-a11y', $css . 'accessibility.css', array( 'cian-base' ), $ver );
	wp_enqueue_script( 'cian-a11y', $js . 'src/accessibility.js', array(), $ver, array( 'strategy' => 'defer' ) );
	wp_enqueue_script( 'cian-menu', $js . 'src/menu.js', array(), $ver, array( 'strategy' => 'defer' ) );

	// Reading mode — guide/article singles get typography, never the world.
	if ( is_singular( array( 'guide', 'article' ) ) ) {
		wp_enqueue_style( 'cian-content', $css . 'content.css', array( 'cian-base' ), $ver );
	}

	// Command-block copy behaviour — anywhere a command block can render.
	if ( is_singular( array( 'guide', 'article', 'video', 'review', 'project' ) ) ) {
		wp_enqueue_script( 'cian-content', $js . 'src/content.js', array( 'cian-a11y' ), $ver, array( 'strategy' => 'defer' ) );
	}

	// Video surfaces — facade/player/chapters/transcripts.
	if ( cian_core_page_has_video() ) {
		wp_enqueue_style( 'cian-video', $css . 'video.css', array( 'cian-base' ), $ver );
		wp_enqueue_script( 'cian-video-player', $js . 'src/video-player.js', array(), $ver, array( 'strategy' => 'defer' ) );
		wp_enqueue_script( 'cian-chapters', $js . 'src/chapters.js', array( 'cian-video-player' ), $ver, array( 'strategy' => 'defer' ) );
		wp_enqueue_script( 'cian-transcripts', $js . 'src/transcripts.js', array(), $ver, array( 'strategy' => 'defer' ) );
	}

	// World loader — front page only; the loader itself is tiny and decides
	// whether to dynamic-import the real bundle (eligibility + idle time).
	if ( is_front_page() && ! defined( 'CIAN_DISABLE_WORLD' ) ) {
		wp_enqueue_script( 'cian-world-loader', $js . 'src/loader.js', array(), $ver, array( 'strategy' => 'defer' ) );
		wp_localize_script(
			'cian-world-loader',
			'cianWorld',
			array(
				'endpoint' => esc_url_raw( rest_url( 'cian/v1/world' ) ),
				'bundle'   => esc_url_raw( CIAN_CORE_URL . 'assets/js/dist/world.js' ),
				'models'   => esc_url_raw( CIAN_CORE_URL . 'assets/models/' ),
			)
		);
	}
}

/** True when the current view will render at least one video component. */
function cian_core_page_has_video(): bool {
	if ( is_singular( 'video' ) || is_post_type_archive( 'video' ) || is_singular( 'tutorial_series' ) ) {
		return true;
	}
	if ( is_singular( array( 'guide', 'review', 'project' ) ) ) {
		return true; // These templates may embed a related-video facade.
	}
	return false;
}
