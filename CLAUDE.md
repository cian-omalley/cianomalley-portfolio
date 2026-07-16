# CLAUDE.md — Digital District Portfolio

Interactive cyberpunk developer portfolio for **Cian O'Malley**, built on WordPress. This repo currently holds the planning docs and the site-specific plugin scaffold — the WordPress install itself lives elsewhere.

> **Read [`AGENTS.md`](AGENTS.md) first.** It is the vendor-neutral build spec (current state, architecture contract, verification workflow, and backlog) shared by every AI agent. This file adds only Claude Code-specific tooling on top.

## Ground truth (read before proposing anything)

- **Master plan:** `docs/plan/` — 44 sections, indexed in `docs/plan/README.md`. This is the authoritative architecture.
- **Confirmed decisions:** `docs/discovery.md` — do not contradict these.
- **Plugin:** `cian-portfolio-core/` — owns all data and logic.

## Key decisions (from discovery)

- **Domains:** `cianomalley.works` = primary portfolio · `cianomalley.dev` = small showcase projects/demos. (This reverses the original brief — discovery wins.)
- **Hosting:** self-hosted first (home server on **aaPanel**) → VPS later (SpinupWP-managed). Same stack both stages: Nginx + PHP 8.3 + MariaDB + Redis + Cloudflare (Tunnel hides the home IP).
- **SEO plugin:** **The SEO Framework** (free). Plugin's `seo.php` still owns rich schema (HowTo, VideoObject, Review, …) + the video sitemap under the single-emitter rule.
- **Builder:** Oxygen 6 owns all templates; Breakdance Elements for Oxygen is a component library only; Breakdance never owns templates on production.
- **Video:** YouTube is the delivery platform, WordPress the system of record. No channel exists yet — first content is the "Building this portfolio with Oxygen 6" series + an Oxygen 6 review.
- **3D:** one lazy Three.js scene — a **dense mini city**, camera at street level, edges never visible. Progressive enhancement only; the accessible non-3D site is the baseline and ships first (Phase 6 gate).
- **Content focus:** guides on self-hosting, Hermes Agent, Oxygen, WordPress, JetBrains; reviews of IDEs (Antigravity, IntelliJ Ultimate, Codex) + Oxygen 6.

## Architecture contract (non-negotiable)

- Data, sync, transcripts, chapters, REST, schema, security, tokens → **plugin** (`cian-portfolio-core`), never in a builder code block.
- Layout → **Oxygen**. If the builder changed, only templates rebuild.
- **Credentials** (`CIAN_YT_*`) live only in `wp-config.php`, never in the DB or builder.
- Design tokens live in `cian-portfolio-core/assets/css/tokens.css` — no off-token colors.

## Conventions

- PHP ≥ 8.1, WordPress ≥ 6.5. Every PHP file starts with `defined( 'ABSPATH' ) || exit;`.
- Custom-table queries use `$wpdb->prepare()`. Sanitize input, escape output.
- Never invent biography (employers, qualifications, clients, achievements).
- Validate Mermaid diagrams before committing docs.
- Match existing style: terse, table-heavy docs; complete sentences, no arrow-chain shorthand.

## Tooling

- Agents: `wp-plugin-reviewer` (PHP/security review), `docs-writer` (plan/docs).
- Skills: `/plugin-check` (lint plugin), `/caveman` (terse working-mode output — never for shipped copy).
- Verify plugin: `find cian-portfolio-core -name '*.php' | xargs -n1 php -l` and `node --check` on JS.

## Compact instructions

When compacting, preserve: the current task and its acceptance criteria, decisions from `docs/discovery.md`, file paths touched this session, and any failing check output. Drop resolved tangents.
