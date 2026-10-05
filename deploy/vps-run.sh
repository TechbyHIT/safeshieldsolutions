#!/usr/bin/env bash
# One-shot: pull, build standalone, start PM2 on :3010, point nginx at it.
set -euo pipefail

ROOT="${1:-$HOME/safeshieldsolutions}"
cd "$ROOT"

stop_app() {
  if command -v pm2 >/dev/null 2>&1; then
    echo "==> Stop PM2 so .next is not locked"
    pm2 stop safeshield-solutions >/dev/null 2>&1 || true
    pm2 delete safeshield-solutions >/dev/null 2>&1 || true
    sleep 1
  fi
  if command -v fuser >/dev/null 2>&1 && [ -d .next ]; then
    fuser -km .next >/dev/null 2>&1 || true
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

echo "==> Install + build + prune"
npm run deploy:prod

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

echo "==> Nginx HTTP → 127.0.0.1:3010"
if command -v nginx >/dev/null 2>&1; then
  bash "$ROOT/deploy/install-nginx.sh" "$ROOT"
fi

echo "==> Health check"
sleep 2
curl -sI http://127.0.0.1:3010/ | head -n 5 || true
echo
curl -sI http://127.0.0.1:3010/sitemap.xml | head -n 8 || true
echo
echo "Done. Open https://safeshieldsolutions.in"
echo "Sitemap must be HTTP 200:"
echo "  curl -sI https://safeshieldsolutions.in/sitemap.xml | head"
echo "Then resubmit https://safeshieldsolutions.in/sitemap.xml in Search Console."
