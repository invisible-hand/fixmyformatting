import { gzipSync } from "node:zlib";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const nextDir = join(root, ".next");
const maxRouteJs = 200 * 1024;
const maxHtml = 50 * 1024;
const failures = [];
let checkedHtml = 0;
let largestInitialJs = { bytes: 0, file: "" };

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
      const bytes = gzipSync(readFileSync(path)).byteLength;
      if (bytes > maxHtml) failures.push(`${relative(nextDir, path)}: HTML ${(bytes / 1024).toFixed(1)} KB gzip exceeds 50 KB`);
      checkHtml(path);
    }
  }
}

function checkHtml(path) {
  const source = readFileSync(path, "utf8");
  if (!source.includes("<main")) return;
  checkedHtml += 1;
  const file = relative(nextDir, path);
  const scriptUrls = [...new Set([...source.matchAll(/<script[^>]+src="([^"]+\.js(?:\?[^"]*)?)"/g)].map((match) => match[1]))];
  const initialJsBytes = scriptUrls.reduce((total, url) => {
    const chunkPath = join(nextDir, url.replace(/^\/_next\//, "").replace(/\?.*$/, ""));
    return total + (existsSync(chunkPath) ? gzipSync(readFileSync(chunkPath)).byteLength : 0);
  }, 0);
  if (initialJsBytes > largestInitialJs.bytes) largestInitialJs = { bytes: initialJsBytes, file };
  const title = source.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const description = source.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const canonical = source.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const h1Count = source.match(/<h1(?:\s|>)/g)?.length ?? 0;
  if (!title) failures.push(`${file}: missing title`);
  if (title.length > 60) failures.push(`${file}: title has ${title.length} characters`);
  if (!description) failures.push(`${file}: missing meta description`);
  if (description.length > 155) failures.push(`${file}: description has ${description.length} characters`);
  if (!canonical) failures.push(`${file}: missing canonical`);
  if (h1Count !== 1) failures.push(`${file}: expected one H1, found ${h1Count}`);

  const localized = file.match(/server\/app\/localized-content\/([^/]+)(?:\/|\.html)/);
  if (!localized) return;
  const locale = localized[1];
  const htmlLang = source.match(/<html lang="([^"]+)" dir="([^"]+)"/);
  if (htmlLang?.[1] !== locale) failures.push(`${file}: html lang is ${htmlLang?.[1] ?? "missing"}, expected ${locale}`);
  if (locale === "ar" && htmlLang?.[2] !== "rtl") failures.push(`${file}: Arabic page is not RTL`);
  if (canonical.includes("/localized-content/")) failures.push(`${file}: canonical exposes internal rewrite path`);
  const hreflangs = source.match(/<link rel="alternate" hrefLang="[^"]+"/g)?.length ?? 0;
  if (hreflangs !== 12) failures.push(`${file}: expected 12 hreflang links, found ${hreflangs}`);
}

function checkClientManifest(path) {
  const source = readFileSync(path, "utf8");
  const marker = source.lastIndexOf(" = ");
  if (marker < 0) return;
  const manifest = JSON.parse(source.slice(marker + 3).replace(/;\s*$/, ""));
  const entries = manifest.entryJSFiles ?? {};
  for (const [route, files] of Object.entries(entries)) {
    if (!route.includes("/src/app/") || route.endsWith("/src/app/layout")) continue;
    const initialFiles = [...new Set(files.filter((file) => file.endsWith(".js")))];
    const bytes = initialFiles.reduce((total, file) => {
      const chunkPath = join(nextDir, file);
      return total + (existsSync(chunkPath) ? gzipSync(readFileSync(chunkPath)).byteLength : 0);
    }, 0);
    if (bytes > maxRouteJs) failures.push(`${route}: initial JS ${(bytes / 1024).toFixed(1)} KB gzip exceeds 200 KB`);
  }
}

walk(join(nextDir, "server", "app"));
if (largestInitialJs.bytes > maxRouteJs) {
  failures.push(`${largestInitialJs.file}: initial JS ${(largestInitialJs.bytes / 1024).toFixed(1)} KB gzip exceeds 200 KB`);
}

if (failures.length) {
  console.error(`Performance budgets failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Build checks passed: initial JS ≤ 200 KB gzip, HTML ≤ 50 KB gzip, and ${checkedHtml} static pages passed SEO metadata checks.`);
