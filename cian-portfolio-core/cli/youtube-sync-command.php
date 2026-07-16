<?php
/**
 * WP-CLI: wp cian youtube <subcommand> (docs/plan/04 §9).
 *
 *   wp cian youtube status
 *   wp cian youtube sync [--full] [--video=<id>] [--playlist=<id>] [--dry-run]
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'WP_CLI' ) ) {
	return;
}

final class Cian_YouTube_CLI {

	/**
	 * Show sync configuration and last-run status.
	 */
	public function status(): void {
		WP_CLI::line( 'YouTube API key: ' . ( cian_core_yt_configured() ? 'configured' : 'MISSING (set CIAN_YT_API_KEY)' ) );
		WP_CLI::line( 'OAuth: ' . ( cian_core_oauth_configured() ? 'configured' : 'not configured (optional)' ) );

		$last = get_option( 'cian_last_sync' );
		if ( is_array( $last ) && ! empty( $last['time'] ) ) {
			WP_CLI::line( 'Last sync: ' . gmdate( 'c', (int) $last['time'] ) );
		} else {
			WP_CLI::line( 'Last sync: never' );
		}
	}

	/**
	 * Run a synchronization pass.
	 *
	 * ## OPTIONS
	 *
	 * [--full]
	 * : Full channel sync.
	 *
	 * [--video=<id>]
	 * : Sync a single YouTube video id.
	 *
	 * [--playlist=<id>]
	 * : Sync a single playlist id.
	 *
	 * [--dry-run]
	 * : Report actions without writing.
	 */
	public function sync( array $args, array $assoc ): void {
		$result = cian_core_sync_run(
			array(
				'scope'       => isset( $assoc['full'] ) ? 'full' : 'partial',
				'video_id'    => $assoc['video'] ?? '',
				'playlist_id' => $assoc['playlist'] ?? '',
				'dry_run'     => isset( $assoc['dry-run'] ),
			)
		);

		if ( is_wp_error( $result ) ) {
			WP_CLI::error( $result->get_error_message() );
		}

		WP_CLI::success(
			sprintf(
				'Created %d, updated %d, flagged %d.',
				$result['created'] ?? 0,
				$result['updated'] ?? 0,
				$result['flagged'] ?? 0
			)
		);
	}
}

WP_CLI::add_command( 'cian youtube', 'Cian_YouTube_CLI' );
