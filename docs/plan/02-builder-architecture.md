# Part 02 — Builder Architecture

> Covers required output sections: **3. Recommended builder architecture**, **4. Oxygen versus Breakdance comparison**, **5. Builder responsibility matrix**
> Plan index: [README.md](README.md)

---

## Section 3 — Recommended Builder Architecture

### Recommendation: **Architecture A** (Oxygen-led, Breakdance Elements as component library)

- **WordPress** core, current stable.
- **Oxygen Builder 6** — sole owner of the global site: design tokens surface, headers/system navigation, all archive and single templates, homepage.
- **Breakdance Elements for Oxygen** — used *inside* Oxygen for compatible reusable UI elements (tabs, accordions, sliders, form styling) where they save build time. It runs as an element pack within Oxygen's editor; Breakdance-the-builder is **not installed** on production and never owns templates.
- **ACF Pro** — all structured data (field groups registered in PHP/JSON from the plugin, edited via ACF UI on staging, exported to code).
- **`cian-portfolio-core`** plugin — post types, taxonomies, relationships, YouTube sync, REST, transcripts, chapters, WP-CLI, admin pages, conditional assets, security/privacy (full architecture in Part 09).
- **Custom CSS/JS** — design tokens in `tokens.css` (plugin-owned, outside any builder), world/interaction JS in the plugin.
- **Three.js** — one central interactive scene only, lazy-loaded (Part 07).
- **WordPress REST API** — extended namespace `cian/v1` feeds the interactive world with cached content data.

### Why Architecture A wins

1. **Structural control.** The interactive environment, click-to-load players, transcript components, and command menu all need precise DOM, deterministic class names, and tight custom-code integration. Oxygen's class-based, lean-output model fits this; Breakdance's convenience abstractions fight it.
2. **Single ownership.** The brief's hard rule — no conflicting ownership between builders — is satisfied by construction: only one builder exists on production.
3. **Maintainability.** Tokens live in plugin CSS, data lives in ACF/plugin PHP, logic lives in the plugin. The builder is a thin templating layer; if Oxygen were ever abandoned, templates are the only rebuild surface.
4. **Breakdance value retained safely.** Breakdance Elements for Oxygen delivers Breakdance's best UI components *as Oxygen elements*, giving speed without dual-builder risk.

### Why not Architecture B (Breakdance production build)

Viable, and the better choice **if** the owner prioritized visual editing speed over structural control and the 3D system stayed contained. Rejected here because: (a) the environment and video/transcript components are custom-code-heavy, where Oxygen integrates more cleanly; (b) Breakdance's wrapper markup and global settings make token-level control from an external stylesheet noisier; (c) the owner (Cian) is a developer — Oxygen's developer-leaning workflow is an advantage, not a cost. **Fallback decision rule:** if during Phase 3 Oxygen 6 shows blocking instability on the current WP version, switch to Architecture B wholesale *before* any templates are built — never mid-build.

### Why not Architecture C (controlled dual-builder)

There is no strong technical reason that requires both. Every capability needed is reachable with Oxygen + Breakdance Elements + plugin code. Dual-builder doubles update risk, CSS cascade complexity, and documentation burden. If Cian wants to *experiment* with Breakdance, the sanctioned arrangement is the brief's second variant: **Breakdance only in a separate staging/sandbox installation**, never on the production database. Documented as policy in Part 12.

---

## Section 4 — Oxygen versus Breakdance Comparison

| Criterion | Oxygen Builder 6 | Breakdance | Winner for this project |
|---|---|---|---|
| Output cleanliness / DOM control | Class-based, minimal wrappers, developer-oriented | More wrapper markup, element-scoped CSS | **Oxygen** |
| Custom code integration (PHP/JS hooks, code blocks) | First-class; designed for developers | Good (custom code elements) but more sandboxed | **Oxygen** |
| Visual editing speed / ease for non-developers | Steeper curve | Excellent — best-in-class UX, global blocks, form builder | Breakdance (not decisive: owner is a developer) |
| Template system & conditions | Full templating with conditions, reusable components | Full templating, arguably friendlier UI | Tie |
| Dynamic data (ACF) | Native dynamic data, repeater support via code/loops | Strong native ACF integration incl. repeaters in Post Loop Builder | Slight Breakdance edge, both sufficient |
| Query loops for CPT archives | Repeater/loop with custom query control | Post Loop Builder, very capable | Tie |
| Forms | Basic; typically pair with Fluent Forms/WS Form | Built-in form builder | Breakdance (mitigated: use Fluent Forms under Oxygen) |
| Global design tokens from external CSS | Straightforward — Oxygen respects external stylesheets and selectors cleanly | Works, but global settings UI competes with external tokens | **Oxygen** |
| Ecosystem overlap | Breakdance Elements for Oxygen brings BD components into Oxygen | — | **Oxygen** (gets both) |
| Long-term risk | Both are Soflyy products; Oxygen 6 is a major rewrite sharing Breakdance's engine | Same vendor | Tie (shared engine reduces divergence risk) |
| Fit for heavy custom 3D/interaction layer | Thin layer over custom code — ideal | Heavier abstraction | **Oxygen** |

**Conclusion:** Oxygen 6 as production builder; Breakdance's genuine strengths (elements, forms UX) are either imported via Breakdance Elements for Oxygen or substituted (Fluent Forms).

---

## Section 5 — Builder Responsibility Matrix

Owner legend: **OX** = Oxygen template/component, **PLG** = `cian-portfolio-core` plugin, **ACF** = ACF Pro, **EXT** = dedicated third-party plugin. Breakdance column shows what it *would* do under Architecture B (kept for reference; on production Breakdance owns **nothing**).

| System | Oxygen implementation | Breakdance implementation (Arch. B reference) | Recommended owner | Dependencies | Risks | Maintenance implications |
|---|---|---|---|---|---|---|
| Global colors | Consume CSS custom properties from `tokens.css`; mirror as Oxygen global colors for editor pickers | Global Settings → Colors | **PLG** (`tokens.css`); OX mirrors | none | Drift between tokens and builder mirror | Change tokens once in CSS; re-sync editor mirror rarely |
| Typography | Global classes referencing token vars; local font files | Global Settings → Typography | **PLG** tokens + **OX** classes | Local fonts (Part 06) | Font loading regressions | Fonts versioned in plugin assets |
| Spacing scale | CSS vars (`--space-1…12`) + Oxygen global classes | Global Settings spacing | **PLG** | none | Ad-hoc pixel values sneaking in | Enforce via review checklist |
| Design tokens | `assets/css/tokens.css`, enqueued site-wide, builder-agnostic | Same file | **PLG** | none | none | Single source of truth; survives builder migration |
| Homepage (fallback + 3D mount) | Oxygen page template with world mount `<div id="district-root">` + full HTML fallback beneath | BD template | **OX** (layout) + **PLG** (world JS) | REST API, world assets | 3D/DOM layering bugs | Fallback content is the SEO surface; test both modes |
| Interactive environment | Custom JS only; Oxygen supplies mount + overlay panels | Same via custom code element | **PLG** | Three.js, REST | Largest technical risk on site | Isolated module; can be disabled by feature flag |
| Project archive | Oxygen archive template + filter component | BD Post Loop Builder | **OX** | CPT, taxonomies, ACF | Query performance | Standard template maintenance |
| Project single template | Oxygen single template, ACF dynamic data, case-study sections | BD template | **OX** | ACF field group | Long field list → template sprawl | Section-per-ACF-tab structure |
| Guide archive | Oxygen archive + difficulty/OS/topic filters | BD equivalent | **OX** | taxonomies | — | — |
| Guide single template | Oxygen template + plugin-rendered step/command/TOC components (shortcodes) | BD equivalent | **OX** layout + **PLG** components | ACF, `content.css` | Reading-mode regressions | Guide components versioned in plugin |
| Video archive | Oxygen archive; static thumbnails only; filters | BD equivalent | **OX** | video CPT, cached YT meta | Accidental live embeds | Click-to-load enforced by shared component |
| Video single template | Oxygen template + plugin player/transcript/chapter components | BD equivalent | **OX** layout + **PLG** components | YT sync data | Consent/embed bugs | Player logic centralized in `video-player.js` |
| Tutorial-series template | Oxygen template + ordered-lesson component | BD equivalent | **OX** + **PLG** (ordering logic) | relationships | Order integrity | Order stored in ACF, rendered by plugin |
| Blog (article) archive | Oxygen archive | BD equivalent | **OX** | article CPT | — | — |
| Article single template | Oxygen template, reading-optimized | BD equivalent | **OX** | — | — | — |
| Review archive | Oxygen archive + category/score filters | BD equivalent | **OX** | review CPT | — | — |
| Review single template | Oxygen template + plugin score/pros-cons/spec components | BD equivalent | **OX** + **PLG** | ACF scores | Schema/display drift | Score rendering + schema share one data source |
| About page | Oxygen page + timeline component | BD page | **OX** + **PLG** (timeline query) | timeline CPT | — | — |
| Contact page | Oxygen page embedding form | BD page + BD Forms | **OX** + **EXT** (Fluent Forms) | consent text | Spam | Form plugin chosen for GDPR features |
| Forms | Fluent Forms (free tier sufficient) styled by tokens | Breakdance Forms | **EXT** | GDPR consent field | Plugin dependency | Documented removal path (Part 14 §40) |
| Search (UI) | Oxygen search overlay component + plugin JS | BD equivalent | **OX** UI + **PLG** logic + **EXT** (SearchWP) | search engine | Index staleness | See Part 09 §28 |
| Video synchronization | — (never in builder) | — | **PLG** | YT Data API | Quota, API changes | Isolated module + admin dashboard |
| YouTube API integration | — | — | **PLG** | credentials in `wp-config.php` | Credential leakage | Never in builder elements — hard rule |
| Custom PHP | Only trivial template conditions in Oxygen; everything else in plugin | Same rule | **PLG** | — | Logic scattered in builder = migration debt | Code review rule: no business logic in builder |
| Custom JavaScript | Enqueued by plugin, conditionally per template | Same | **PLG** | — | — | — |
| Custom CSS | `tokens/base/components/content/video/accessibility`.css in plugin; Oxygen classes for layout only | Same | **PLG** (system CSS) + **OX** (layout CSS) | — | Specificity wars | Layered: tokens → base → builder → components |
| SEO | — | — | **EXT** (SEO plugin, Part 11) + **PLG** (video/schema extensions) | schema data from ACF | Duplicate schema | Plugin emits only what SEO plugin can't |
| Structured data | JSON-LD emitted by plugin per CPT | — | **PLG** (+ SEO plugin for basics) | ACF | Conflicting schema | Single emitter per type; SEO plugin's version disabled where plugin emits |
| Accessibility layer | Skip links, focus management, a11y menu | — | **PLG** (`accessibility.js`, `accessibility.css`) + **OX** (semantic markup) | — | Regressions on template edits | A11y test pass required per release |
| Caching | — | — | **EXT** (cache plugin) + server (Redis, Cloudflare) | hosting | Stale cached YT data vs page cache | Sync writes bust relevant cache keys |

**Hard rules (documented, enforced):** one builder on production; both builders never edit the same page/template (trivially true — only Oxygen exists there); template conditions are owned solely by Oxygen; shared design tokens live in the plugin, outside any builder; any Breakdance experimentation happens on a separate sandbox install; every ownership change is recorded in `docs/decisions/`.
