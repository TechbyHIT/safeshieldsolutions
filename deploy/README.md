# PM2 + standalone Node (no Docker)

Deploy **SafeShield Solutions** on Ubuntu 24.04 + PM2 + nginx. After prune, expect **~80–150 MB** runtime per site (not Docker’s ~1 GB image).

## Requirements

- Node.js **≥ 18.18**
- [PM2](https://pm2.keymetrics.io/) (`npm i -g pm2`)
- nginx (TLS termination)

## One-time server setup

```bash
cd /var/www/safeshield   # your git clone
cp .env.example .env      # set NEXT_PUBLIC_SITE_URL=https://safeshieldsolutions.in
npm ci
```

## Build (minimal static HTML at build time)

Programmatic routes use **`dynamicParams: true`** + ISR (`revalidate: 86400`). At build time almost nothing is pre-rendered; pages generate on first request.

```bash
# Default: no programmatic pages pre-rendered (ISR on first request)
export NEXT_BUILD_STATIC_SERVICES=0
export NEXT_BUILD_STATIC_CITY_SAMPLES=0

npm run deploy:prod    # npm ci + build + standalone + prune
```

`prepare-standalone` copies runtime `public/` + `.next/static` into `.next/standalone/` and strips `.map` files. `deploy:prune` then removes `node_modules` and leftover `.next/*` except `standalone/`.

To rebuild later: `npm run deploy:prod && pm2 reload deploy/ecosystem.config.cjs`.

## Run with PM2

From project root (ecosystem `cwd` points at `.next/standalone`):

```bash
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup   # follow printed command for boot persistence
```

Default port: **3010**. App listens on `0.0.0.0`.

```bash
pm2 logs safeshield-solutions
pm2 restart safeshield-solutions
```

## Multiple sites on one VPS

Duplicate an entry in `deploy/ecosystem.config.cjs`:

| Site | `cwd` | `PORT` |
|------|--------|--------|
| safeshieldsolutions.in | `/var/www/safeshield/.next/standalone` | 3010 |
| other-domain.in | `/var/www/other/.next/standalone` | 3001 |

Point each nginx `server` block at the matching `127.0.0.1:PORT`.

## nginx

Copy the vhost into **sites-available** (do not symlink a missing `/var/www/safeshield` path):

```bash
# from the real clone, e.g. /root/safeshieldsolutions
bash deploy/install-nginx.sh
```

If **safeshieldsolutions.in opens Deva Safety Nets** or curl says the SSL name does not match, there is no Let's Encrypt cert for this domain yet, so SNI falls through to another site. After the HTTP vhost is live:

```bash
mkdir -p /var/www/certbot
certbot certonly --webroot -w /var/www/certbot \
  -d safeshieldsolutions.in -d www.safeshieldsolutions.in
bash deploy/install-nginx.sh
curl -sIk https://safeshieldsolutions.in | grep -i x-site-brand
# must include: X-Site-Brand: SafeShield-Solutions
```

Do **not** mark this server block `default_server` on a multi-site VPS.

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (sitemap, OG) |
| `NEXT_PUBLIC_SITE_NAME` | SafeShield Solutions |
| `PORT` | PM2 / standalone server port |
| `HOSTNAME` | Set `0.0.0.0` behind nginx |
| `NEXT_BUILD_STATIC_SERVICES` | Max service pages to SSG at build (0 = none) |
| `NEXT_BUILD_STATIC_CITY_SAMPLES` | Max sample city/area paths at build (0 = none) |

## Verify

```bash
curl -I http://127.0.0.1:3010/
curl -I http://127.0.0.1:3010/sitemap.xml
npm run pages:count
```

## Storage & disk

See **[deploy/STORAGE.md](./STORAGE.md)** for sizes, ISR cache, and cleanup.

```bash
npm run storage:report   # folder sizes
npm run deploy:prune     # after build: remove node_modules + .next except standalone
```
