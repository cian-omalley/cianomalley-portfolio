---
name: plugin-check
description: Lint and sanity-check the cian-portfolio-core plugin — PHP syntax on every file, JS syntax on every module, and quick greps for missing ABSPATH guards or unprepared SQL. Run before committing plugin changes.
user-invocable: true
allowed-tools: Bash(php -l *) Bash(node --check *) Grep Glob Read
---

Run these checks and report a concise pass/fail summary:

1. **PHP syntax** — `php -l` on every `cian-portfolio-core/**/*.php`. List any file with errors.
2. **JS syntax** — `node --check` on every `cian-portfolio-core/assets/js/src/*.js`.
3. **ABSPATH guard** — every PHP file (except entry bootstrap comments) must contain `defined( 'ABSPATH' )`. Flag any that don't.
4. **Unprepared SQL** — grep for `$wpdb->query(` / `->get_results(` / `->get_col(` / `->get_var(` and confirm each nearby uses `$wpdb->prepare(`. Flag interpolated variables without prepare.
5. **Secret leakage** — grep for hard-coded keys/tokens; credentials must only come from `wp-config.php` constants (`CIAN_YT_*`).

Report findings most-severe first. If everything passes, say so in one line.
