/**
 * PM2 — one fork process per site. No cluster unless traffic requires it.
 *
 * Build:
 *   npm ci
 *   npm run build
 *   npm run deploy:prune
 *
 * Start:
 *   pm2 start deploy/ecosystem.config.cjs
 *
 * Logs (once per VPS):
 *   pm2 install pm2-logrotate
 *   pm2 set pm2-logrotate:max_size 8M
 *   pm2 set pm2-logrotate:retain 5
 *   pm2 set pm2-logrotate:compress true
 *   pm2 set pm2-logrotate:workerInterval 60
 */
const path = require("path");
const root = path.join(__dirname, "..");

module.exports = {
  apps: [
    {
      name: "safeshield-solutions",
      cwd: root,
      script: path.join(root, ".next", "standalone", "server.js"),
      instances: 1,
      exec_mode: "fork",
      watch: false,
      vizion: false,
      autorestart: true,
      min_uptime: "10s",
      max_restarts: 12,
      restart_delay: 2000,
      kill_timeout: 8000,
      listen_timeout: 10000,
      max_memory_restart: "512M",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: 3010,
        NODE_OPTIONS: "--max-old-space-size=384",
        NEXT_TELEMETRY_DISABLED: "1",
        NEXT_PUBLIC_SITE_URL: "https://safeshieldsolutions.in",
        NEXT_PUBLIC_SITE_NAME: "SafeShield Solutions",
      },
    },
  ],
};
