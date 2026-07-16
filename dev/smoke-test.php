<?php
/**
 * WordPress-free smoke test for cian-portfolio-core.
 *
 * Loads the plugin with minimal WordPress-function stubs, boots the module
 * registry, fires the `init` and `rest_api_init` hooks, and asserts the data
 * model registers. Also unit-tests the pure parsers (VTT, chapters,
 * timestamps, ISO-8601 duration). Runs with plain PHP — no WordPress, no
 * network — so it works in CI and restricted sandboxes.
 *
 *   php dev/smoke-test.php
 */

error_reporting( E_ALL );

$FAIL = 0;
function ok( string $label, bool $cond ): void {
	global $FAIL;
	echo ( $cond ? "  PASS  " : "  FAIL  " ) . $label . "\n";
	if ( ! $cond ) { $FAIL++; }
}

// ---- Minimal WordPress stubs ------------------------------------------------
$GLOBALS['__hooks']       = array();
$GLOBALS['__post_types']  = array();
$GLOBALS['__taxonomies']  = array();
$GLOBALS['__rest_routes'] = array();

function add_action( $hook, $cb, $prio = 10, $args = 1 ) { $GLOBALS['__hooks'][ $hook ][] = $cb; }
function add_filter( $hook, $cb, $prio = 10, $args = 1 ) { $GLOBALS['__hooks'][ $hook ][] = $cb; }
function register_post_type( $type, $args = array() ) { $GLOBALS['__post_types'][ $type ] = $args; }
function register_taxonomy( $tax, $types, $args = array() ) { $GLOBALS['__taxonomies'][ $tax ] = $types; }
function register_rest_route( $ns, $route, $args = array() ) { $GLOBALS['__rest_routes'][] = $ns . $route; }
function register_activation_hook( $f, $cb ) {}
function register_deactivation_hook( $f, $cb ) {}
function add_menu_page( ...$a ) {}
function add_submenu_page( ...$a ) {}
function acf_add_options_page( ...$a ) {}
function plugin_dir_path( $f ) { return rtrim( dirname( $f ), '/' ) . '/'; }
function plugin_dir_url( $f ) { return 'http://example.test/wp-content/plugins/cian-portfolio-core/'; }
function esc_url_raw( $u ) { return $u; }
function esc_url( $u ) { return $u; }
function rest_url( $p = '' ) { return 'http://example.test/wp-json/' . $p; }
function home_url( $p = '' ) { return 'http://example.test' . $p; }
function wp_strip_all_tags( $s ) { return trim( strip_tags( (string) $s ) ); }
function sanitize_text_field( $s ) { return trim( (string) $s ); }
function sanitize_textarea_field( $s ) { return trim( (string) $s ); }
function sanitize_key( $s ) { return strtolower( preg_replace( '/[^a-z0-9_]/i', '', (string) $s ) ); }
function __( $s, $d = null ) { return $s; }
function get_field( $k, $id = false ) { return ''; }
function wp_next_scheduled( $hook ) { return false; }
function wp_schedule_event( $ts, $rec, $hook ) { return true; }
function wp_clear_scheduled_hook( $hook ) {}
function get_option( $k, $default = false ) { return $default; }
function update_option( $k, $v, $autoload = null ) { return true; }
function get_transient( $k ) { return false; }
function set_transient( $k, $v, $ttl = 0 ) { return true; }
function delete_transient( $k ) { return true; }
function current_user_can( $c ) { return true; }

if ( ! defined( 'ABSPATH' ) ) { define( 'ABSPATH', __DIR__ . '/' ); }
if ( ! defined( 'MINUTE_IN_SECONDS' ) ) { define( 'MINUTE_IN_SECONDS', 60 ); }
if ( ! defined( 'HOUR_IN_SECONDS' ) ) { define( 'HOUR_IN_SECONDS', 3600 ); }
if ( ! defined( 'DAY_IN_SECONDS' ) ) { define( 'DAY_IN_SECONDS', 86400 ); }

class WP_REST_Server { const READABLE = 'GET'; }

// ---- Load the plugin --------------------------------------------------------
$plugin = dirname( __DIR__ ) . '/cian-portfolio-core/cian-portfolio-core.php';
ok( 'plugin bootstrap file exists', file_exists( $plugin ) );
require $plugin;

ok( 'Cian_Core class defined', class_exists( 'Cian_Core' ) );

// Boot the module registry (requires every includes/ file + calls each bootstrap).
Cian_Core::boot();
ok( 'Cian_Core::boot() ran without fatal', true );

// Fire init → registers post types + taxonomies.
foreach ( $GLOBALS['__hooks']['init'] ?? array() as $cb ) { call_user_func( $cb ); }

$expected_types = array( 'project', 'guide', 'article', 'review', 'video', 'tutorial_series', 'timeline_entry' );
foreach ( $expected_types as $t ) {
	ok( "post type registered: $t", isset( $GLOBALS['__post_types'][ $t ] ) );
}

$expected_tax = array( 'project_category', 'project_status', 'guide_category', 'difficulty',
	'operating_system', 'video_category', 'review_category', 'article_category', 'technology', 'skill', 'playlist' );
foreach ( $expected_tax as $t ) {
	ok( "taxonomy registered: $t", isset( $GLOBALS['__taxonomies'][ $t ] ) );
}

// Fire rest_api_init → registers cian/v1 routes.
foreach ( $GLOBALS['__hooks']['rest_api_init'] ?? array() as $cb ) { call_user_func( $cb ); }
ok( 'REST /world route registered', in_array( 'cian/v1/world', $GLOBALS['__rest_routes'], true ) );
ok( 'REST transcript route registered', (bool) preg_grep( '#cian/v1/videos#', $GLOBALS['__rest_routes'] ) );

// ---- Pure-function unit tests ----------------------------------------------
echo "\n-- parsers --\n";

$vtt = "WEBVTT\n\n00:00:01.000 --> 00:00:03.500\nHello <b>world</b>\n\n00:00:04.000 --> 00:00:06.000\nSecond line\n";
$seg = cian_core_parse_vtt( $vtt );
ok( 'VTT: 2 segments parsed', count( $seg ) === 2 );
ok( 'VTT: start ms correct', ( $seg[0]['start_ms'] ?? null ) === 1000 );
ok( 'VTT: tags stripped', ( $seg[0]['text'] ?? '' ) === 'Hello world' );

ok( 'timestamp 01:02:03 → ms', cian_core_timestamp_to_ms( '01:02:03.000' ) === 3723000 );

$chap = cian_core_parse_chapter_lines( "Intro stuff\n0:00 Introduction\n12:30 Setup\n1:02:05 Wrap up\n" );
ok( 'chapters: 3 parsed', count( $chap ) === 3 );
ok( 'chapters: title captured', ( $chap[1]['title'] ?? '' ) === 'Setup' );
ok( 'chapters: hh:mm:ss start', ( $chap[2]['start'] ?? '' ) === '1:02:05' );

ok( 'chapter start → seconds', cian_core_timestamp_to_seconds( '1:02:05' ) === 3725 );

ok( 'ISO duration PT1H2M3S → 01:02:03', cian_core_yt_duration( 'PT1H2M3S' ) === '01:02:03' );
ok( 'ISO duration PT45S → 00:00:45', cian_core_yt_duration( 'PT45S' ) === '00:00:45' );

ok( 'youtube id valid passes', cian_core_sanitize_youtube_id( 'dQw4w9WgXcQ' ) === 'dQw4w9WgXcQ' );
ok( 'youtube id invalid rejected', cian_core_sanitize_youtube_id( 'nope' ) === '' );

// ---- Summary ----------------------------------------------------------------
echo "\n";
if ( $FAIL === 0 ) {
	echo "ALL SMOKE TESTS PASSED\n";
	exit( 0 );
}
echo "SMOKE TESTS FAILED: {$FAIL}\n";
exit( 1 );
