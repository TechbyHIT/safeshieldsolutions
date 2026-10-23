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

echo "==> npm install + build + prune"
# npm ci + rm -rf node_modules is SIGKILL'd on this VPS (kernel overcommit).
# npm install reuses existing modules and does not trigger that kill.
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=2048}"
export NEXT_TELEMETRY_DISABLED=1
export npm_config_fund=false
export npm_config_audit=false
echo "==> npm install --no-audit --no-fund"
if ! npm install --no-audit --no-fund --no-progress; then
  echo "ERROR: npm install failed"
  exit 1
fi
test -x node_modules/.bin/next && test -x node_modules/.bin/tsx
echo "==> npm run build"
export NODE_OPTIONS="--max-old-space-size=4096"
if ! npm run build; then
  echo "ERROR: next build failed"
  exit 1
fi
echo "==> npm run deploy:prune"
npm run deploy:prune

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
