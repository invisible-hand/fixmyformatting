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

const sitemap = await fetch(`https://${host}/sitemap.xml`);
if (!sitemap.ok) {
  console.error(`Failed to fetch sitemap: ${sitemap.status}`);
  process.exit(1);
}
const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.error("Sitemap contained no URLs.");
  process.exit(1);
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
