# Part 11 — SEO & Structured Data, GDPR & Privacy, WordPress Admin Workflow

> Covers required output sections: **32. SEO and structured-data plan**, **33. GDPR and privacy plan**, **34. WordPress admin workflow**
> Plan index: [README.md](README.md)

---

## Section 32 — SEO and Structured-Data Plan

### Foundations

Everything indexable is **server-rendered HTML at a direct, canonical URL** — the 3D layer changes nothing for crawlers (canvas is additive; hotspots navigate to real URLs). Canonicals on every page; clean permalinks per Part 03; breadcrumbs on all singles; pagination `rel` handled by the SEO plugin.

**SEO plugin:** The SEO Framework or Rank Math (final pick at Phase 3 after weight check — criteria: sitemap quality, schema control granularity, no ad-noise). It supplies: titles/descriptions (fed from the ACF SEO tab via filter), XML sitemaps (per CPT + **video sitemap** — if the chosen plugin's video sitemap is weak, `seo.php` generates `/video-sitemap.xml` from cached video data: player URL, thumbnail, duration, publication date), Open Graph + Twitter cards (per-post image, defaults from options page), breadcrumb data, robots/noindex for staging and utility pages (`/search/`, `/map/` indexable-but-low-priority; 404/settings noindex).

### Structured data (single-emitter rule: for each type, exactly one source emits — plugin emitters disable the SEO plugin's overlapping block)

| Schema | Where | Emitted by |
|---|---|---|
| `Person` + `WebSite` (with `SearchAction`) | site-wide (home) | plugin `seo.php` |
| `BreadcrumbList` | all singles | SEO plugin |
| `CreativeWork` / `SoftwareApplication` | project singles (SoftwareApplication when project is shipped software with a live/download URL; else CreativeWork) | plugin |
| `TechArticle` | guide singles | plugin |
| `HowTo` (steps from `guide_steps` sections, tools/supplies from required software/hardware) | guide singles | plugin |
| `VideoObject` (name, description, thumbnail, uploadDate, duration, embedUrl `youtube-nocookie`, transcript excerpt where Reviewed/Published) | video singles + embedded in guides with video | plugin |
| `BlogPosting` | article singles | SEO plugin (plugin adds `about` links to related entities) |
| `Review` + `Product` (itemReviewed, ratingValue from overall score, author Person, positiveNotes/negativeNotes from pros/cons) | review singles | plugin |
| `ItemList` | series singles (ordered lessons), archives (first page) | plugin |

Guide+video pages emit `TechArticle` + `HowTo` + `VideoObject` as one `@graph` with distinct `@id`s — no duplicated/conflicting nodes (validated in testing with Google's Rich Results test).

---

## Section 33 — GDPR and Privacy Plan (Germany/EU)

### Data inventory (deliberately minimal)

| Data | Purpose | Storage | Retention |
|---|---|---|---|
| Contact form (name, email, message, consent timestamp) | replying | WP DB (Fluent Forms) + email | purge after 12 months (documented; WP exporter/eraser wired) |
| "Report outdated" submissions | content quality | same channel | same |
| Server logs (IP) | security | VPS | rotate 14 days |
| localStorage (graphics, motion, series progress, consent) | preferences | client only | user-clearable; no server copy |
| Analytics | traffic insight | **Plausible or Matomo (self-hosted, EU, cookieless)** — no Google Analytics | aggregate only |

### YouTube embeds & consent

- All embeds use **`youtube-nocookie.com`** *and* **click-to-load facades**: before activation, zero requests to Google — thumbnails are locally cached copies, so not even `i.ytimg.com` is contacted.
- Consent model: a lightweight consent layer (Complianz or a minimal custom implementation in `privacy.php`) with the facade acting as **contextual consent**: the facade explains "Playing loads content from YouTube (Google). See privacy policy." with per-click accept + optional "always allow YouTube" remembered choice. No YouTube resources load before that consent. Cookieless self-hosted analytics avoids a broader cookie banner; if analytics choice changes, the CMP scales up.
- Consent state is exposed via a tiny JS API consumed by `VideoFacade`; denial keeps thumbnail + "Watch on YouTube" external link (informed navigation).

### Legal pages & policies

`/privacy/` (German + English: data inventory above, YouTube/Google disclosure, analytics disclosure, rights under GDPR, controller identity) · `/imprint/` (Impressum per §5 TMG/DDG — required for a German site) · form consent text + unticked checkbox · data-retention and contact-form storage policy stated in privacy page and enforced by scheduled purge task.

### Credential & token protection

API key/OAuth secrets only in `wp-config.php`/env (never DB, never builder); OAuth refresh tokens encrypted at rest (libsodium, key outside DB); **revocation process documented**: settings page "Disconnect" → token revoke call to Google + local wipe; quarterly key rotation note in maintenance calendar. Thumbnail caching rule: cached YouTube thumbnails are public content served locally (no user data), refreshed by sync, removed when a video post is deleted. All external services (YouTube, Cloudflare, analytics) disclosed in the privacy policy.

---

## Section 34 — WordPress Admin Workflow

### Owner task → path (everything without JSON editing)

| Task | Path |
|---|---|
| Add project | Projects → Add New → tabbed ACF (Overview → Case study → Media → Links → Related → World → SEO); required fields validated on publish |
| Publish guide | Guides → Add New → flexible-content steps ("Add step / command / code / callout / download" buttons); screenshots via gallery; commands pasted into command blocks |
| Link video ↔ guide | either edit screen → Related tab → relationship search; or Portfolio → YouTube → attention queue → "Link guide" |
| Import YouTube videos | Portfolio → YouTube → Sync now / playlist import checkboxes |
| Create tutorial series | Series → Add New → drag-ordered lessons repeater |
| Reorder lessons | drag rows in `series_lessons` |
| Add transcript | Video edit → Transcript metabox → upload VTT/SRT or paste text → segments parsed → per-segment edit → status dropdown |
| Add chapters | Video edit → Chapters repeater (or confirm auto-parsed draft from YT description) |
| Publish review | Reviews → Add New → tabs (Product → Scores → Verdict → Detail → Video → SEO) |
| Update project status | project edit → status select |
| Change featured items | featured toggle on any CPT (homepage/beacons react automatically) |
| Replace CV | Portfolio Settings → CV file field |
| Manage social links | Portfolio Settings → social repeater |
| Run sync / review errors | Portfolio → YouTube dashboard |

### Editor experience details

ACF tabs with plain-language labels + instruction lines under every field; conditional logic (e.g. YouTube ID only when source = YouTube); required marks (summary, cover, last-verified…); relationship selectors with search + thumbnails; preview thumbnails in galleries and video fields; status indicators (sync status pill on video list table, transcript status column, "missing guide" dot); validation messages on publish (e.g. "Chapters must be HH:MM:SS"). Admin list tables gain useful columns (video: duration/sync/guide-linked; guide: difficulty/verified date; review: score). Dashboard widget: sync summary + attention counts. Roles: owner = Administrator; any future contributor = Editor limited to content CPTs (no plugin/settings access).
