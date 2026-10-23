#!/usr/bin/env bash
# Rebuild standalone on the VPS without npm (npm is SIGKILL'd here).
# Reuses next/tsx from this tree or a sibling site, then PM2 + nginx.
# Sitemaps stay on nginx disk and are not taken down.
set -euo pipefail

ROOT="${1:-/root/safeshieldsolutions}"
cd "$ROOT"

if [ -z "${INVOCATION_ID:-}" ] && command -v systemd-run >/dev/null 2>&1; then
  echo "==> Starting rebuild under systemd (safe to close SSH)"
  systemctl stop safeshield-rebuild.service 2>/dev/null || true
  systemctl reset-failed safeshield-rebuild.service 2>/dev/null || true
  systemd-run --unit=safeshield-rebuild --collect \
    --working-directory="$ROOT" \
    --property=TimeoutStartSec=0 \
    --property=OOMScoreAdjust=-1000 \
    --property=MemoryMax=infinity \
    /bin/bash "$ROOT/deploy/vps-rebuild.sh" "$ROOT"
  sleep 3
  systemctl is-active safeshield-rebuild.service || true
  echo "Log: journalctl -u safeshield-rebuild -f"
  echo "     also /var/log/safeshield-rebuild.log"
  exit 0
fi

exec >> /var/log/safeshield-rebuild.log 2>&1
echo "=== REBUILD START $(date) ==="
echo "HEAD $(git log -1 --oneline)"

export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS="--max-old-space-size=3072"
sysctl -w vm.overcommit_memory=1 >/dev/null 2>&1 || true
systemctl stop systemd-oomd.service systemd-oomd.socket 2>/dev/null || true

find_modules() {
  local needle="$1"
  local d
  for d in \
    "$ROOT/node_modules" \
    /root/deva-safety-nets/node_modules \
    /root/ap-all-areas/node_modules \
    /var/www/hiranaya-enterprises/node_modules \
    /var/www/hiranya-enterprises/node_modules \
    /var/www/securevista/node_modules \
    /var/www/sai-durga/node_modules \
    /var/www/glory-invisible-grills/node_modules
  do
    if [ -e "$d/$needle" ]; then
      echo "$d"
      return 0
    fi
  done
  return 1
}

borrow() {
  local rel="$1"
  if [ -e "$ROOT/node_modules/$rel" ]; then
    return 0
  fi
  local src
  src="$(find_modules "$rel" || true)"
  if [ -z "$src" ]; then
    echo "WARN: cannot borrow $rel"
    return 1
  fi
  mkdir -p "$(dirname "$ROOT/node_modules/$rel")"
  echo "==> Borrow $rel from $src"
  cp -a "$src/$rel" "$ROOT/node_modules/$rel"
}

mkdir -p "$ROOT/node_modules"
borrow "next" || true
borrow "tsx" || true
borrow "esbuild" || true
borrow "@esbuild/linux-x64" || true
borrow "get-tsconfig" || true
borrow "resolve-pkg-maps" || true
borrow "react" || true
borrow "react-dom" || true
borrow "scheduler" || true
borrow "zod" || true
borrow "@next" || true
borrow "@swc/helpers" || true
borrow "styled-jsx" || true
borrow "client-only" || true
borrow "caniuse-lite" || true
borrow "tslib" || true

if [ ! -f node_modules/next/dist/bin/next ]; then
  echo "ERROR: next binary still missing after borrow"
  ls -la node_modules/next/dist/bin 2>/dev/null || true
  exit 1
fi

if [ -f node_modules/tsx/dist/cli.mjs ]; then
  echo "==> catalog:build"
  node node_modules/tsx/dist/cli.mjs scripts/build-catalog.mjs
  echo "==> sitemap:build"
  node node_modules/tsx/dist/cli.mjs scripts/generate-sitemap.mjs || echo "WARN: sitemap:build skipped (committed XML remains)"
else
  echo "WARN: tsx missing — using committed public/sitemap.xml"
fi

if [ ! -f public/sitemap.xml ] || ! grep -q '<sitemapindex' public/sitemap.xml; then
  echo "ERROR: sitemap index missing"
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
curl -sI --max-time 10 http://127.0.0.1:3010/ | head -n 5 || true
curl -s --max-time 10 https://safeshieldsolutions.in/sitemap.xml | head -n 5 || true
echo "=== REBUILD DONE $(date) ==="
