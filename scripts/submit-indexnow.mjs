import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const host = "fixmyformatting.com";
const publicDir = new URL("../public/", import.meta.url).pathname;

const keyFile = readdirSync(publicDir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("No IndexNow key file found in public/.");
  process.exit(1);
}
const key = readFileSync(join(publicDir, keyFile), "utf8").trim();

// Usage:
//   npm run submit:indexnow -- /fonts-copy-and-paste /guides/em-dash-copy-paste
//   npm run submit:indexnow -- --all        (the whole sitemap: first launch or a site-wide change only)
//   add --dry-run to print the list without sending it
// Submit only pages whose content changed, once. Resubmitting unchanged URLs in bulk
// gets a site flagged by Bing for IndexNow batch mode.
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const all = args.includes("--all");
const paths = args.filter((a) => !a.startsWith("--"));

if (all === paths.length > 0) {
  console.error(
    "Pass the changed paths (e.g. /fonts-copy-and-paste /guides/em-dash-copy-paste), or --all for the whole sitemap.",
  );
  process.exit(1);
}

const sitemap = await fetch(`https://${host}/sitemap.xml`);
if (!sitemap.ok) {
  console.error(`Failed to fetch sitemap: ${sitemap.status}`);
  process.exit(1);
}
const sitemapUrls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (sitemapUrls.length === 0) {
  console.error("Sitemap contained no URLs.");
  process.exit(1);
}

let urlList = sitemapUrls;
if (!all) {
  const origin = `https://${host}`;
  urlList = [
    ...new Set(
      paths.map((p) => {
        const url = p.startsWith("http") ? p : origin + (p.startsWith("/") ? p : `/${p}`);
        return url === `${origin}/` ? origin : url;
      }),
    ),
  ];
  // Only canonical, live URLs: anything else is a typo or a page that is not deployed yet.
  const unknown = urlList.filter((u) => !sitemapUrls.includes(u));
  if (unknown.length > 0) {
    console.error(`Not in the live sitemap:\n  ${unknown.join("\n  ")}`);
    process.exit(1);
  }
}

if (dryRun) {
  console.log(`Dry run, ${urlList.length} URLs:\n  ${urlList.join("\n  ")}`);
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList }),
});

if (response.ok) {
  console.log(`Submitted ${urlList.length} URLs to IndexNow (HTTP ${response.status}).`);
} else {
  console.error(`IndexNow submission failed: HTTP ${response.status} ${await response.text()}`);
  process.exit(1);
}
