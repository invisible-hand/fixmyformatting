import { describe, expect, it } from "vitest";
import { processText, renderMarkdown } from "../src/lib/processors";
import { countModelTokens } from "../src/lib/token-count";
import { createMarkdownDocx } from "../src/lib/markdown-docx";
import { strFromU8, unzipSync } from "fflate";

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

  it("supports every advertised case conversion mode", () => {
    expect(processText("case-converter", "hello WORLD", { caseMode: "title" }).output).toBe("Hello World");
    expect(processText("case-converter", "hello world", { caseMode: "upper" }).output).toBe("HELLO WORLD");
    expect(processText("case-converter", "HELLO WORLD", { caseMode: "lower" }).output).toBe("hello world");
    expect(processText("case-converter", "HELLO. WORLD!", { caseMode: "sentence" }).output).toBe("Hello. World!");
  });

  it("creates an ordered visual text diff", () => {
    const result = processText("text-diff", "Keep this old text\n---\nKeep this new text");
    expect(result.html).toContain("diff-removed");
    expect(result.html).toContain("diff-added");
    expect(result.stats).toEqual([{ label: "Additions", value: 1 }, { label: "Deletions", value: 1 }]);
  });

  it("supports all em dash replacement settings", () => {
    expect(processText("remove-em-dashes", "one — two", { dashReplacement: "semicolon" }).output).toBe("one; two");
    expect(processText("remove-em-dashes", "one — two", { dashReplacement: "remove" }).output).toBe("one two");
  });

  it("counts GPT-4o tokens locally", () => {
    expect(countModelTokens("Hello world").stats[0]).toEqual({ label: "GPT-4o tokens", value: 2 });
  });

  it("preserves rich Markdown structure in DOCX output", async () => {
    const blob = await createMarkdownDocx("# Title\n\n**Bold** and [link](https://example.com)\n\n1. First\n   1. Nested\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n```ts\nconst ok = true;\n```");
    const files = unzipSync(new Uint8Array(await blob.arrayBuffer()));
    const documentXml = strFromU8(files["word/document.xml"]);
    expect(documentXml).toContain("<w:tbl>");
    expect(documentXml).toContain("<w:b");
    expect(documentXml).toContain("<w:numPr>");
    expect(documentXml).toContain("Courier New");
    expect(strFromU8(files["word/_rels/document.xml.rels"])).toContain("https://example.com");
  });
});
