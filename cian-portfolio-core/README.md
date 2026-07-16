# Cian Portfolio Core

Site-specific WordPress plugin for the Digital District portfolio. It owns everything a page builder should not: post types, taxonomies, ACF registration, cross-content relationships, YouTube synchronization, transcripts, chapters, the REST API that feeds the 3D world, structured data, security, and privacy/consent — plus the builder-independent design tokens and all custom JS/CSS.

**Architecture contract:** Oxygen owns layout; this plugin owns data and logic. If the builder is ever replaced, only templates get rebuilt. See [`docs/plan/09`](../docs/plan/09-plugin-and-api-architecture.md).

## Status

**Phase 3 scaffold** (structure + contracts). Data model registers and activates; YouTube sync, transcript editing UI, and the Three.js scene are stubbed with documented contracts and land in Phases 4–7 (see [`docs/plan/13`](../docs/plan/13-roadmap-and-testing.md)).

## Requirements

- WordPress ≥ 6.5, PHP ≥ 8.1
- ACF Pro (fields, relationships, options page)

## Structure

```text
cian-portfolio-core/
├── cian-portfolio-core.php     # bootstrap + module registry + activation
├── includes/                   # one module per concern (post-types … privacy)
├── assets/css/                 # tokens, base, components, content, video, accessibility
├── assets/js/src/              # loader, world, menu, video-player, chapters, transcripts, …
├── assets/js/dist/             # Vite build output (world bundle) — generated
├── assets/models/              # compressed GLB + KTX2 (Git LFS)
├── acf-json/                   # version-controlled ACF field groups
└── cli/                        # wp cian youtube <subcommand>
```

## Configuration (never in the database or a builder)

Add to `wp-config.php`:

```php
define( 'CIAN_YT_API_KEY', '…' );            // required for read sync (public data)
// Optional (private metadata + deferred upload workflow):
define( 'CIAN_YT_OAUTH_CLIENT_ID', '…' );
define( 'CIAN_YT_OAUTH_CLIENT_SECRET', '…' );
define( 'CIAN_YT_TOKEN_KEY', '…' );          // base64 32-byte libsodium key
```

Feature flags (optional): `define( 'CIAN_DISABLE_WORLD', true );` disables the 3D layer; any module can be disabled with `CIAN_DISABLE_<MODULE>`.

## WP-CLI

```bash
wp cian youtube status
wp cian youtube sync --full
wp cian youtube sync --video=<id> --dry-run
```
