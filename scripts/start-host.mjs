/**
 * Hostinger injects PORT. A saved placeholder such as "l9JU23NF394R6HH" is not a port
 * and makes the process exit, which the panel shows as 503.
 * Standalone is used when the build produced it. Otherwise `next start` is used.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const port = /^\d+$/.test(process.env.PORT ?? "") ? process.env.PORT : "3000";
const host =
  process.env.HOSTNAME === "127.0.0.1" || process.env.HOSTNAME === "localhost"
    ? process.env.HOSTNAME
    : "0.0.0.0";

process.env.PORT = port;
process.env.HOSTNAME = host;

const standalone = path.join(process.cwd(), ".next", "standalone", "server.js");
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const useStandalone = fs.existsSync(standalone);
const args = useStandalone ? [standalone] : [nextBin, "start", "-H", host, "-p", port];

console.log(`Starting ${useStandalone ? "standalone" : "next start"} on ${host}:${port}`);

const child = spawn(process.execPath, args, { stdio: "inherit", env: process.env });
child.on("exit", (code) => process.exit(code ?? 1));
