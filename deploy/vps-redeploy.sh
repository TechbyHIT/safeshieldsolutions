#!/usr/bin/env bash
# Start a full redeploy under systemd (safe to close SSH). Usage:
#   bash deploy/vps-redeploy.sh /root/safeshieldsolutions
set -euo pipefail

ROOT="${1:-}"
if [ -z "$ROOT" ]; then
  ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fi
ROOT="$(cd "$ROOT" && pwd)"

if [ ! -f "$ROOT/deploy/vps-run.sh" ]; then
  echo "ERROR: $ROOT/deploy/vps-run.sh not found"
  exit 1
fi

echo "==> SafeShield redeploy root: $ROOT"

# Never use pgrep -f safeshieldsolutions — it kills npm/next mid-build.
systemctl stop safeshield-build.service 2>/dev/null || true
systemctl stop safeshield-deploy.service 2>/dev/null || true
systemctl reset-failed safeshield-deploy.service 2>/dev/null || true

if ! swapon --show 2>/dev/null | grep -q .; then
  if [ ! -f /swapfile ] && df -Pk / | awk 'NR==2 {exit ($4+0>2500000)?0:1}'; then
    echo "==> Adding 2G swap (once) for npm/next build headroom"
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    grep -q '/swapfile' /etc/fstab 2>/dev/null || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  fi
fi

sysctl -w vm.overcommit_memory=1 >/dev/null 2>&1 || true
sysctl -w vm.overcommit_ratio=100 >/dev/null 2>&1 || true
# Drop kernel OOM killer / earlyoom if they exist so npm is not SIGKILL'd.
systemctl stop systemd-oomd.service systemd-oomd.socket 2>/dev/null || true
systemctl stop earlyoom 2>/dev/null || true

UNIT="/etc/systemd/system/safeshield-deploy.service"
sed "s|@ROOT@|$ROOT|g" "$ROOT/deploy/safeshield-deploy.service" > "$UNIT"
systemctl daemon-reload

touch /var/log/safeshield-deploy.log
chmod 644 /var/log/safeshield-deploy.log

echo "==> Starting systemd redeploy (log: /var/log/safeshield-deploy.log)"
: > /var/log/safeshield-deploy.log
systemctl start --no-block safeshield-deploy.service
sleep 12

state="$(systemctl show safeshield-deploy.service -p ActiveState --value 2>/dev/null || echo unknown)"
sub="$(systemctl show safeshield-deploy.service -p SubState --value 2>/dev/null || echo unknown)"
echo "==> Unit ActiveState=$state SubState=$sub"

if [ "$state" = "active" ] || [ "$sub" = "start" ] || [ "$sub" = "running" ]; then
  echo "==> Build running under systemd. Safe to close SSH."
  echo "    tail -f /var/log/safeshield-deploy.log"
  exit 0
fi

if systemctl is-failed --quiet safeshield-deploy.service; then
  echo "ERROR: redeploy failed. Last log lines:"
  tail -n 50 /var/log/safeshield-deploy.log
  exit 1
fi

echo "==> Check log (may still be starting):"
tail -n 30 /var/log/safeshield-deploy.log
