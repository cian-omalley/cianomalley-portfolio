# Part 08 — Oxygen Implementation Plan & Breakdance Implementation Plan

> Covers required output sections: **24. Oxygen implementation plan**, **25. Breakdance implementation plan**
> Plan index: [README.md](README.md)

---

## Section 24 — Oxygen Implementation Plan (production)

### Global setup

1. **Design tokens:** plugin enqueues `tokens.css` → Oxygen global colors are created *mirroring* token values and named identically (`--violet-electric` ↔ "Violet Electric") so pickers stay on-palette. Rule: builder never introduces a color that isn't a token.
2. **Global classes (utility layer):** `.panel-glass`, `.chip`, `.btn`, `.btn-primary`, `.btn-ghost`, `.measure-reading`, `.stack-{s,m,l}` (vertical rhythm), `.grid-cards`, `.visually-hidden`, `.focus-ring`. Defined once in Oxygen's global stylesheet section but *referencing token vars* — no literal values.
3. **Typography:** global text settings point at self-hosted font families registered by the plugin (`assets.php` provides `@font-face`; Oxygen only selects family names).
4. **Oxygen components (reusable):** Card family (variant per CPT), Filter bar, Hero blocks (page/project/review), Breadcrumbs, Footer, Section shells. Built as Oxygen 6 components with props/overrides where supported.

### Templates & conditions (Oxygen owns all conditions — no overlaps)

| Template | Condition | Key contents |
|---|---|---|
| `tpl-base` | all (lowest priority) | skip links, accessible menu hook, footer, command-menu mount |
| `tpl-home` | front page | identity hero, world mount `#district-root`, fallback sections |
| `tpl-project-archive` | archive: project (+ its taxonomies) | filter bar + card loop |
| `tpl-project-single` | single: project | case-study layout |
| `tpl-guide-archive` / `tpl-guide-single` | archive/single: guide | §21 components; single enqueues reading mode |
| `tpl-article-archive` / `tpl-article-single` | archive/single: article | |
| `tpl-video-archive` / `tpl-video-single` | archive/single: video | facade cards / player page |
| `tpl-series-archive` / `tpl-series-single` | archive/single: tutorial_series | lesson list |
| `tpl-review-archive` / `tpl-review-single` | archive/single: review | score panel etc. |
| `tpl-page` | generic pages | about/contact/lab/map built as pages on this |
| `tpl-search` | search results | grouped results |
| `tpl-404` | 404 | themed |

### ACF integration & query loops

- Simple fields via Oxygen dynamic data; complex structures (flexible content steps, chapters, transcripts, score panels, timeline, related blocks) via **plugin render callbacks exposed as shortcodes** placed in templates. Rationale: complex rendering in PHP is testable, versioned, and builder-portable.
- Archive loops: Oxygen repeater/query builder with standard `WP_Query` args (tax filters from `$_GET`, sanitized by a small plugin helper that builds `tax_query` — logic in plugin, not builder).
- Filter bars submit as GET forms (server-rendered results, no-JS safe); `navigation.js` progressively enhances with history-managed fetch.

### Feature placement (what lives where)

| Capability | Form |
|---|---|
| Card layouts, heroes, archive structure | **Oxygen components** |
| Guide/video/review complex components | **plugin shortcodes/PHP** (§20–21) |
| CPTs, taxonomies, fields, relationships, sync, REST | **plugin PHP** |
| World, menus, players, transcripts behavior | **plugin JS**, conditionally enqueued |
| Blocks/Gutenberg | not used for layout (editor stays for article/guide prose bodies) |
| Shortcodes | only the plugin's render components — no third-party shortcode soup |

### Breakdance Elements for Oxygen usage

Allowed set: accordion, tabs, advanced slider/lightbox, marquee-free content elements — each adopted **only after an a11y check** (keyboard, focus, ARIA). Recorded in `docs/decisions/beo-elements.md` with pass/fail. Any failing element is replaced by a native/plugin equivalent. BEO elements must inherit tokens (audit their emitted CSS; override via `components.css` where needed).

### Responsive settings

Oxygen breakpoints aligned to: 480 / 768 / 1024 / 1366 / 1920 (+ ultrawide handled by `max-width` containers: content 1200 px, reading 70ch, full-bleed sections capped at 1920 with composed edges). Mobile-first classes; hover-dependent styles gated behind `@media (hover: hover)`.

### Staging, export, backup

All template work happens on **staging** first (Part 12 hosting: staging subdomain, separate DB). Promotion = database-aware deployment (WP Migrate/WP-CLI search-replace) on a maintenance window; Oxygen designs live in the DB, so **template JSON exports** are taken per milestone and committed to `design-exports/oxygen/` in the repo (with a changelog), plus nightly DB backups (Part 12). Editing on production directly is prohibited by policy.

---

## Section 25 — Breakdance Implementation Plan (contingency blueprint — executed only if Architecture B is activated)

Kept deliberately parallel so a Phase-3 builder switch costs planning nothing.

- **Global colors/typography:** Breakdance Global Settings mirror `tokens.css` (which remains the source of truth and stays enqueued); same "no off-token colors" rule.
- **Global blocks:** Card family, filter bar, footer, heroes as Breakdance Global Blocks with block-level overrides.
- **Template conditions:** identical matrix to §24's table, expressed in Breakdance's template conditions UI; same "one owner, no overlaps" rule.
- **Dynamic ACF data:** Breakdance's native ACF integration covers simple fields *and* repeaters in the Post Loop Builder; flexible-content guide steps still render via the **same plugin shortcodes** — this rule does not change with the builder.
- **Post Loop Builder:** archive loops + related-content loops; query params sanitized by the same plugin helper.
- **Guide/video/review templates:** layout in Breakdance; all §20–21 components remain plugin-rendered.
- **Forms:** Breakdance Forms *would* replace Fluent Forms (native advantage of Arch. B) — with GDPR consent checkbox, honeypot, and submission storage policy retained.
- **Reusable elements & custom code:** Breakdance custom code elements only for mounting plugin components (world mount, menus) — never for API logic.
- **Responsive:** same breakpoints/caps as §24.
- **Staging/export:** same staging-first policy; Breakdance's template export committed to `design-exports/breakdance/`.

**Native vs plugin split (unchanged in either architecture):** builders own *layout, loops, and simple dynamic text*; the plugin owns *data model, sync, transcripts/chapters, complex renderers, JS behavior, REST, SEO extensions, security*. This is the invariant that makes the builder swappable.
