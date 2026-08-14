# Storage — PM2 standalone (no Docker)

Disk plan for **SafeShield Solutions** on Ubuntu 24.04 with **50+ Next.js sites** on a **200 GB SSD**. This app has **~727k logical URLs** and almost **no static HTML on disk** at build time.

## Why this layout

| Path | When | Typical size | Keep in production? |
|------|------|--------------|---------------------|
| `node_modules/` | `npm ci` / build | **~400–700 MB** | **No** — delete after build |
| `.next/cache/` | `next build` | **~50–150 MB** | **No** — delete after build |
| `.next/server/`, `.next/static/` | build | ~10 MB | **No** — copied into standalone |
| **`.next/standalone/`** | build + PM2 | **~80–150 MB** | **Yes** — this is the app |
| `src/`, `public/`, `deploy/` | repo | ~5–20 MB | Yes for rebuilds |
| PM2 logs | runtime | grows | `pm2-logrotate` (8 MB × 5) |
| **ISR cache** | runtime | **grows with crawl** | `.next/standalone/.next/cache` |

50 sites × ~150 MB standalone ≈ **7.5 GB**. Leave the rest for ISR, nginx logs, and OS. Do **not** keep `node_modules` on 50 sites (~25–35 GB wasted).

## Deploy (smallest runtime)

```bash
cd /root/safeshieldsolutions   # real clone path — not /var/www/safeshield unless that is the repo
git fetch origin
git reset --hard origin/main
npm run deploy:prod          # npm install + next build + standalone + prune
pm2 delete safeshield-solutions || true
pm2 start deploy/ecosystem.config.cjs
pm2 save
```

`deploy:prod` keeps `.next/standalone` and removes `node_modules` plus leftover `.next/*` (cache, server, traces). Source maps are stripped during `prepare-standalone`.

## Runtime ISR (safe)

First hit to a locality URL writes HTML under `.next/standalone/.next/cache/`.

- Not 727k files upfront — only requested URLs.
- Heavy Google crawl can grow this to hundreds of MB per site.
- Safe trim (brief regeneration on next request):

```bash
pm2 stop safeshield-solutions
rm -rf .next/standalone/.next/cache
pm2 start deploy/ecosystem.config.cjs
```

Do **not** delete `server.js`, `public/`, or `.next/static` inside standalone.

## Logs

```bash
npm run pm2:logs:setup
# or:
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 8M
pm2 set pm2-logrotate:retain 5
pm2 set pm2-logrotate:compress true
```

nginx: rely on Ubuntu `logrotate` for `/var/log/nginx/`. Access logs are off for `/_next/static/` and `/images/`.

## nginx

See `deploy/nginx-safeshield.conf`: HTTP/2, gzip, keepalive, proxy buffering, long cache on hashed static assets. Enable Brotli only if `libnginx-mod-brotli` is installed (commented in the file).

## Linux (safe, after deploy)

```bash
sudo apt-get autoremove -y
sudo apt-get clean
sudo journalctl --vacuum-time=7d
# Never rm -rf /var/lib/apt or live PM2 processes
```

## RAM / CPU (per site)

| Setting | Value | Why |
|---------|--------|-----|
| PM2 mode | fork, 1 instance | Cluster doubles RAM; one process is enough until CPU saturates |
| `max_memory_restart` | 512M | Restarts a leak without taking the VPS down |
| `NODE_OPTIONS` | `--max-old-space-size=384` | Caps V8 heap; raise only if you see OOM on heavy ISR |
| `vizion` | false | Skips git metadata scans (50 sites × git = wasted CPU) |
| Build SSG | `NEXT_BUILD_STATIC_* = 0` | Millions of URLs stay on-demand ISR |

## Sitemaps

Dynamic (`/sitemap.xml`, `/sitemaps/[chunk]`). No 727k XML files on disk.

## Multi-site ports

| Site | `cwd` | `PORT` |
|------|--------|--------|
| safeshieldsolutions.in | `/var/www/safeshield/.next/standalone` | 3010 |
| next site | `/var/www/other/.next/standalone` | 3001 |

Each nginx `server` proxies to its `127.0.0.1:PORT`.
