# Part 12 — Security & Maintenance Plan, Hosting Plan

> Covers required output sections: **35. Security and maintenance plan**, **36. Hosting plan**
> Plan index: [README.md](README.md)

---

## Section 35 — Security and Maintenance Plan

### Update policy

| Component | Cadence | Method |
|---|---|---|
| WordPress core | minor: auto; major: staging-first within 2 weeks | staging → smoke test → promote |
| Oxygen 6 | staging-first always (builder updates are the riskiest) | test all templates + export designs before updating |
| Breakdance Elements for Oxygen | staging-first, after Oxygen confirms stable | element render check |
| ACF Pro, SEO, forms, cache, search plugins | weekly window, staging-first for majors | changelog review |
| `cian-portfolio-core` | git-tagged releases; deploy via CI/rsync | PHPUnit + manual smoke |
| PHP/MariaDB/OS | monthly patching (unattended-upgrades for security) | VPS maintenance window |
| YouTube API | watch deprecation announcements quarterly; client isolates API surface in `youtube-api.php` so changes localize | |

### Security controls

- **Access:** SSH keys only; WP admin behind 2FA (plugin: Two-Factor); strong unique passwords; login rate limiting; XML-RPC disabled; user enumeration blocked; admin over HTTPS only.
- **Roles:** least privilege (Part 11 §34); application passwords disabled unless needed.
- **Input/output:** all plugin inputs sanitized (`security.php` helpers), all output escaped at render; nonces + capability checks on every admin/REST write; prepared statements for custom tables.
- **Uploads:** MIME/extension allowlist; video uploads capped (large files go via SFTP by policy); VTT/SRT parsed defensively (no HTML passthrough); uploaded files served with correct `Content-Type` + `X-Content-Type-Options: nosniff`; PHP execution disabled in `/uploads` (Nginx rule).
- **Forms:** honeypot + time-trap (+ Turnstile if spam persists — cookieless, GDPR-friendlier than reCAPTCHA); submission flood rate-limit.
- **Secrets:** per Part 11 §33 (config-file constants, encrypted OAuth tokens, documented revocation/rotation).
- **Headers:** CSP (script-src self + youtube-nocookie frame-src; report-only first), HSTS, referrer-policy, frame-ancestors self.
- **Monitoring:** uptime check (external), cron health check (dashboard warns if `cian_youtube_sync` stale >24 h), broken-link scan monthly (CLI-based, includes YouTube IDs — deleted videos flagged by sync anyway), fail2ban on VPS, WP file-change scan (via security plugin or host tooling).

### Backups & recovery

Nightly: DB + uploads + plugin dir + design exports → offsite (Hetzner Storage Box or S3-compatible, encrypted, 30-day rotation) with weekly monthly-retained snapshots. **Quarterly restore test** to a scratch VM is a calendar task — a backup is only real when restored. Transcripts live in the DB (covered) + VTT source files in uploads (covered) — satisfying the transcript-backup requirement. Database cleanup quarterly: revisions cap (keep 15), transient/orphan-meta sweep, sync-log pruning (keep 90 days).

### Plugin recommendations (each with purpose / necessity / perf impact / alternative / removal strategy)

| Plugin | Purpose | Necessity | Perf impact | Alternative | Removal strategy |
|---|---|---|---|---|---|
| ACF Pro | fields/relationships | **Essential** | low (fields render server-side) | Meta Box | fields registered from JSON; a migration script could map to Meta Box; content stored as plain postmeta survives |
| Oxygen 6 | templates | **Essential** (architecture) | low (static CSS output) | Breakdance (Arch. B) | design exports + plugin-held logic make rebuild bounded |
| Breakdance Elements for Oxygen | UI elements | Recommended | low | native Oxygen builds | each element replaceable individually; audit doc tracks usage |
| SearchWP | search + transcript index | Recommended | med (index tables) | Relevanssi | search falls back to native; REST bridge isolates the engine |
| Fluent Forms | contact forms | **Essential** (some form solution) | low | WS Form; Breakdance Forms (Arch. B) | single form; rebuild in an hour; export entries first |
| SEO Framework / Rank Math | SEO basics | **Essential** (one of them) | low | the other | ACF SEO fields are plugin-owned, so switching SEO plugins is a filter re-wire |
| Two-Factor | 2FA | **Essential** | none | Wordfence login features | disable, re-enable alternative |
| Redis Object Cache | object caching | Recommended (VPS) | positive | none needed | drop-in removal |
| Cache plugin (WP Super Cache/W3TC/FlyingPress — pick one at Phase 10 vs server-level cache) | page cache | Recommended | positive | Nginx FastCGI cache (preferred if ops comfort allows — then no plugin) | swap freely; purge hooks in plugin abstracted |
| Complianz (only if consent scope grows) | CMP | Optional | low | custom contextual consent in `privacy.php` (default) | facades already self-contained |
| Action Scheduler (library) | reliable background jobs for sync | Recommended | low | WP-Cron single events | bundled as library, not user-facing |
| WP Migrate (or WP-CLI workflows) | staging promote | Recommended (tooling) | none (dev tool) | manual CLI | dev-only |

Anti-bloat rule: any new plugin needs a written entry in this table (in `docs/decisions/`) before install.

---

## Section 36 — Hosting Plan

### Evaluation

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| Managed WP (Kinsta/WP Engine class) | ops offloaded, staging built-in | cost, PHP/queue limits (hurts sync + any Workflow B future), less control, often US-centric | viable fallback |
| **VPS (Hetzner, Germany)** | EU data locality, full control (real cron, Redis, WP-CLI, Nginx rules, Action Scheduler headroom), cheap (~€10–20/mo CX/CPX class), fits owner's self-hosting expertise & portfolio story | you are the ops team | **Recommended** |
| Self-hosted home server | on-brand | residential uptime/attack surface for a professional portfolio | rejected for production (fine for staging experiments) |
| Cloudflare in front | CDN, WAF, DNS, TLS, cache | — | **Yes, adopt** (with EU-appropriate DPA noted in privacy policy) |

### Recommended stack

Hetzner CPX VPS (Nuremberg/Falkenstein): **Nginx** + **PHP-FPM 8.3** + **MariaDB 10.11** + **Redis**; real cron (`*/5` hitting `wp-cron.php`; `DISABLE_WP_CRON` true); Nginx FastCGI page cache (preferred over a cache plugin) with purge hooks; server-side image optimization (WebP/AVIF via Imagick); fail2ban + ufw; staging as `staging.cianomalley.dev` on the same box (separate pools/DB, basic-auth + noindex).

### Domains & DNS

Both `cianomalley.dev` and `cianomalley.works` registered at **Names.com**, nameservers → **Cloudflare DNS**. `.dev` is on the HSTS preload list — HTTPS is mandatory from day one (Cloudflare Full-Strict + Let's Encrypt on origin). `cianomalley.works` serves the document/CV surface (either a lightweight static docs site or a reverse-proxied `/documents/` path on the same origin; canonical links point at `.works` URLs for documents to keep the portfolio's canonical content on `.dev`). SSL for both via Cloudflare + origin certs.

### Video storage policy (restating the rule)

**YouTube hosts all public tutorial videos.** WordPress/local storage only for: short demos (≤ ~100 MB, range-request streaming, poster + `preload="none"`), private videos, downloadable source files, videos where YouTube is inappropriate, and heavily optimized background clips. Multi-GB masters never enter WP uploads (SFTP to a non-web path or object storage if ever needed). PHP upload limits stay modest (128 MB) on purpose — the cap is a policy enforcement tool.

### Capacity & access notes

YouTube API calls originate from the VPS (egress fine, no inbound needed except the optional WebSub callback over HTTPS); backups to Hetzner Storage Box (same DC region, offsite from the VM); disk sized 80 GB+ (uploads dominated by images/thumbnails, not video, per policy).
