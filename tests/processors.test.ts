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

  it("converts HTML source to structured Markdown", () => {
    const html = `<!-- note --><style>p{color:red}</style><h2>Title</h2><p>Some <strong>bold</strong>, <em>italic</em>, and <a href="https://example.com">a link</a>.</p><ul><li>One</li><li>Two</li></ul><ol><li>First</li></ol><pre><code>const ok = &lt;T&gt;true;</code></pre><table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table>`;
    const result = processText("html-to-markdown", html);
    expect(result.output).toContain("## Title");
    expect(result.output).toContain("Some **bold**, *italic*, and [a link](https://example.com).");
    expect(result.output).toContain("- One\n- Two");
    expect(result.output).toContain("1. First");
    expect(result.output).toContain("```\nconst ok = <T>true;\n```");
    expect(result.output).toContain("| A | B |\n| --- | --- |\n| 1 | 2 |");
    expect(result.output).not.toContain("color:red");
    expect(result.output).not.toContain("note");
  });

  it("converts fancy Unicode pseudo-fonts to plain text", () => {
    const result = processText("remove-fancy-text", "𝗕𝗼𝗹𝗱 𝘪𝘵𝘢𝘭𝘪𝘬 ᴛʜɪs ｗｉｄｅ s̶t̶r̶i̶k̶e̶");
    expect(result.output).toBe("Bold italik this wide strike");
    expect(result.stats[0].label).toBe("Characters converted");
    expect(result.stats[0].value).toBeGreaterThan(15);
    expect(processText("remove-fancy-text", "already plain, café stays café").output).toBe("already plain, café stays café");
  });

  it("normalizes every formatting artifact in one humanizer pass", () => {
    const messy = "The plan \u2014 a good one \u2014 ships \u2018today\u2019 with \u201cno\u201d \ud83c\udf89 caveats.\u200b\n\ud835\uddd5\ud835\uddfc\ud835\uddf9\ud835\uddf1 \uff46\uff55\uff4c\uff4c and a\u00a0nbsp   plus tabs\t\there   ";
    const result = processText("humanize-ai-text", messy);
    expect(result.output).toBe("The plan, a good one, ships 'today' with \"no\" caveats.\nBold full and a nbsp plus tabs here");
    expect(result.stats).toEqual([
      { label: "Em dashes", value: 2 },
      { label: "Smart quotes", value: 4 },
      { label: "Hidden characters", value: 1 },
      { label: "Emojis", value: 1 },
      { label: "Characters converted", value: 9 },
    ]);
  });

  it("leaves ordinary prose, CJK, combining marks, and astral text intact", () => {
    const prose = "Ordinary prose with a comma, a period. Nothing to fix here.";
    expect(processText("humanize-ai-text", prose).output).toBe(prose);
    expect(processText("humanize-ai-text", prose).stats.every((stat) => stat.value === 0)).toBe(true);
    const mixed = "\u65e5\u672c\u8a9e\u306e\u30c6\u30ad\u30b9\u30c8 caf\u00e9 x\u0301 na\u00efve";
    expect(processText("humanize-ai-text", mixed).output).toBe(mixed);
  });

  it("keeps the shared fancy-text normalizer byte-identical for its original callers", () => {
    // Guard for the refactor that extracted normalizeFancyText: these are the
    // exact values remove-fancy-text and clean-ai-text returned before it.
    expect(processText("remove-fancy-text", "\ud835\udddb\ud835\uddf2\ud835\uddf9\ud835\uddfd \u1d0d\u1d07 \uff54\uff45\uff53\uff54 s\u0336t\u0336r\u0336i\u0336k\u0336e\u0336")).toEqual({
      output: "Help me test strike",
      stats: [{ label: "Characters converted", value: 16 }, { label: "Words", value: 4 }],
    });
    expect(processText("clean-ai-text", "The plan \u2014 a good one \u2014 ships \u2018today\u2019 with \u201cno\u201d \ud83c\udf89 caveats. Really.\u200b")).toEqual({
      output: "The plan , a good one , ships 'today' with \"no\" caveats. Really.",
      stats: [
        { label: "Em dashes", value: 2 },
        { label: "Smart quotes", value: 4 },
        { label: "Hidden characters", value: 1 },
        { label: "Emojis", value: 1 },
      ],
    });
  });

  it("labels invisible characters in place without deleting anything", () => {
    const result = processText("show-invisible-characters", "Ada\u200bx\u00a0y\u00ad\ufeff");
    expect(result.output).toBe("Ada[ZWSP]x[NBSP]y[SHY][BOM]");
    expect(result.stats).toEqual([
      { label: "Hidden characters found", value: 4 },
      { label: "Zero-width", value: 1 },
      { label: "Soft hyphens", value: 1 },
      { label: "Characters", value: 9 },
    ]);
  });

  it("leaves emoji, accents, and CJK untouched apart from real joiners", () => {
    const intact = processText("show-invisible-characters", "cafe\u0301 caf\u00e9 \u6f22\u5b57 \ud83c\udf89");
    expect(intact.output).toBe("cafe\u0301 caf\u00e9 \u6f22\u5b57 \ud83c\udf89");
    expect(intact.stats[0]).toEqual({ label: "Hidden characters found", value: 0 });
    expect(processText("show-invisible-characters", "\u{1f468}\u200d\u{1f469}\u200d\u{1f466}").output).toBe("\u{1f468}[ZWJ]\u{1f469}[ZWJ]\u{1f466}");
  });

  it("labels every character in the marker table with its conventional name", () => {
    const expected: [string, string][] = [
      ["	", "TAB"], [" ", "NBSP"], ["­", "SHY"], ["​", "ZWSP"],
      ["‌", "ZWNJ"], ["‍", "ZWJ"], ["‎", "LRM"], ["‏", "RLM"],
      [" ", "LS"], [" ", "PS"], ["‪", "LRE"], ["‫", "RLE"],
      ["‬", "PDF"], ["‭", "LRO"], ["‮", "RLO"], [" ", "NNBSP"],
      ["⁠", "WJ"], ["﻿", "BOM"],
    ];
    for (const [char, name] of expected) {
      expect(processText("show-invisible-characters", `a${char}b`).output).toBe(`a[${name}]b`);
    }
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
