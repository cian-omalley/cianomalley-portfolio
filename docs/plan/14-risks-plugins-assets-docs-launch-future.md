# Part 14 — Risk Register, Plugin Recommendations, Asset Requirements, Documentation Requirements, Launch Checklist, Future Expansion Roadmap

> Covers required output sections: **39. Risk register**, **40. Plugin recommendations**, **41. Asset requirements**, **42. Documentation requirements**, **43. Launch checklist**, **44. Future expansion roadmap**
> Plan index: [README.md](README.md)

---

## Section 39 — Risk Register

| # | Risk | Likelihood | Impact | Mitigation | Contingency |
|---|---|---|---|---|---|
| R1 | 3D scope overruns time/budget | High | Medium | Phase-6 gate (site launchable without 3D); tiered ambition (hub-first); feature flag | launch standard site; ship world later |
| R2 | Oxygen 6 instability/regression | Medium | High | staging-first updates; design exports per milestone; Phase-3 fallback gate | switch to Architecture B before templates exist; after launch, pin versions until fixed |
| R3 | YouTube API change/quota policy shift | Medium | Medium | isolated client module; cached-data frontend; quota monitoring | site unaffected (cache); sync paused until client updated |
| R4 | Deleted/private YouTube videos break tutorials | Medium | Medium | sync flags; pages keep transcript/guide; "unavailable" notice | knowledge persists in written guides — by design |
| R5 | Performance budgets blown by world assets | Medium | High | budgets enforced at Phase 10; compression pipeline; adaptive tiers | reduce detail chunks; Low-tier default; flag off |
| R6 | GDPR misstep (embeds/analytics) | Low | High | contextual-consent facades; cookieless analytics; legal pages reviewed | CMP escalation (Complianz); disable embeds pending fix |
| R7 | Builder lock-in pain later | Medium | Medium | tokens/logic/renderers all plugin-owned; builder = layout only | bounded template rebuild (documented invariant) |
| R8 | Solo-maintainer bus factor / time drought | High | Medium | boring-tech choices; documentation (§42); automated backups/updates | site degrades gracefully — content workflows stay standard WP |
| R9 | Spam/abuse on forms & report endpoint | High | Low | honeypot, time-trap, rate limits, Turnstile ready | disable endpoint, mailto fallback |
| R10 | Search index drift (transcripts) | Low | Low | incremental indexing on save; rebuild CLI | scheduled weekly rebuild |
| R11 | Restore failure discovered too late | Low | High | quarterly restore drills | secondary backup target (different provider) |
| R12 | ACF Pro/SearchWP license lapse | Low | Medium | renewal calendar; licenses in password manager | both degrade readable (fields persist as postmeta; native search fallback) |

---

## Section 40 — Plugin Recommendations

The complete evaluated table (purpose, necessity, performance impact, alternative, removal strategy per plugin) is maintained in **Part 12 §35** — single source to avoid drift. Summary of the recommended production set (9 plugins total, deliberately small):

**Essential:** ACF Pro · Oxygen 6 · Fluent Forms · SEO plugin (The SEO Framework or Rank Math) · Two-Factor · `cian-portfolio-core` (custom).
**Recommended:** Breakdance Elements for Oxygen · SearchWP · Redis Object Cache.
**Conditional:** page-cache plugin *only if* Nginx FastCGI cache is not used · Complianz *only if* consent scope grows beyond contextual facades.
**Rejected by default:** page builders beyond Oxygen on production, Jetpack, general "optimization suite" plugins (duplicate server capabilities), reCAPTCHA (privacy), Google Analytics (privacy; use Plausible/Matomo self-hosted).

---

## Section 41 — Asset Requirements

### 3D & art

Blender source files (versioned via Git LFS) · `district-core.glb` (hub + 8 silhouettes, ≤1.5 MB) · 8 detail chunk GLBs (≤600 KB each) · KTX2 texture set (atlas per district) · HDR-free lighting rig (baked/analytic) · 2D district renders for mobile guided panels + OG images (8 × WebP, 2 crops each) · icon sprite (Lucide subset, ~40 icons) · favicon/app icons + `manifest.webmanifest`.

### Typography

Space Grotesk (500/700), Inter (400/500/600), JetBrains Mono (400/500) — subsetted woff2, licenses verified (all OFL).

### Content assets (owner-supplied, Phase 0/4)

Portrait photo (optional) · CV PDF (for `.works`) · per-project: cover image (1600×900), 3–8 screenshots, optional demo clip · per-guide: step screenshots, diagrams (SVG preferred) · per-review: product photos (originals, not manufacturer stock where possible) · per-video: YouTube handles thumbs (synced); local videos need poster frames + VTT captions · social preview default image (1200×630) · privacy/imprint legal texts (reviewed).

### Tooling

Blender + glTF pipeline (gltfpack/draco, toktx) · Vite build for world bundle · font subsetter (glyphhanger or fonttools) · image pipeline (Imagick server-side; squoosh for one-offs) · axe DevTools · WebPageTest/Lighthouse CI profile.

---

## Section 42 — Documentation Requirements

All docs live in the repo (`docs/`), written for "future Cian or another developer/AI agent":

1. **`docs/decisions/`** — ADRs: builder ownership (the invariant), plugin additions, BEO element audit results, any deviation from this plan.
2. **`docs/runbook.md`** — operations: deploy, backup/restore procedure (with the quarterly drill checklist), cron health, cache purge, update order (WP → plugins → Oxygen, staging-first), incident basics.
3. **`docs/youtube-sync.md`** — credential setup (where constants live), connecting the channel, quota notes, attention-queue triage, WP-CLI commands, revocation/rotation procedure.
4. **`docs/content-guide.md`** — the owner's manual mirroring Part 11 §34: how to publish each content type, image size rules, alt-text policy, transcript workflow (status meanings), chapter formatting.
5. **`docs/design-system.md`** — token reference, component usage, motion rules, accessibility conventions; plus the living styleguide page on staging.
6. **`docs/world.md`** — scene architecture, camera-node map, asset pipeline (Blender → glb → ktx2 → repo), budgets, how to add a district/beacon.
7. **Plugin inline docs** — module headers describing responsibilities; REST endpoints documented in `docs/api.md` (routes, params, cache behavior).
8. **`design-exports/`** — Oxygen template JSON per milestone with changelog.
9. **This plan** (`docs/plan/`) — updated when reality diverges; the plan is a living contract.

---

## Section 43 — Launch Checklist

**Content ready:** ≥4 projects (2 featured) · ≥5 guides verified-dated · all channel videos imported, each important tutorial has summary + transcript/captions + chapters + related resources + its own page (brief's minimum bar) · ≥1 series assembled · ≥2 reviews with disclosure · About + timeline + CV current · social links set.

**Technical:** all Phase-11 matrix green · CWV budgets green (lab + field sample) · axe clean on every template · schema valid (Rich Results test: HowTo, VideoObject, Review, TechArticle) · sitemaps (XML + video) submitted to Search Console · canonical/OG spot-checked · 404 page themed · redirects (if any legacy URLs) live.

**Security/ops:** HTTPS strict on both domains (`.dev` preload verified) · security headers pass (securityheaders.com A) · 2FA enforced · backups running + last restore drill date recorded · uptime monitor active · cron health green · rate limits verified · staging noindexed + basic-auth.

**Privacy/legal:** privacy policy + imprint published · consent facade verified (zero pre-click Google requests) · analytics cookieless config verified · form consent + retention purge task scheduled · data exporter/eraser tested.

**Go-live:** DNS cutover in low-traffic window · cache warm of top pages · post-launch week: monitor uptime/404s/CWV field data/sync runs daily · announce (YouTube channel links updated to point at the site: video descriptions template includes guide URLs).

---

## Section 44 — Future Expansion Roadmap

Ordered by value-to-effort; none blocks launch:

1. **WebSub push sync** (Part 04) — near-real-time new-video import. Low effort.
2. **AI-assisted transcript → guide drafting** — pipeline that turns a Reviewed transcript into a `guide_steps` draft (never auto-published; status workflow already enforces review). Medium effort, high content leverage.
3. **Per-district micro-scenes & seasonal set-dressing** — deepen the world within budgets (Part 07 optional tier). Medium-high effort.
4. **Workflow B: WordPress→YouTube uploads** — only if the VPS + Action Scheduler + need all materialize (Part 04 §10 decision rule). High effort.
5. **Newsletter / RSS-first subscriptions** — RSS feeds exist free with CPTs; add a privacy-respecting newsletter (Listmonk self-hosted) when audience justifies. Low-medium effort.
6. **Search upgrade to Meilisearch/Typesense** — if content volume makes SearchWP sluggish (Part 09 §28 revisit trigger: >2k indexed items or >300 ms p95 query). Medium effort.
7. **Live/stream integration in Tutorial Studio** — surface live status (already synced) with a "live now" beacon; embed consented player. Low effort.
8. **Case-study PDF export on `.works`** — generated project dossiers for recruiters. Medium effort.
9. **Multilingual (DE/EN)** — Polylang evaluation; significant content cost, defer until demand. High effort.
10. **Community features (comments)** — only with strong moderation + GDPR posture; default remains "discuss on YouTube". Reassess yearly.
11. **WebXR district visit** — explicitly deferred spectacle; revisit only after everything above.
