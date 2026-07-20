import { describe, expect, it } from "vitest";
import { processText, renderMarkdown } from "../src/lib/processors";

const fixture = `# Launch Plan

Here is **bold** with “smart quotes” — and a hidden\u200bcharacter.

| Owner | Task |
| --- | --- |
| Ada | Parser |

\`\`\`ts
const fast = true;
\`\`\`

Emoji: ✨`;

describe("text processors", () => {
  it("renders headings, tables, and code as semantic HTML", () => {
    const html = renderMarkdown(fixture);
    expect(html).toContain("<h1>Launch Plan</h1>");
    expect(html).toContain("<table>");
    expect(html).toContain("<pre><code>");
  });

  it("cleans AI formatting and reports every artifact", () => {
    const result = processText("clean-ai-text", fixture);
    expect(result.output).not.toContain("—");
    expect(result.output).not.toContain("“");
    expect(result.output).not.toContain("\u200b");
    expect(result.output).not.toContain("✨");
    expect(result.stats.map((stat) => stat.value)).toEqual([1, 2, 1, 1]);
  });

  it("converts markdown tables into CSV dimensions", () => {
    const result = processText("markdown-table-to-csv", fixture);
    expect(result.output).toBe("Owner,Task\nAda,Parser");
    expect(result.stats).toEqual([{ label: "Rows", value: 1 }, { label: "Columns", value: 2 }]);
  });

  it("validates and formats JSON", () => {
    expect(processText("json-formatter", '{"ok":true}').valid).toBe(true);
    expect(processText("json-formatter", "{nope}").valid).toBe(false);
  });

  it("maps brand variants to the shared conversion core", () => {
    const core = processText("markdown-to-html", "**hello**");
    const brand = processText("claude-to-word", "**hello**");
    expect(core.html).toBe(brand.html);
  });
});
