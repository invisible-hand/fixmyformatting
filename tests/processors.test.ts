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

  it("joins a mixed bullet list into one punctuated paragraph", () => {
    const result = processText("bullet-points-to-paragraph", "- First point\n* Second point.\n+ Third point!\n\u2022 Fourth point");
    expect(result.output).toBe("First point. Second point. Third point! Fourth point.");
    expect(result.stats).toEqual([
      { label: "Elements", value: 4 },
      { label: "Sentences", value: 4 },
      { label: "Words", value: 8 },
    ]);
  });

  it("keeps a blank line between bullet blocks as a paragraph break", () => {
    const result = processText("bullet-points-to-paragraph", "- One\n- Two\n\n- Three\n- Four");
    expect(result.output).toBe("One. Two.\n\nThree. Four.");
  });

  it("converts numbered lists and leaves headings as their own paragraph", () => {
    const result = processText("bullet-points-to-paragraph", "# Plan\n\n1. Ship the parser\n2) Write the tests\n(3) Deploy");
    expect(result.output).toBe("# Plan\n\nShip the parser. Write the tests. Deploy.");
  });

  it("leaves fenced code blocks untouched", () => {
    const input = "- Run the build\n\n```sh\nnpm run build\n\n- not a bullet\n```\n\n- Then deploy";
    const result = processText("bullet-points-to-paragraph", input);
    expect(result.output).toContain("```sh\nnpm run build\n\n- not a bullet\n```");
    expect(result.stats[0]).toEqual({ label: "Elements", value: 2 });
  });

  it("never mistakes a mid-sentence hyphen for a bullet", () => {
    const prose = "The range is 5 - 10 units, and item 3. of the contract still applies.";
    expect(processText("bullet-points-to-paragraph", prose).output).toBe(prose);
  });

  it("splits a paragraph into bullets without breaking abbreviations", () => {
    const result = processText(
      "bullet-points-to-paragraph",
      "Dr. Ada reviewed the draft. Some tools, e.g. the token counter, run locally. Nothing is uploaded.",
      { listDirection: "bullets" },
    );
    expect(result.output).toBe(
      "- Dr. Ada reviewed the draft.\n- Some tools, e.g. the token counter, run locally.\n- Nothing is uploaded.",
    );
    expect(result.stats[0]).toEqual({ label: "Elements", value: 3 });
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
    // The clean-ai-text output below intentionally changed in the "space before
    // the comma" fix: replacing " \u2014 " with "," used to leave "The plan , a good
    // one , ships". The tidy-up remove-em-dashes already applied is now shared,
    // so the commas sit against the preceding word. Everything else -- the
    // quotes, the emoji, the hidden character, and all four stats -- is
    // unchanged, which is what this guard exists to pin.
    expect(processText("clean-ai-text", "The plan \u2014 a good one \u2014 ships \u2018today\u2019 with \u201cno\u201d \ud83c\udf89 caveats. Really.\u200b")).toEqual({
      output: "The plan, a good one, ships 'today' with \"no\" caveats. Really.",
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

  it("keeps snake_case identifiers intact while still stripping real emphasis", () => {
    const strip = (input: string) => processText("remove-markdown-formatting", input).output;
    expect(strip("snake_case_word")).toBe("snake_case_word");
    expect(strip("a_b_c")).toBe("a_b_c");
    expect(strip("MY_ENV_VAR")).toBe("MY_ENV_VAR");
    expect(strip("_italic_")).toBe("italic");
    expect(strip("__bold__")).toBe("bold");
    expect(strip("some _emphasis_ here")).toBe("some emphasis here");
    expect(strip("*star*")).toBe("star");
    expect(strip("**star**")).toBe("star");
    expect(strip("Set MY_ENV_VAR in _config_ and read data_loader.py")).toBe("Set MY_ENV_VAR in config and read data_loader.py");
  });

  it("removes the space an em dash leaves in front of its replacement", () => {
    expect(processText("clean-ai-text", "The plan — a good one — ships").output).toBe("The plan, a good one, ships");
  });

  it("converts no-break spaces to ordinary spaces without joining words", () => {
    const result = processText("clean-ai-text", "a\u00a0nbsp and a\u202fnarrow one");
    expect(result.output).toBe("a nbsp and a narrow one");
    expect(result.stats.map((stat) => stat.label)).toEqual(["Em dashes", "Smart quotes", "Hidden characters", "Emojis"]);
  });

  it("falls back to the default replacement for a dash setting it does not know", () => {
    const rogue = { dashReplacement: "colon" } as unknown as Parameters<typeof processText>[2];
    expect(processText("remove-em-dashes", "a — b", rogue).output).toBe("a, b");
    const rogueCase = { caseMode: "smallcaps" } as unknown as Parameters<typeof processText>[2];
    expect(processText("case-converter", "hello world", rogueCase).output).toBe("Hello World");
    const rogueList = { listDirection: "sideways" } as unknown as Parameters<typeof processText>[2];
    expect(processText("bullet-points-to-paragraph", "- One\n- Two", rogueList).output).toBe("One. Two.");
  });

  it("drops the Markdown alignment row when extracting a table from text", () => {
    const result = processText("extract-table-from-text", "| Owner | Task |\n| --- | ---: |\n| Ada | Parser |\n| Bob | 412 |");
    expect(result.output).toBe("Owner,Task\nAda,Parser\nBob,412");
    expect(result.stats).toEqual([{ label: "Tables found", value: 1 }, { label: "Rows", value: 3 }]);
    expect(processText("extract-table-from-text", "| A | B |\n|:---:|:-|\n| 1 | 2 |").output).toBe("A,B\n1,2");
    // A row of real dashes is not an alignment row and must survive.
    expect(processText("extract-table-from-text", "| A | B |\n| - | -- |\n| 1 | 2 |").output).toBe("A,B\n1,2");
  });

  it("writes numeric spreadsheet cells as numbers and everything else as text", async () => {
    const { createXlsx } = await import("../src/lib/xlsx");
    const files = unzipSync(createXlsx([
      ["Region", "Units", "Code", "Share"],
      ["North", "412", "007", "-3.5"],
      ["South", "+1", "1,024", "$9"],
      ["East", " 8 ", "1e3", "12."],
    ]));
    const sheet = strFromU8(files["xl/worksheets/sheet1.xml"]);
    // Header row stays inline text and keeps its bold style.
    expect(sheet).toContain('<c r="A1" t="inlineStr" s="1"><is><t xml:space="preserve">Region</t></is></c>');
    expect(sheet).toContain('<c r="B1" t="inlineStr" s="1"><is><t xml:space="preserve">Units</t></is></c>');
    // Real numbers: no `t` attribute, so Excel treats them as numeric.
    expect(sheet).toContain('<c r="B2"><v>412</v></c>');
    expect(sheet).toContain('<c r="D2"><v>-3.5</v></c>');
    // Values that only look numeric must stay text.
    for (const reference of ["C2", "B3", "C3", "D3", "B4", "C4", "D4", "A2"]) {
      expect(sheet).toContain(`<c r="${reference}" t="inlineStr">`);
    }
    expect(sheet).toContain('<c r="C2" t="inlineStr"><is><t xml:space="preserve">007</t></is></c>');
    // The package still contains every part a valid .xlsx needs.
    for (const part of ["[Content_Types].xml", "_rels/.rels", "xl/workbook.xml", "xl/_rels/workbook.xml.rels", "xl/styles.xml"]) {
      expect(files[part]).toBeDefined();
    }
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
