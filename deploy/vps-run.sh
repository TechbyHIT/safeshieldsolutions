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

echo "==> Build from existing node_modules (do not run npm — SIGKILL on this VPS)"
export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS="--max-old-space-size=3072"

extract_tgz() {
  local url="$1" dest="$2"
  local tgz="/tmp/safeshield-$(basename "$dest").tgz"
  echo "==> wget $url"
  wget -q -T 120 -O "$tgz" "$url"
  [ -s "$tgz" ] || { echo "ERROR: empty download $url"; exit 1; }
  rm -rf "$dest"
  mkdir -p "$dest"
  tar -xzf "$tgz" -C "$dest" --strip-components=1
  rm -f "$tgz"
}

ensure_tsx() {
  if [ -f node_modules/tsx/dist/cli.mjs ] && [ -f node_modules/@esbuild/linux-x64/bin/esbuild ]; then
    echo "==> tsx already present"
    return 0
  fi
  echo "==> Fetch tsx + esbuild linux-x64 (wget, not npm)"
  extract_tgz https://registry.npmjs.org/tsx/-/tsx-4.23.1.tgz node_modules/tsx
  extract_tgz https://registry.npmjs.org/esbuild/-/esbuild-0.28.1.tgz node_modules/esbuild
  extract_tgz https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.28.1.tgz node_modules/@esbuild/linux-x64
  extract_tgz https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.14.0.tgz node_modules/get-tsconfig
  extract_tgz https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz node_modules/resolve-pkg-maps
  chmod +x node_modules/@esbuild/linux-x64/bin/esbuild 2>/dev/null || true
}

ensure_next() {
  if [ -f node_modules/next/dist/bin/next ]; then
    echo "==> next already present"
    return 0
  fi
  echo "==> Fetch Next.js linux runtime (wget, not npm)"
  extract_tgz https://registry.npmjs.org/next/-/next-15.5.22.tgz node_modules/next
  extract_tgz https://registry.npmjs.org/@next/env/-/env-15.5.22.tgz node_modules/@next/env
  extract_tgz https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-15.5.22.tgz node_modules/@next/swc-linux-x64-gnu
  extract_tgz https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.15.tgz node_modules/@swc/helpers
  extract_tgz https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.6.tgz node_modules/styled-jsx
  extract_tgz https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz node_modules/client-only
  extract_tgz https://registry.npmjs.org/react/-/react-19.2.8.tgz node_modules/react
  extract_tgz https://registry.npmjs.org/react-dom/-/react-dom-19.2.8.tgz node_modules/react-dom
  extract_tgz https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz node_modules/scheduler
  extract_tgz https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz node_modules/tslib
  extract_tgz https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001806.tgz node_modules/caniuse-lite
}

ensure_tsx
ensure_next

run_tsx() {
  node node_modules/tsx/dist/cli.mjs "$@"
}

run_next() {
  node node_modules/next/dist/bin/next "$@"
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
