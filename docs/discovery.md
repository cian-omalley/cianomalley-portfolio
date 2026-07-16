# Phase 0 — Discovery Record

> Confirmed answers from Cian, 2026-07-16. This document is the input contract for Phases 1+.
> Where an answer changes the master plan, the change is noted and the plan files have been updated.

## 1. Builder & plugin licenses ✅

Licensed and available: **Oxygen Builder 6**, **Breakdance Elements for Oxygen**, **ACF Pro** (and related tooling). No blocker for Architecture A.

## 2. Hosting — self-hosted first ✅ (plan amendment)

**Decision:** start **self-hosted** (home server), moving to a VPS later. Server-management panel to be chosen — candidates: **SpinupWP**, **aaPanel**, or similar host-management tooling.

Plan impact (Part 12 §36 amended):
- The original plan rejected self-hosting *for production launch*; the amended sequence is: **self-hosted for build/staging and early production → migrate to VPS when traffic/uptime demands it**. The stack recommendation (Nginx + PHP 8.3 + MariaDB + Redis + real cron) is identical on both, so the migration is a rsync + DB move, not a rebuild.
- **Panel decision (confirmed): aaPanel** on the home server for stage 1. SpinupWP is a control panel that provisions *cloud servers* (it manages a VPS, not a home server), so it fits the *later* VPS stage. Path: **aaPanel at home now → SpinupWP-managed VPS later**.
- aaPanel provisions the stack (Nginx + PHP 8.3 + MariaDB + Redis + SSL) with a web UI. To stay migration-friendly, keep WordPress config portable (no aaPanel-only assumptions in the site itself), back up offsite, and put both domains behind Cloudflare (with a Tunnel to hide the residential IP) so the eventual VPS move is a DNS change. aaPanel's own firewall/fail2ban features are used but the site never depends on the panel.

## 3. YouTube channel — does not exist yet ✅ (plan amendment)

There are **no videos and no proper channel yet** — it is in the works. Additionally: **building this portfolio will itself be an Oxygen 6 tutorial (series) and an Oxygen 6 review** — the first real content.

Plan impact:
- Phase 5 (YouTube integration) is built against a **new, initially empty channel** — sync still gets implemented, but import tooling will be exercised with the first uploads rather than a back-catalog.
- Content bootstrapping: document the portfolio build as it happens (screenshots, notes, recordings) so the "Building this portfolio with Oxygen 6" tutorial series and the Oxygen 6 review are ready near launch. First `tutorial_series` = the portfolio build. First `review` = Oxygen Builder 6.
- The plan's rule stands: every important video also exists as a written guide — which means the written guides can (and should) ship *before* the videos.

## 4. Presentable projects ✅

**None fully presentable yet.** This portfolio plus a few others are in the works. Consequence: launch content = this portfolio as the flagship case study (status: In Progress), other projects entered with honest statuses (Prototype / Research / In Progress). No invented results.

## 5. Guide & review topics ✅

Guides will center on:
- **Self-hosting**
- **Hermes Agent**
- **Oxygen Builder**
- **WordPress**
- **JetBrains** tooling

Reviews (software/IDE focus initially):
- **Antigravity**
- **IntelliJ IDEA Ultimate**
- **Codex**
- other IDEs/editors as they come
- **Oxygen Builder 6** (see #3)

Taxonomy impact: initial `guide_category` seeds should include Self-Hosting, WordPress, Development, AI; `technology` terms seed with Oxygen Builder, WordPress, Hermes Agent, JetBrains, PHP, Docker; `review_category` seeds include Software, IDEs & Developer Tools.

## 6. 3D ambition — dense mini city ✅ (creative amendment)

**Decision:** a **compact, dense mini city** — districts bunched close together, *not* spread apart. The camera lives **inside the city**: the visitor should feel like they're standing in the middle of it, and must **never be zoomed out far enough to see the edges** of the model.

Plan impact (Parts 05 §14 and 07 §23 amended in spirit):
- Camera node graph keeps nodes **low and inside** the cityscape (street/plaza level and mid-height), with building masses always framing the view; no top-down or full-overview node. The map overlay (2D) replaces any "see everything" camera.
- The scene is built with a **surrounding skyline shell** (cheap silhouette geometry + fog) so every direction reads as "more city", hiding world edges at all times.
- Districts become adjacent city blocks around a central plaza (the Arrival Platform) rather than ring-separated destinations; transitions are short street-level glides.
- Fog + depth cueing double as both atmosphere and edge concealment — this makes the never-see-the-edge rule cheap to keep.

## 7. Domains ✅ (plan amendment — reverses the original brief's assignment)

**Decision:** **`cianomalley.works` is the primary portfolio domain.** **`cianomalley.dev` hosts small showcase projects, demos, and experiments.**

Plan impact: all domain references in `docs/plan/` and the README have been updated. `.dev`'s HSTS-preload (HTTPS mandatory) suits the demo/projects role fine. Documents/CV now live on the primary `.works` site (e.g. `/cv/`), since `.works` no longer needs to be a separate document domain.

## 8. SEO plugin — free choice ✅ (build decision)

**Decision:** use a **free** SEO plugin. Recommended: **The SEO Framework** — its core is fully free (no ads, no upsell nagging), lightweight, and covers titles/descriptions, Open Graph/Twitter cards, XML sitemaps, `BreadcrumbList`, robots/canonical, and basic `BlogPosting` schema. (Rank Math's free tier is also free but freemium with upsells; The SEO Framework is the cleaner fully-free fit.)

Plan impact (Part 11 §32):
- The SEO plugin owns: titles/descriptions (fed from the ACF SEO clone fields via filter), OG/Twitter, XML sitemaps, breadcrumbs, robots/canonical.
- The **plugin** (`cian-portfolio-core/includes/seo.php`) still owns the richer types under the single-emitter rule: `HowTo`, `VideoObject`, `Review`/`Product`, `TechArticle`, `Person`/`WebSite`, `ItemList`, and the generated `/video-sitemap.xml` (The SEO Framework has no native video sitemap — the plugin fills that gap).
- No paid SEO add-on is required for launch.

---

## Remaining open items (not blockers)

| Item | Owner | Needed by |
|---|---|---|
| Create the YouTube channel (name, handle, branding) | Cian | Phase 5 |
| CV file + social links | Cian | Phase 4 |
