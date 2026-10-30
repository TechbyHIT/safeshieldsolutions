#!/usr/bin/env bash
# Install a prebuilt Next.js standalone bundle on the VPS.
# No npm. No next build. Use when npm is SIGKILL'd on this host.
#
# Usage:
#   # 1) Upload safeshield-standalone.tar.gz to /root/ first (SCP / File Manager)
#   # 2) Then:
#   bash deploy/vps-install-standalone.sh /root/safeshieldsolutions /root/safeshield-standalone.tar.gz
set -euo pipefail

ROOT="${1:-/root/safeshieldsolutions}"
TAR="${2:-/root/safeshield-standalone.tar.gz}"

cd "$ROOT"

if [ ! -f "$TAR" ]; then
  echo "ERROR: missing bundle: $TAR"
  echo "Upload safeshield-standalone.tar.gz to the VPS first, then re-run."
  exit 1
fi

echo "==> Install from $TAR into $ROOT"
echo "HEAD $(git log -1 --oneline 2>/dev/null || echo unknown)"

if command -v pm2 >/dev/null 2>&1; then
  pm2 stop safeshield-solutions >/dev/null 2>&1 || true
  pm2 delete safeshield-solutions >/dev/null 2>&1 || true
fi

mkdir -p "$ROOT/.next"
rm -rf "$ROOT/.next/standalone"
echo "==> Extract standalone"
tar -xzf "$TAR" -C "$ROOT/.next"

if [ ! -f "$ROOT/.next/standalone/server.js" ] && [ ! -f "$ROOT/.next/standalone/safeshieldsolutions/server.js" ]; then
  echo "ERROR: server.js missing after extract"
  ls -la "$ROOT/.next" || true
  ls -la "$ROOT/.next/standalone" || true
  exit 1
fi

# Keep nginx sitemap files in sync with the bundle / repo public/
if [ -d "$ROOT/.next/standalone/public" ]; then
  mkdir -p /var/www/safeshield-sitemaps
  cp -a "$ROOT/.next/standalone/public"/sitemap*.xml /var/www/safeshield-sitemaps/ 2>/dev/null || true
  [ -f "$ROOT/.next/standalone/public/favicon.png" ] && cp -a "$ROOT/.next/standalone/public/favicon.png" /var/www/safeshield-sitemaps/
fi
if [ -d "$ROOT/public" ]; then
  cp -a "$ROOT/public"/sitemap*.xml /var/www/safeshield-sitemaps/ 2>/dev/null || true
fi

if [ ! -f "$ROOT/.env" ] && [ -f "$ROOT/.env.example" ]; then
  cp "$ROOT/.env.example" "$ROOT/.env"
fi

echo "==> PM2 start"
pm2 start "$ROOT/deploy/ecosystem.config.cjs"
pm2 save

if [ -f "$ROOT/deploy/install-nginx.sh" ]; then
  bash "$ROOT/deploy/install-nginx.sh" "$ROOT"
  systemctl start nginx 2>/dev/null || true
  systemctl reload nginx 2>/dev/null || true
fi

echo "==> Health"
sleep 2
curl -sI --max-time 10 http://127.0.0.1:3010/ | head -n 8 || true
curl -sI --max-time 10 https://safeshieldsolutions.in/ | head -n 8 || true
curl -s --max-time 10 https://safeshieldsolutions.in/sitemap.xml | head -n 6 || true
echo
echo "Done. Site should be up on https://safeshieldsolutions.in"
