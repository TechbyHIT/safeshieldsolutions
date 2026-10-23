#!/usr/bin/env bash
# Publish from GitHub: copy committed sitemaps to nginx, start PM2 if standalone exists.
# Does not run npm, wget, or next build — those are SIGKILL'd on this VPS.
set -euo pipefail

ROOT="${1:-$HOME/safeshieldsolutions}"
cd "$ROOT"

echo "==> Pull latest from GitHub (origin/main)"
git fetch origin
git reset --hard origin/main
echo "Deploying $(git log -1 --oneline)"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

if [ ! -f public/sitemap.xml ] || ! grep -q '<sitemapindex' public/sitemap.xml; then
  echo "ERROR: public/sitemap.xml is missing from git (must be a sitemap index)"
  exit 1
fi

echo "==> Publish sitemaps + nginx (no Node required)"
if command -v pm2 >/dev/null 2>&1; then
  echo "==> Restart PM2 only if a standalone server already exists"
  pm2 stop safeshield-solutions >/dev/null 2>&1 || true
  pm2 delete safeshield-solutions >/dev/null 2>&1 || true
fi

if command -v nginx >/dev/null 2>&1; then
  bash "$ROOT/deploy/install-nginx.sh" "$ROOT"
  systemctl start nginx 2>/dev/null || true
  systemctl reload nginx 2>/dev/null || true
fi

standalone=""
if [ -f .next/standalone/server.js ]; then
  standalone=".next/standalone"
elif [ -f .next/standalone/safeshieldsolutions/server.js ]; then
  standalone=".next/standalone/safeshieldsolutions"
fi

if [ -n "$standalone" ] && command -v pm2 >/dev/null 2>&1; then
  echo "==> PM2 start from $standalone"
  pm2 start deploy/ecosystem.config.cjs
  pm2 save
else
  echo "WARN: .next/standalone is missing — HTML pages stay down until a standalone build exists."
  echo "      Sitemaps are still served from /var/www/safeshield-sitemaps by nginx."
fi

echo "==> Health check"
sleep 1
curl -sI --max-time 10 https://safeshieldsolutions.in/sitemap.xml | head -n 8 || true
echo
curl -s --max-time 10 https://safeshieldsolutions.in/sitemap.xml | head -n 8 || true
echo
echo "Done. Open https://safeshieldsolutions.in/sitemap.xml"
echo "Google Search Console: resubmit https://safeshieldsolutions.in/sitemap.xml"
