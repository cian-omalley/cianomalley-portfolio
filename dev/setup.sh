#!/usr/bin/env bash
# Install WordPress, activate cian-portfolio-core, and verify the data model.
# Idempotent: safe to re-run. Requires the stack to be up:
#   docker compose -f dev/docker-compose.yml up -d
set -euo pipefail

CF="dev/docker-compose.yml"
SITE_URL="${SITE_URL:-http://localhost:8080}"
ADMIN_USER="${ADMIN_USER:-admin}"
ADMIN_PASS="${ADMIN_PASS:-admin}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@example.com}"

wp() { docker compose -f "$CF" run --rm -T wpcli "$@"; }

echo "==> Waiting for WordPress files to be provisioned..."
for i in $(seq 1 30); do
  if wp core version >/dev/null 2>&1; then break; fi
  sleep 2
done

echo "==> Installing WordPress (if needed)..."
if ! wp core is-installed >/dev/null 2>&1; then
  wp core install \
    --url="$SITE_URL" \
    --title="Digital District (dev)" \
    --admin_user="$ADMIN_USER" \
    --admin_password="$ADMIN_PASS" \
    --admin_email="$ADMIN_EMAIL" \
    --skip-email
fi

echo "==> Pretty permalinks..."
wp rewrite structure '/%postname%/' --hard >/dev/null
wp option update blog_public 0 >/dev/null   # dev: discourage indexing

echo "==> Activating cian-portfolio-core..."
wp plugin activate cian-portfolio-core

# Optional: activate a locally-dropped ACF Pro if present.
if wp plugin is-installed advanced-custom-fields-pro >/dev/null 2>&1; then
  wp plugin activate advanced-custom-fields-pro || true
fi

echo "==> Flushing rewrite rules..."
wp rewrite flush --hard >/dev/null

echo
echo "================  VERIFICATION  ================"

echo "-- Post types (expect: project, guide, article, review, video, tutorial_series, timeline_entry)"
wp post-type list --field=name | grep -E 'project|guide|article|review|video|tutorial_series|timeline_entry' || true

echo
echo "-- Taxonomies (expect: project_category, guide_category, difficulty, technology, playlist, ...)"
wp taxonomy list --field=name | grep -E 'project_category|project_status|guide_category|difficulty|operating_system|video_category|review_category|article_category|technology|skill|playlist' || true

echo
echo "-- Seeded terms (sample: difficulty)"
wp term list difficulty --field=name || true

echo
echo "-- Custom tables (expect wp_cian_relationships, wp_cian_transcript_segments)"
wp db query "SHOW TABLES LIKE '%cian%';" --skip-column-names || true

echo
echo "-- REST world endpoint (expect JSON with districts[])"
curl -s "$SITE_URL/wp-json/cian/v1/world" | head -c 400 || true
echo

echo
echo "================  DONE  ========================"
echo "Admin:  $SITE_URL/wp-admin  ($ADMIN_USER / $ADMIN_PASS)"
echo "For ACF fields: drop the ACF Pro plugin folder into dev/plugins/ and re-run."
