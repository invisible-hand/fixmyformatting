import { gzipSync } from "node:zlib";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const nextDir = join(root, ".next");
const maxRouteJs = 40 * 1024;
const maxHtml = 50 * 1024;
const failures = [];

if (!existsSync(join(nextDir, "server", "app"))) {
  console.error("Performance budget check requires a completed Next.js build.");
  process.exit(1);
}

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith("page_client-reference-manifest.js")) checkClientManifest(path);
    else if (path.endsWith(".html")) {
      const bytes = statSync(path).size;
      if (bytes > maxHtml) failures.push(`${relative(nextDir, path)}: HTML ${(bytes / 1024).toFixed(1)} KB exceeds 50 KB`);
    }
  }
}

function checkClientManifest(path) {
  const source = readFileSync(path, "utf8");
  const marker = source.lastIndexOf(" = ");
  if (marker < 0) return;
  const manifest = JSON.parse(source.slice(marker + 3).replace(/;\s*$/, ""));
  const entries = manifest.entryJSFiles ?? {};
  const shared = new Set(Object.entries(entries).filter(([key]) => key.endsWith("/src/app/layout")).flatMap(([, files]) => files));
  for (const [route, files] of Object.entries(entries)) {
    if (!route.includes("/src/app/") || route.endsWith("/src/app/layout")) continue;
    const routeOwned = files.filter((file) => !shared.has(file) && file.endsWith(".js"));
    const bytes = routeOwned.reduce((total, file) => {
      const chunkPath = join(nextDir, file);
      return total + (existsSync(chunkPath) ? gzipSync(readFileSync(chunkPath)).byteLength : 0);
    }, 0);
    if (bytes > maxRouteJs) failures.push(`${route}: route-owned JS ${(bytes / 1024).toFixed(1)} KB gzip exceeds 40 KB`);
  }
}

walk(join(nextDir, "server", "app"));

if (failures.length) {
  console.error(`Performance budgets failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log("Performance budgets passed: route JS ≤ 40 KB gzip and HTML ≤ 50 KB.");
