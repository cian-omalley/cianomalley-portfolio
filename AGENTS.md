# AGENTS.md — Build Spec for AI Coding Agents

Vendor-neutral instructions for **any** AI coding agent (Claude Code, Cursor, Codex, Copilot, Aider, …) working in this repository. Read this first, then follow the ground-truth docs it points to. Claude Code users: `CLAUDE.md` adds Claude-specific tooling on top of this file.

> This file exists because the master plan requires that "another developer or AI coding agent can begin implementation without redesigning the architecture from scratch." It is the single entry point that tells an agent **what this is, what's already built and verified, how to verify its own work, and what to build next.**

---

## 1. What this repository is

An interactive cyberpunk developer portfolio + technical-content platform for **Cian O'Malley**, built on **WordPress**. The repo holds:

- `docs/plan/` — the authoritative 44-section master plan (design, architecture, content, roadmap).
- `docs/discovery.md` — confirmed decisions that **override** the plan where they differ.
- `docs/oxygen-templates.md` — how to build the Oxygen templates against the plugin.
- `cian-portfolio-core/` — the site-specific WordPress plugin (owns all data + logic).
- `dev/` — a local WordPress dev environment + a WordPress-free smoke test.
- `.claude/` — Claude Code agents/skills (ignore if you're a different agent).

The live WordPress install itself is **not** in this repo — it lives on the owner's server. This repo is the plan + the plugin + the dev tooling.

## 2. Ground truth — read before proposing anything

| Question | Source |
|---|---|
| What is the architecture? | `docs/plan/README.md` (index to all 44 sections) |
| What was actually decided? | `docs/discovery.md` (wins over the plan) |
| What does the plugin do? | `cian-portfolio-core/README.md` |
| How are the templates built? | `docs/oxygen-templates.md` |
| What's the field model? | `cian-portfolio-core/acf-json/` + `docs/plan/03` |

**Key decisions (from discovery — do not contradict):** primary domain `cianomalley.works`, `cianomalley.dev` for demos · self-host first on aaPanel → VPS later · Oxygen 6 owns templates, Breakdance never does · YouTube is delivery, WordPress is system of record (channel doesn't exist yet) · one lazy Three.js "dense mini-city" scene, edges never visible, accessible non-3D site ships first · SEO: The SEO Framework (free).

## 3. Current build state (verified)

| Area | State |
|---|---|
| Data model: 7 CPTs, 11 taxonomies, seeded terms | ✅ built, activates in real WordPress |
| Custom tables: `wp_cian_relationships`, `wp_cian_transcript_segments` | ✅ built, create cleanly (SQLite + MySQL) |
| ACF field groups (9 groups, 286 fields) | ✅ authored in `acf-json/` (needs ACF Pro to load) |
| REST `cian/v1/world` + `/videos/{id}/transcript` | ✅ built + tested |
| Transcripts: VTT/SRT/plain-text parse, store, paged read | ✅ built + tested end-to-end |
| YouTube sync: channel→uploads→videos, lock-aware upsert, deletion detect, tag→technology mapping | ✅ built + unit/live-tested (no live channel yet) |
| Render layer: guide steps+TOC, video facade/chapters, review scores/pros-cons/specs, cards, related | ✅ built as shortcodes + tested |
| Design tokens + CSS + JS modules | ✅ built |
| Degrades without ACF | ✅ fixed + verified (`cian_core_field()`) |
| **Oxygen templates** | ⏳ **not built** — done in the Oxygen UI on the owner's install (see `docs/oxygen-templates.md`) |
| **Three.js scene** | ⏳ not built (stubs + contract in `assets/js/src/world.js`, `loader.js`) |
| **Live site / hosting** | ⏳ owner's task (aaPanel home server) |

## 4. Architecture contract (non-negotiable)

- **Data, sync, transcripts, chapters, REST, schema, security, render components → the plugin.** Never business logic in an Oxygen/Breakdance code block.
- **Layout → Oxygen only.** If the builder changed, only templates rebuild.
- **Credentials** (`CIAN_YT_*`) live only in `wp-config.php` — never in the DB or a builder.
- **Design tokens** live in `cian-portfolio-core/assets/css/tokens.css` — no off-token colors anywhere.
- Render components are **pure functions** (explicit args, unit-testable) with thin shortcode wrappers that read ACF/post data. Read fields via `cian_core_field()`, never bare `get_field()` (the plugin must work with ACF inactive).

## 5. Conventions

- PHP ≥ 8.1, WordPress ≥ 6.5. Every PHP file starts with `defined( 'ABSPATH' ) || exit;`.
- Custom-table queries use `$wpdb->prepare()`. Sanitize input, escape output at render.
- MySQL-only DDL (e.g. `FULLTEXT`) must be added outside `dbDelta` with error suppression so SQLite dev works (see `cian_core_maybe_add_fulltext`).
- **Never invent biography** — no employers, qualifications, clients, or achievements the owner didn't provide.
- Match existing style: terse, table-heavy docs; complete sentences; no arrow-chain shorthand.
- One feature per PR where possible; keep the plan/docs in sync when reality diverges.

## 6. How to verify your work (do this before every commit)

Three layers, cheapest first. **Do not commit unverified code.**

```bash
# 1. Static — syntax on everything
find cian-portfolio-core dev -name '*.php' -print0 | xargs -0 -n1 php -l
for f in cian-portfolio-core/assets/js/src/*.js; do node --check "$f"; done

# 2. WordPress-free smoke test — boots the plugin with WP stubs, asserts the
#    data model registers, and unit-tests every pure function. Runs anywhere.
php dev/smoke-test.php          # expect "ALL SMOKE TESTS PASSED"
```

**3. Real WordPress** — the layer that catches integration bugs stubs can't (it has already caught a SQLite `FULLTEXT` failure and an ACF-absent crash):

- Preferred: `docker compose -f dev/docker-compose.yml up -d && ./dev/setup.sh`.
- **If Docker Hub is blocked** (restricted sandbox), stand up WordPress without Docker: clone WordPress core from `github.com/WordPress/WordPress` + the `aaemnnosttv/wp-sqlite-db` `db.php` drop-in (SQLite, no MySQL server), then drive it with `wp-cli.phar --allow-root`. Verify: `wp post-type list`, `wp taxonomy list`, `wp db tables '*cian*'`, and exercise plugin functions via `wp eval`. ACF Pro is paid/unavailable there — verify CPTs/taxonomies/tables/REST/render instead of fields.

When you add a pure function, add a case to `dev/smoke-test.php`. When you touch DB/activation/rendering, verify in real WordPress.

## 7. Remaining backlog (with acceptance criteria)

Repo-authorable (an agent can do these):

1. **Transcript admin metabox** — edit segments + status on the video screen. *Accept:* saves to `wp_cian_transcript_segments`; status workflow enforced; verified via `wp eval`.
2. **Thumbnail sideloading in sync** — `media_sideload_image` the YouTube thumb, set as featured image. *Accept:* featured image set on synced videos; failures logged, not fatal.
3. **Review `positiveNotes`/`negativeNotes` schema** — extend `seo.php` `Review` from pros/cons. *Accept:* valid JSON-LD; single-emitter rule kept.
4. **HowTo + VideoObject in guide schema** — assemble the `@graph` when a guide has steps/video. *Accept:* passes Google Rich Results test shapes.
5. **Three.js scene** (`assets/js/src/world.js`) — dense street-level mini-city, DOM hotspots, no visible edges, full fallback. *Accept:* lazy-loads only when eligible; site complete without it; budgets in `docs/plan/10 §31`.

Owner / live-environment tasks (an agent cannot do these — surface them, don't fake them):

- Build the **Oxygen templates** in the builder UI (`docs/oxygen-templates.md`); export JSON to `design-exports/oxygen/`.
- Provide content: YouTube channel, CV, social links, real project details.
- Stand up hosting (aaPanel); set `CIAN_YT_*` in `wp-config.php`.

## 8. Working agreement

- Branch, don't commit to the default branch. Open a PR; keep it focused; describe verification done.
- Report outcomes honestly: if something is unverified (e.g. JS runtime behavior without a browser), say so.
- If a task needs the owner's licensed software (Oxygen), account, or content, stop and ask — don't fabricate it.

---

## 9. Reusing this repo as a template (for "any other AI" build)

This structure generalizes to any AI-agent-built content site:

1. **Plan first** (`docs/plan/`) — a numbered, authoritative spec an agent can't drift from.
2. **A discovery doc** that overrides the plan with confirmed real-world decisions.
3. **One plugin/module that owns all data + logic**, builder/framework-agnostic, so the presentation layer is swappable.
4. **Pure render functions + thin data wrappers**, so rendering is unit-testable without the CMS.
5. **A three-layer verification harness** (static → framework-free smoke test → real runtime) so an agent can prove its own work — including the no-Docker SQLite trick for restricted environments.
6. **This AGENTS.md** — the state-of-the-world entry point that keeps every agent grounded.

Swap the domain (WordPress → any CMS/framework), keep the discipline.
