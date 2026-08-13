#!/usr/bin/env bash
# One-shot: pull, build standalone, start PM2 on :3010, point nginx at it.
set -euo pipefail

ROOT="${1:-$HOME/safeshieldsolutions}"
cd "$ROOT"

echo "==> Pull latest"
git pull origin main

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example — edit NEXT_PUBLIC_SITE_URL if needed"
fi

echo "==> Install + build + prune"
npm run deploy:prod

if [ ! -f .next/standalone/server.js ]; then
  echo "ERROR: .next/standalone/server.js missing — build failed"
  exit 1
fi

echo "==> PM2 on port 3010"
if command -v pm2 >/dev/null 2>&1; then
  pm2 delete safeshield-solutions >/dev/null 2>&1 || true
  pm2 start deploy/ecosystem.config.cjs
  pm2 save
else
  echo "PM2 not found. Install: npm i -g pm2"
  exit 1
fi

echo "==> Nginx HTTP → 127.0.0.1:3010"
if command -v nginx >/dev/null 2>&1; then
  ln -sfn "$ROOT/deploy/nginx-safeshield-http.conf" /etc/nginx/sites-enabled/safeshield
  rm -f /etc/nginx/sites-enabled/default
  nginx -t
  systemctl reload nginx
fi

echo "==> Health check"
sleep 2
curl -sI http://127.0.0.1:3010/ | head -n 5 || true
echo
echo "Done. Open http://safeshieldsolutions.in"
