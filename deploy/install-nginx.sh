#!/usr/bin/env bash
# Install nginx vhost for safeshieldsolutions.in into /etc/nginx/sites-available
# (copy, not a symlink into the git tree — that broke when /var/www/safeshield was missing).
#
# Usage (from the project root, as root):
#   bash deploy/install-nginx.sh
#   bash deploy/install-nginx.sh /root/safeshieldsolutions
set -euo pipefail

ROOT="${1:-}"
if [ -z "$ROOT" ]; then
  ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fi

AVAILABLE="/etc/nginx/sites-available/safeshieldsolutions"
ENABLED="/etc/nginx/sites-enabled/safeshieldsolutions"
CERT="/etc/letsencrypt/live/safeshieldsolutions.in/fullchain.pem"

echo "==> Project root: $ROOT"

if [ ! -d "$ROOT/deploy" ]; then
  echo "ERROR: $ROOT/deploy not found. Pass the real clone path:"
  echo "  bash deploy/install-nginx.sh /root/safeshieldsolutions"
  exit 1
fi

mkdir -p /var/www/certbot /etc/nginx/sites-available /etc/nginx/sites-enabled

# Drop broken symlinks that made nginx -t fail with "No such file or directory"
rm -f "$ENABLED" /etc/nginx/sites-enabled/safeshield

if [ -f "$CERT" ]; then
  SRC="$ROOT/deploy/nginx-safeshield.conf"
  echo "==> TLS cert found — installing HTTPS vhost"
else
  SRC="$ROOT/deploy/nginx-safeshield-http.conf"
  echo "==> No TLS cert yet — installing HTTP vhost (required for certbot)"
fi

cp -f "$SRC" "$AVAILABLE"
ln -sfn "$AVAILABLE" "$ENABLED"

echo "==> nginx -t"
nginx -t

systemctl reload nginx
echo "==> nginx reloaded"

if [ ! -f "$CERT" ]; then
  echo
  echo "Next: issue a certificate so HTTPS is not another brand's cert:"
  echo "  mkdir -p /var/www/certbot"
  echo "  certbot certonly --webroot -w /var/www/certbot -d safeshieldsolutions.in -d www.safeshieldsolutions.in"
  echo "  bash $ROOT/deploy/install-nginx.sh $ROOT"
  echo
  echo "Or let certbot edit nginx:"
  echo "  certbot --nginx -d safeshieldsolutions.in -d www.safeshieldsolutions.in"
fi

echo
echo "Checks:"
echo "  curl -sI http://127.0.0.1:3010/ | head"
echo "  curl -sI -H 'Host: safeshieldsolutions.in' http://127.0.0.1/ | grep -i x-site-brand"
echo "  curl -sIk https://safeshieldsolutions.in | grep -i x-site-brand"
echo "Expected: X-Site-Brand: SafeShield-Solutions"
