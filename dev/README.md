# Local dev environment

A throwaway WordPress install for developing and testing `cian-portfolio-core`, plus a WordPress-free smoke test.

## Requirements

- Docker + Docker Compose
- Ports: `8080` (WordPress)

## Quick start

```bash
# from the repo root
docker compose -f dev/docker-compose.yml up -d
./dev/setup.sh
```

`setup.sh` installs WordPress, activates the plugin, sets pretty permalinks, and prints a verification report (post types, taxonomies, seeded terms, custom tables, and the `cian/v1/world` REST response). Then:

- Site: <http://localhost:8080>
- Admin: <http://localhost:8080/wp-admin> — `admin` / `admin`

Tear down (keep data): `docker compose -f dev/docker-compose.yml stop`
Tear down (wipe data): `docker compose -f dev/docker-compose.yml down -v`

The plugin is bind-mounted, so PHP/CSS/JS edits are live (no rebuild needed).

## ACF Pro (paid — not bundled)

The plugin's **data model** (post types, taxonomies, relationships table, transcript table, REST) works without ACF. The **fields** need ACF Pro:

1. Download ACF Pro (your licensed copy) and unzip it.
2. Put the `advanced-custom-fields-pro/` folder in `dev/plugins/`.
3. Re-run `./dev/setup.sh` (it activates ACF Pro if present).

The field groups in `cian-portfolio-core/acf-json/` then load automatically.

## YouTube sync (optional)

Sync needs an API key. Export it before `up` and it's wired into `wp-config`:

```bash
export CIAN_YT_API_KEY=your_key   # then: docker compose ... up -d
```

Without a key, sync stays disabled (the site works normally on cached data).

## Smoke test (no Docker, no network)

```bash
php dev/smoke-test.php
```

Loads the plugin with minimal WordPress stubs, boots the module registry, fires `init` + `rest_api_init`, and asserts every post type / taxonomy / REST route registers — then unit-tests the VTT, chapter, timestamp, and ISO-8601 duration parsers. This is the CI-friendly check that runs anywhere PHP is installed.

## World bundle (Three.js scene)

The Digital District scene is built from `cian-portfolio-core/assets/js/src/world.js` (+ `world/` modules) with Vite:

```bash
cd cian-portfolio-core && npm install && npm run build   # → assets/js/dist/world.js (committed)
```

Manual runtime check: serve the repo root (`php -S 127.0.0.1:8095`) and open `/dev/world-test.html` — the procedural mini-city should render with 8 labeled hotspot buttons; clicking one glides the camera to that district, clicking it again navigates to its URL. `dev/world-test.json` is the mock REST payload.

## Restricted networks

If your environment blocks Docker Hub, the image pulls in `docker-compose.yml` will fail — point them at an allowed registry mirror, or use the smoke test, which needs no images.
