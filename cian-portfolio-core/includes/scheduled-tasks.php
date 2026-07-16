<?php
/**
 * Scheduled tasks + health checks (docs/plan/04 §9, 12 §35).
 *
 * WP-Cron fallback; production should disable pseudo-cron (DISABLE_WP_CRON)
 * and hit wp-cron.php from a real system cron. The dashboard warns when the
 * last sync is stale.
 */

defined( 'ABSPATH' ) || exit;

const CIAN_SYNC_HOOK = 'cian_youtube_sync';

function cian_core_module_scheduled_tasks(): void {
	add_action( 'init', 'cian_core_schedule_sync' );
	add_action( CIAN_SYNC_HOOK, 'cian_core_run_scheduled_sync' );
	add_filter( 'cron_schedules', 'cian_core_add_cron_interval' );
}

function cian_core_add_cron_interval( array $schedules ): array {
	$schedules['cian_six_hours'] = array(
		'interval' => 6 * HOUR_IN_SECONDS,
		'display'  => 'Every 6 hours (Cian YouTube sync)',
	);
	return $schedules;
}

function cian_core_schedule_sync(): void {
	if ( ! wp_next_scheduled( CIAN_SYNC_HOOK ) ) {
		wp_schedule_event( time() + HOUR_IN_SECONDS, 'cian_six_hours', CIAN_SYNC_HOOK );
	}
}

function cian_core_run_scheduled_sync(): void {
	if ( ! cian_core_yt_configured() ) {
		return;
	}
	$result = cian_core_sync_run( array( 'scope' => 'full' ) );
	update_option(
		'cian_last_sync',
		array(
			'time'   => time(),
			'result' => is_wp_error( $result ) ? $result->get_error_message() : $result,
		),
		false
	);
}

/** True when the last successful sync is older than the given window. */
function cian_core_sync_is_stale( int $window = DAY_IN_SECONDS ): bool {
	$last = get_option( 'cian_last_sync' );
	return ! is_array( $last ) || ( time() - (int) ( $last['time'] ?? 0 ) ) > $window;
}
