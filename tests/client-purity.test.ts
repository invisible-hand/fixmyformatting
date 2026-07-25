import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Guide and tool routes have roughly 8 KB of headroom against the 200 KB
 * initial-JS budget in scripts/check-budgets.mjs. The translation corpus is
 * over a megabyte of prose, so a single client component importing it would
 * fail the build in a way that is tedious to trace back. Fail here instead.
 */

const forbidden = [/@\/lib\/i18n/, /@\/lib\/guides/, /@\/content\//, /\bfrom "marked"/];

function sourceFiles(dir: string, found: string[] = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) sourceFiles(path, found);
    else if (/\.tsx?$/.test(path)) found.push(path);
  }
  return found;
}

describe("client bundle purity", () => {
  it("keeps translation content out of every client component", () => {
    const offenders: string[] = [];
    for (const path of sourceFiles("src")) {
      const source = readFileSync(path, "utf8");
      if (!/^\s*["']use client["']/m.test(source)) continue;
      for (const pattern of forbidden) {
        if (pattern.test(source)) offenders.push(`${path} imports ${pattern.source}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
