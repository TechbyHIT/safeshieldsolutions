#!/usr/bin/env bash
# One-shot: pull, build standalone, start PM2 on :3010, point nginx at it.
set -euo pipefail

ROOT="${1:-$HOME/safeshieldsolutions}"
cd "$ROOT"

stop_app() {
  if command -v pm2 >/dev/null 2>&1; then
    echo "==> Stop PM2 app safeshield-solutions only (never pgrep repo path — kills npm)"
    pm2 stop safeshield-solutions >/dev/null 2>&1 || true
    pm2 delete safeshield-solutions >/dev/null 2>&1 || true
    sleep 1
  fi
  if command -v fuser >/dev/null 2>&1; then
    fuser -k 3010/tcp >/dev/null 2>&1 || true
    sleep 1
  fi
}

remove_next() {
  echo "==> Remove old .next so standalone cannot mix Next versions"
  local i
  for i in 1 2 3; do
    if rm -rf .next; then
      return 0
    fi
    echo "WARN: rm .next failed (attempt $i) — retrying"
    sleep 1
  done
  echo "ERROR: could not remove .next. Run:"
  echo "  pm2 delete safeshield-solutions || true"
  echo "  rm -rf $ROOT/.next"
  exit 1
}

stop_app

echo "==> Pull latest from GitHub (origin/main)"
git fetch origin
git reset --hard origin/main
echo "Deploying $(git log -1 --oneline)"

remove_next

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example — edit NEXT_PUBLIC_SITE_URL if needed"
fi

echo "==> Build from existing node_modules (npm is SIGKILL'd on this VPS)"
export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS="--max-old-space-size=3072"

run_tsx() {
  if [ -f node_modules/tsx/dist/cli.mjs ]; then
    node node_modules/tsx/dist/cli.mjs "$@"
  elif [ -x node_modules/.bin/tsx ]; then
    node_modules/.bin/tsx "$@"
  else
    echo "ERROR: tsx missing under node_modules/"
    exit 1
  fi
}

run_next() {
  if [ -f node_modules/next/dist/bin/next ]; then
    node node_modules/next/dist/bin/next "$@"
  elif [ -x node_modules/.bin/next ]; then
    node_modules/.bin/next "$@"
  else
    echo "ERROR: next missing under node_modules/"
    ls -la node_modules/next/dist/bin 2>/dev/null || true
    exit 1
  fi
}

echo "==> catalog:build"
run_tsx scripts/build-catalog.mjs
echo "==> sitemap:build"
run_tsx scripts/generate-sitemap.mjs
if ! grep -q '<sitemapindex' public/sitemap.xml; then
  echo "ERROR: public/sitemap.xml is not a sitemap index"
  exit 1
fi
echo "==> next build"
run_next build
echo "==> prepare-standalone"
node scripts/prepare-standalone.mjs
echo "==> deploy:prune"
node scripts/prune-production.mjs

if [ ! -f .next/standalone/server.js ] && [ ! -f .next/standalone/safeshieldsolutions/server.js ]; then
  echo "ERROR: standalone server.js missing — build failed"
  exit 1
fi

echo "==> PM2 on port 3010"
if command -v pm2 >/dev/null 2>&1; then
  pm2 start deploy/ecosystem.config.cjs
  pm2 save
else
  echo "PM2 not found. Install: npm i -g pm2"
  exit 1
fi

echo "==> Nginx → 127.0.0.1:3010"
if command -v nginx >/dev/null 2>&1; then
  bash "$ROOT/deploy/install-nginx.sh" "$ROOT"
  systemctl start nginx 2>/dev/null || true
  systemctl reload nginx 2>/dev/null || true
fi

echo "==> Health check"
sleep 2
curl -sI http://127.0.0.1:3010/ | head -n 5 || true
echo
curl -sI http://127.0.0.1:3010/sitemap.xml | head -n 8 || true
if [ -f "$ROOT/public/sitemap.xml" ] && grep -q '<sitemapindex' "$ROOT/public/sitemap.xml"; then
  echo "==> Sitemap index OK in public/"
else
  echo "WARN: public/sitemap.xml is not a sitemap index — check sitemap:build"
fi
echo
echo "Done. Open https://safeshieldsolutions.in"
echo "Sitemap must be HTTP 200:"
echo "  curl -sI https://safeshieldsolutions.in/sitemap.xml | head"
echo "Then resubmit https://safeshieldsolutions.in/sitemap.xml in Search Console."
