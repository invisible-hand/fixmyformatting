/**
 * Regenerates src/content/i18n/<locale>/guides/index.ts from whatever guide
 * translations exist on disk, and wires the barrel into the locale bundle.
 *
 * Coverage is therefore whatever actually got translated — a locale missing a
 * guide simply does not serve it, and hreflang, the sitemap and
 * generateStaticParams all follow from that automatically.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { localeCodes } from "../src/lib/i18n/locales";

const root = new URL("../src/content/i18n/", import.meta.url).pathname;

for (const locale of localeCodes) {
  const dir = `${root}${locale}/guides/`;
  const slugs = existsSync(dir)
    ? readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "index.ts").map((f) => f.replace(/\.ts$/, "")).sort()
    : [];

  if (slugs.length) {
    const imports = slugs.map((slug, i) => `import { guide as g${i} } from "./${slug}";`).join("\n");
    const entries = slugs.map((slug, i) => `  ${JSON.stringify(slug)}: g${i},`).join("\n");
    writeFileSync(
      `${dir}index.ts`,
      `import type { GuideTranslation } from "@/lib/i18n";\n${imports}\n\nexport const guides: Partial<Record<string, GuideTranslation>> = {\n${entries}\n};\n`,
    );
  }

  const indexPath = `${root}${locale}/index.ts`;
  let source = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
  if (slugs.length && !source.includes("./guides")) {
    source = source.replace('import { figures } from "./figures";', 'import { figures } from "./figures";\nimport { guides } from "./guides";');
    source = source.replace(", tools, brand };", ", tools, brand, guides };");
    writeFileSync(indexPath, source);
  }
  console.log(`  ${locale}: ${slugs.length} guides`);
}
