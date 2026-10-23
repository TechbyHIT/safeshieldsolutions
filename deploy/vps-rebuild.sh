#!/usr/bin/env bash
# Rebuild SafeShield standalone without npm.
# Copies a complete node_modules from a sibling Next.js site, then next build + PM2.
# Sitemaps stay on nginx. Do not run npm on this VPS.
set -euo pipefail

ROOT="${1:-/root/safeshieldsolutions}"
cd "$ROOT"

if [ -z "${INVOCATION_ID:-}" ] && command -v systemd-run >/dev/null 2>&1; then
  echo "==> Starting rebuild under systemd (safe to close SSH)"
  mkdir -p /var/log
  : > /var/log/safeshield-rebuild.log
  systemctl stop safeshield-rebuild.service 2>/dev/null || true
  systemctl reset-failed safeshield-rebuild.service 2>/dev/null || true
  systemd-run --unit=safeshield-rebuild --collect \
    --working-directory="$ROOT" \
    --property=Type=exec \
    --property=TimeoutStartSec=0 \
    --property=OOMScoreAdjust=-1000 \
    --property=MemoryMax=infinity \
    /bin/bash "$ROOT/deploy/vps-rebuild.sh" "$ROOT"
  sleep 6
  echo "Active: $(systemctl is-active safeshield-rebuild.service 2>/dev/null || true)"
  tail -n 20 /var/log/safeshield-rebuild.log || true
  echo "Watch: tail -f /var/log/safeshield-rebuild.log"
  exit 0
fi

exec >> /var/log/safeshield-rebuild.log 2>&1
echo "=== REBUILD START $(date) ==="
echo "HEAD $(git log -1 --oneline)"

export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS="--max-old-space-size=3072"
sysctl -w vm.overcommit_memory=1 >/dev/null 2>&1 || true
systemctl stop systemd-oomd.service systemd-oomd.socket 2>/dev/null || true

is_complete_modules() {
  local d="$1"
  [ -f "$d/next/dist/bin/next" ] || return 1
  [ -f "$d/styled-jsx/package.json" ] || return 1
  [ -f "$d/react/package.json" ] || return 1
  [ -f "$d/react-dom/package.json" ] || return 1
  return 0
}

SIBLING=""
for d in \
  /root/deva-safety-nets/node_modules \
  /root/ap-all-areas/node_modules \
  /var/www/securevista/node_modules \
  /var/www/sai-durga/node_modules \
  /var/www/glory-invisible-grills/node_modules \
  /var/www/hiranaya-enterprises/node_modules \
  /var/www/hiranya-enterprises/node_modules
do
  if is_complete_modules "$d"; then
    SIBLING="$d"
    break
  fi
done

if [ -z "$SIBLING" ]; then
  echo "ERROR: no sibling site has a complete Next.js node_modules (next + styled-jsx + react)"
  for d in /root/*/node_modules /var/www/*/node_modules; do
    echo "  $d next=$( [ -f "$d/next/dist/bin/next" ] && echo yes || echo no ) styled-jsx=$( [ -f "$d/styled-jsx/package.json" ] && echo yes || echo no )"
  done
  exit 1
fi

echo "==> Complete modules: $SIBLING"
if ! is_complete_modules "$ROOT/node_modules"; then
  echo "==> Replacing broken $ROOT/node_modules (copy, not npm)"
  rm -rf "$ROOT/node_modules"
  cp -a "$SIBLING" "$ROOT/node_modules"
  echo "==> Copy done"
else
  echo "==> Local node_modules already has next + styled-jsx + react"
fi

node -e "require('styled-jsx/package.json'); require('next/package.json'); console.log('next', require('next/package.json').version)"

if [ -f node_modules/tsx/dist/cli.mjs ]; then
  echo "==> catalog:build"
  node node_modules/tsx/dist/cli.mjs scripts/build-catalog.mjs || echo "WARN: catalog skipped"
else
  echo "WARN: tsx missing — using committed sitemap XML"
fi

if [ ! -f public/sitemap.xml ] || ! grep -q '<sitemapindex' public/sitemap.xml; then
  echo "ERROR: sitemap index missing from public/"
  exit 1
fi

if command -v pm2 >/dev/null 2>&1; then
  pm2 stop safeshield-solutions >/dev/null 2>&1 || true
  pm2 delete safeshield-solutions >/dev/null 2>&1 || true
fi

echo "==> next build"
node node_modules/next/dist/bin/next build
echo "==> prepare-standalone"
node scripts/prepare-standalone.mjs

if [ ! -f .next/standalone/server.js ] && [ ! -f .next/standalone/safeshieldsolutions/server.js ]; then
  echo "ERROR: standalone server.js missing"
  exit 1
fi

if command -v pm2 >/dev/null 2>&1; then
  echo "==> PM2 start"
  pm2 start deploy/ecosystem.config.cjs
  pm2 save
fi

bash "$ROOT/deploy/install-nginx.sh" "$ROOT"
systemctl start nginx 2>/dev/null || true
systemctl reload nginx 2>/dev/null || true

echo "==> Health"
curl -sI --max-time 10 http://127.0.0.1:3010/ | head -n 8 || true
curl -sI --max-time 10 https://safeshieldsolutions.in/ | head -n 8 || true
echo "=== REBUILD DONE $(date) ==="
