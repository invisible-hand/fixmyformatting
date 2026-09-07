import { isNumericCell } from "./numeric-cell";
import { getProcessorSlug } from "./tools";
import { diffWords } from "diff";

export type ProcessedResult = {
  output: string;
  html?: string;
  stats: { label: string; value: string | number }[];
  valid?: boolean;
};

export type ProcessSettings = {
  caseMode?: "title" | "upper" | "lower" | "sentence";
  dashReplacement?: "comma" | "semicolon" | "hyphen" | "remove";
  listDirection?: "paragraph" | "bullets";
  /** remove-markdown-formatting: keep the URL of a link as "text (url)" instead of the text alone. */
  keepUrls?: boolean;
  /** remove-markdown-formatting: keep bullets (as •) and list numbers, or drop them. */
  listMarkers?: "keep" | "remove";
  /** remove-markdown-formatting: leave fenced code blocks exactly as written, fences included. */
  keepCode?: boolean;
  /** remove-markdown-formatting: also collapse repeated spaces, trailing whitespace and stacked blank lines. */
  tidySpacing?: boolean;
  /** remove-markdown-formatting / clean-ai-text: render the result as a word-level diff against the input. */
  showChanges?: boolean;
  /** clean-ai-text: also strip Markdown symbols in the same pass. */
  stripMarkdown?: boolean;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
}

export function renderMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let inCode = false;
  let inList = false;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim().startsWith("```")) {
      html += inCode ? "</code></pre>" : "<pre><code>";
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      html += `${escapeHtml(line)}\n`;
      continue;
    }
    if (/^\|.+\|$/.test(line.trim()) && /^\|?[\s:|-]+\|?$/.test(lines[index + 1]?.trim() ?? "")) {
      const tableLines = [line, ...lines.slice(index + 2).filter((row) => /^\|.+\|$/.test(row.trim()))];
      const rows = tableLines.map(parseMarkdownRow);
      html += `<table><thead><tr>${rows[0].map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${rows
        .slice(1)
        .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`;
      index += 1 + Math.max(0, rows.length - 1);
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      const level = heading[1].length;
      html += `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`;
      continue;
    }
    const quote = line.match(/^\s*>\s?(.+)$/);
    if (quote) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      html += `<blockquote><p>${inlineMarkdown(quote[1])}</p></blockquote>`;
      continue;
    }
    const list = line.match(/^\s*[-*+]\s+(.+)$/);
    if (list) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMarkdown(list[1])}</li>`;
      continue;
    }
    if (inList) {
      html += "</ul>";
      inList = false;
    }
    if (line.trim()) html += `<p>${inlineMarkdown(line)}</p>`;
  }
  if (inList) html += "</ul>";
  if (inCode) html += "</code></pre>";
  return html;
}

/**
 * Split a pipe row into cells. A pipe escaped as `\|` is content (a GitHub /
 * CommonMark-GFM convention chat assistants follow when a cell needs a literal
 * bar), so the split runs on unescaped pipes only and the escape is removed.
 */
function parseMarkdownRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/(?<!\\)\|$/, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.replace(/\\\|/g, "|").trim());
}

const alignmentRow = (line: string | undefined) => /^\|?[\s:|-]+\|?$/.test(line?.trim() ?? "") && (line ?? "").includes("-");

/**
 * Every pipe table in the input, in order: a header row, an alignment row,
 * then body rows until the first line without a pipe. Prose between tables is
 * skipped, so a table buried in a long answer is found without trimming it out
 * by hand.
 */
export function parseMarkdownTables(input: string): string[][][] {
  const lines = input.split(/\r?\n/);
  const tables: string[][][] = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].includes("|") || !alignmentRow(lines[index + 1])) continue;
    const rows = [parseMarkdownRow(lines[index])];
    let cursor = index + 2;
    while (cursor < lines.length && lines[cursor].includes("|")) {
      rows.push(parseMarkdownRow(lines[cursor]));
      cursor += 1;
    }
    tables.push(rows);
    index = cursor - 1;
  }
  return tables;
}

function parseMarkdownTable(input: string) {
  return parseMarkdownTables(input)[0] ?? [];
}

const tableToTsv = (rows: string[][]) => rows.map((row) => row.map((cell) => cell.replace(/[\t\r\n]+/g, " ")).join("\t")).join("\n");

/**
 * The preview grid mirrors the workbook: one <table> per sheet, the header row
 * as <th>, and a cell that will become a numeric cell in the .xlsx marked so
 * it right-aligns the way Excel will show it. Blank cells render as blank.
 */
function tablesToGrid(tables: string[][][]) {
  return tables.map((rows, tableIndex) => {
    const width = Math.max(...rows.map((row) => row.length));
    const [header, ...body] = rows;
    const cells = (row: string[], tag: "th" | "td") =>
      Array.from({ length: width }, (_, column) => {
        const cell = row[column] ?? "";
        const numeric = tag === "td" && isNumericCell(cell);
        return `<${tag}${numeric ? ' class="num"' : ""}>${escapeHtml(cell)}</${tag}>`;
      }).join("");
    const caption = `Sheet ${tableIndex + 1} · ${body.length} ${body.length === 1 ? "row" : "rows"} × ${width} ${width === 1 ? "column" : "columns"}`;
    return `<table class="cell-grid"><caption>${caption}</caption><thead><tr>${cells(header, "th")}</tr></thead><tbody>${body.map((row) => `<tr>${cells(row, "td")}</tr>`).join("")}</tbody></table>`;
  }).join("");
}

const csvCell = (value: unknown) => {
  const text = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const tableToCsv = (rows: string[][]) => rows.map((row) => row.map(csvCell).join(",")).join("\n");

export type StripMarkdownOptions = Pick<ProcessSettings, "keepUrls" | "listMarkers" | "keepCode" | "tidySpacing">;

/**
 * Deterministic find-and-replace over formatting characters only. Every word
 * of the input survives in the same order; the test suite asserts it. The
 * options change what counts as formatting, never what happens to words.
 */
function stripMarkdown(input: string, options: StripMarkdownOptions = {}) {
  const { keepUrls = false, listMarkers = "keep", keepCode = false, tidySpacing = false } = options;
  // Fenced blocks are lifted out first so that nothing below can touch code —
  // a `*` or `_` inside code is code, not emphasis — and put back at the end.
  const fences: string[] = [];
  let output = input.replace(/```[\s\S]*?```/g, (block) => {
    fences.push(keepCode ? block : block.replace(/^```[^\n]*\n?|\n?```$/g, ""));
    return `\u0000${fences.length - 1}\u0000`;
  });
  output = output
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, keepUrls ? "$1 ($2)" : "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*(?:[-*_]\s*){3,}$/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/([*~`])([^]*?)\1/g, "$2")
    // CommonMark allows `*` intraword but not `_`, so underscore emphasis only
    // counts at a word boundary. Without this, snake_case_word, MY_ENV_VAR and
    // file_name.txt lose their underscores and silently become new words.
    .replace(/(?<![\p{L}\p{N}_])_([^]*?)_(?![\p{L}\p{N}_])/gu, "$1")
    // Horizontal whitespace only: `\s*` would swallow the blank line above a list item.
    .replace(/^[ \t]*[-+*][ \t]+/gm, listMarkers === "keep" ? "• " : "")
    .replace(/^[ \t]*(\d+[.)])[ \t]+/gm, listMarkers === "keep" ? "$1 " : "")
    // The alignment row goes with its line break, so header and body stay adjacent.
    .replace(/^\|?[ \t]*:?-{2,}:?[ \t]*(\|[ \t]*:?-{2,}:?[ \t]*)*\|?[ \t]*\n?/gm, "")
    .replace(/^\|(.*)\|$/gm, (_, row: string) => row.split(/(?<!\\)\|/).map((cell) => cell.trim()).join("\t"));
  if (tidySpacing) {
    output = output.replace(/[ \t]{2,}/g, " ").replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n");
  }
  return output.replace(/\u0000(\d+)\u0000/g, (_, index: string) => fences[Number(index)]).trim();
}

/** Word-level diff of a cleanup, so the reader can see that only symbols changed. */
function changesHtml(before: string, after: string) {
  const changes = diffWords(before, after);
  return `<div class="diff-output">${changes.map((change) => {
    const className = change.added ? "diff-added" : change.removed ? "diff-removed" : "diff-unchanged";
    return `<span class="${className}">${escapeHtml(change.value)}</span>`;
  }).join("")}</div>`;
}

function decodeEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function htmlToMarkdown(html: string) {
  const blocks: string[] = [];
  const inline = (value: string, keepLines = false): string =>
    value
      .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${inline(text).trim()}](${href})`)
      .replace(/<img\b[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)")
      .replace(/<img\b[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)")
      .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**")
      .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*")
      .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      // Inline context folds all whitespace; the top-level pass must keep the
      // newlines the block conversions just emitted.
      .replace(keepLines ? /[^\S\n]+/g : /\s+/g, " ");
  let source = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|head)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    // Fenced code first, so nothing inside is treated as markup.
    .replace(/<pre\b[^>]*>(?:\s*<code\b[^>]*>)?([\s\S]*?)(?:<\/code>\s*)?<\/pre>/gi, (_, code) => {
      blocks.push(`\`\`\`\n${decodeEntities(code).replace(/^\n+|\n+$/g, "")}\n\`\`\``);
      return `\n@@block${blocks.length - 1}@@\n`;
    })
    .replace(/<table\b[^>]*>([\s\S]*?)<\/table>/gi, (_, body) => {
      const rows = [...body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((row) =>
        [...row[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((cell) => inline(cell[1]).trim()),
      );
      if (!rows.length) return "";
      const table = [`| ${rows[0].join(" | ")} |`, `| ${rows[0].map(() => "---").join(" | ")} |`, ...rows.slice(1).map((row) => `| ${row.join(" | ")} |`)].join("\n");
      blocks.push(table);
      return `\n@@block${blocks.length - 1}@@\n`;
    });
  source = source
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, text) => `\n${"#".repeat(Number(level))} ${inline(text).trim()}\n`)
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, text) => `\n> ${inline(text).trim()}\n`)
    .replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/gi, (_, list) =>
      `\n${[...list.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((item, index) => `${index + 1}. ${inline(item[1]).trim()}`).join("\n")}\n`)
    .replace(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi, (_, list) =>
      `\n${[...list.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((item) => `- ${inline(item[1]).trim()}`).join("\n")}\n`)
    .replace(/<hr\s*\/?>/gi, "\n---\n")
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, text) => `\n${inline(text).trim()}\n`);
  const markdown = decodeEntities(inline(source, true))
    .replace(/@@block(\d+)@@/g, (_, index) => `\n${blocks[Number(index)]}\n`)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return markdown;
}

const fancyOverlays = /[\u0332-\u0338]/g;
const smallCapsMap: Record<string, string> = {
  "ᴀ": "a", "ʙ": "b", "ᴄ": "c", "ᴅ": "d", "ᴇ": "e", "ꜰ": "f", "ɢ": "g", "ʜ": "h", "ɪ": "i", "ᴊ": "j", "ᴋ": "k", "ʟ": "l",
  "ᴍ": "m", "ɴ": "n", "ᴏ": "o", "ᴘ": "p", "ǫ": "q", "ʀ": "r", "ꜱ": "s", "ᴛ": "t", "ᴜ": "u", "ᴠ": "v", "ᴡ": "w", "ʏ": "y", "ᴢ": "z",
};

const count = (input: string, expression: RegExp) => input.match(expression)?.length ?? 0;

const invisibleExpression = /[\u00ad\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g;

/**
 * Conventional abbreviations for the invisible and problematic characters the
 * viewer labels in place. Every key is a single BMP code unit outside the
 * surrogate range, so a plain character-class replace can never split an astral
 * pair or detach a combining mark.
 */
const invisibleMarkers: Record<string, string> = {
  "\u0009": "TAB",
  "\u00a0": "NBSP",
  "\u00ad": "SHY",
  "\u200b": "ZWSP",
  "\u200c": "ZWNJ",
  "\u200d": "ZWJ",
  "\u200e": "LRM",
  "\u200f": "RLM",
  "\u2028": "LS",
  "\u2029": "PS",
  "\u202a": "LRE",
  "\u202b": "RLE",
  "\u202c": "PDF",
  "\u202d": "LRO",
  "\u202e": "RLO",
  "\u202f": "NNBSP",
  "\u2060": "WJ",
  "\ufeff": "BOM",
};

const markedExpression = /[\u0009\u00a0\u00ad\u200b-\u200f\u2028-\u202f\u2060\ufeff]/g;
const zeroWidthExpression = /[\u200b-\u200d\u2060]/g;

const emojiExpression = /\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?/gu;

/**
 * Maps pseudo-font Unicode (mathematical alphanumerics, small caps, fullwidth)
 * back to plain letters and drops the decorative strikethrough/underline
 * overlays, returning the count both callers report as "Characters converted".
 *
 * Shared by remove-fancy-text and humanize-ai-text. Iterating with the spread
 * operator walks code points, so astral pseudo-font characters are normalized
 * whole and never split into surrogates; normalizing each code point in
 * isolation also means an existing base + combining-mark sequence cannot be
 * composed away.
 */
function normalizeFancyText(input: string) {
  let converted = 0;
  const mapped = [...input]
    .map((char) => {
      const smallCap = smallCapsMap[char];
      if (smallCap) {
        converted += 1;
        return smallCap;
      }
      const normalized = char.normalize("NFKC");
      if (normalized !== char) converted += 1;
      return normalized;
    })
    .join("");
  converted += count(mapped, fancyOverlays);
  return { output: mapped.replace(fancyOverlays, ""), converted };
}

function words(input: string) {
  return input.trim() ? input.trim().split(/\s+/).length : 0;
}

function titleCase(input: string) {
  return input.toLowerCase().replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
}

/**
 * A list item is a marker at the START of a line followed by a space or tab and
 * then a non-space. That anchoring is what keeps ordinary prose safe: "the low
 * - high range" and "see 5. below" sit mid-sentence and never reach the start of
 * a line, while a bare "---" rule or an "*emphasized*" opening has no space
 * after the marker.
 */
const listItemExpression = /^[ \t]*(?:[-*+•‣◦–]|\d+[.)]|\(\d+\))[ \t]+(\S.*)$/;
const sentenceEndExpression = /[.!?:;]["'”’)\]]*$/;
/** Abbreviations whose full stop must not end a sentence when splitting prose. */
const abbreviationExpression = /(?:^|[\s("'])(?:e\.g|i\.e|etc|vs|approx|fig|no|mr|mrs|ms|dr|prof|sr|jr|st)\.$/i;

/**
 * Splits a document into segments a converter can act on without corrupting the
 * parts it must not touch. A fenced code block is one verbatim segment even
 * when it contains blank lines; headings, block quotes, table rows and
 * horizontal rules are verbatim segments of one line each; runs of list items
 * and runs of ordinary prose each collapse into a single segment.
 */
type Segment = { kind: "verbatim" | "list" | "prose"; lines: string[] };

/** Markdown structure that must survive both directions byte-for-byte. */
const structuralLine = (line: string) => /^[ \t]*(?:#{1,6}\s|>|\||(?:-{3,}|\*{3,}|_{3,})[ \t]*$)/.test(line);
const fenceLine = (line: string) => /^[ \t]*(?:```|~~~)/.test(line);

function segmentDocument(input: string): Segment[] {
  const segments: Segment[] = [];
  let current: Segment | null = null;
  let fenced = false;
  const add = (kind: Segment["kind"], line: string) => {
    if (current?.kind === kind && kind !== "verbatim") current.lines.push(line);
    else segments.push((current = { kind, lines: [line] }));
  };
  for (const line of input.replace(/\r\n/g, "\n").split("\n")) {
    if (fenced) {
      current!.lines.push(line);
      if (fenceLine(line)) {
        fenced = false;
        current = null;
      }
      continue;
    }
    if (fenceLine(line)) {
      segments.push((current = { kind: "verbatim", lines: [line] }));
      fenced = true;
      continue;
    }
    if (!line.trim()) {
      current = null;
      continue;
    }
    if (structuralLine(line)) add("verbatim", line);
    else if (listItemExpression.test(line)) add("list", line);
    else add("prose", line);
  }
  return segments;
}

function bulletsToParagraph(input: string) {
  let items = 0;
  const blocks = segmentDocument(input).map((segment) => {
    if (segment.kind === "verbatim") return segment.lines.join("\n");
    if (segment.kind === "prose") return segment.lines.map((line) => line.trim()).join(" ");
    items += segment.lines.length;
    return segment.lines
      .map((line) => line.match(listItemExpression)![1].trim())
      .map((text) => (sentenceEndExpression.test(text) ? text : `${text}.`))
      .join(" ");
  });
  return { output: blocks.join("\n\n"), items };
}

function splitSentences(text: string) {
  const merged: string[] = [];
  for (const part of text.split(/(?<=[.!?]["\u2019\u201d')\]]?)\s+/)) {
    const previous = merged[merged.length - 1];
    if (previous !== undefined && abbreviationExpression.test(previous)) merged[merged.length - 1] = `${previous} ${part}`;
    else merged.push(part);
  }
  return merged.map((part) => part.trim()).filter(Boolean);
}

function paragraphToBullets(input: string) {
  let items = 0;
  const blocks = segmentDocument(input).map((segment) => {
    if (segment.kind !== "prose") return segment.lines.join("\n");
    const sentences = splitSentences(segment.lines.join(" "));
    items += sentences.length;
    return sentences.map((sentence) => `- ${sentence}`).join("\n");
  });
  return { output: blocks.join("\n\n"), items };
}


export function processText(slug: string, input: string, settings: ProcessSettings = {}): ProcessedResult {
  const processor = getProcessorSlug(slug);
  const base = { stats: [{ label: "Words", value: words(input) }] };
  if (!input) return { output: "", html: "", stats: [] };

  if (["markdown-to-word", "markdown-to-pdf", "markdown-to-google-docs", "markdown-viewer"].includes(processor)) {
    const html = renderMarkdown(input);
    return { output: stripMarkdown(input), html, stats: [{ label: "Words", value: words(input) }, { label: "Elements", value: count(html, /<(h\d|p|li|table)\b/g) }] };
  }
  if (processor === "markdown-to-html") {
    const html = renderMarkdown(input);
    return { output: html, html, stats: [{ label: "HTML elements", value: count(html, /<[a-z][^>]*>/g) }] };
  }
  if (processor === "remove-markdown-formatting") {
    const output = stripMarkdown(input, settings);
    return {
      output,
      html: settings.showChanges ? changesHtml(input, output) : undefined,
      stats: [{ label: "Symbols removed", value: Math.max(0, input.length - output.length) }, { label: "Words", value: words(output) }],
    };
  }
  if (processor === "markdown-table-to-excel") {
    const tables = parseMarkdownTables(input);
    if (!tables.length) return { output: "", html: "", stats: [] };
    // Copy gives tab-separated cells, which paste straight into a spreadsheet
    // grid; the download is the same tables as real .xlsx sheets.
    return {
      output: tables.map(tableToTsv).join("\n\n"),
      html: tablesToGrid(tables),
      stats: [
        { label: "Tables found", value: tables.length },
        { label: "Rows", value: tables.reduce((total, rows) => total + rows.length - 1, 0) },
        { label: "Columns", value: Math.max(...tables.map((rows) => rows[0]?.length ?? 0)) },
      ],
    };
  }
  if (processor === "markdown-table-to-csv") {
    const rows = parseMarkdownTable(input);
    return { output: tableToCsv(rows), stats: [{ label: "Rows", value: Math.max(0, rows.length - 1) }, { label: "Columns", value: rows[0]?.length ?? 0 }] };
  }
  if (processor === "word-to-markdown") return { output: input, stats: base.stats };
  if (processor === "html-to-markdown") {
    const output = htmlToMarkdown(input);
    return { output, stats: [{ label: "HTML elements", value: count(input, /<[a-z][^>]*>/gi) }, { label: "Words", value: words(output) }] };
  }
  if (processor === "remove-fancy-text") {
    const { output, converted } = normalizeFancyText(input);
    return { output, stats: [{ label: "Characters converted", value: converted }, { label: "Words", value: words(input) }] };
  }
  if (processor === "remove-em-dashes") {
    const found = count(input, /—/g);
    const replacements: Record<string, string> = { comma: ",", semicolon: ";", hyphen: "-", remove: "" };
    // Settings arrive from share links, so the key can be anything at runtime
    // even though the type says otherwise. Fall back to the documented default
    // rather than splicing the string "undefined" into the user's text.
    const key = settings.dashReplacement ?? "comma";
    const replacement = key in replacements ? replacements[key] : ",";
    let output = input.replaceAll("—", replacement);
    if (replacement) {
      const escaped = replacement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      output = output.replace(new RegExp(`\\s+${escaped}`, "g"), replacement);
    } else {
      output = output.replace(/[ \t]{2,}/g, " ");
    }
    return { output, stats: [{ label: "Em dashes replaced", value: found }] };
  }
  if (processor === "clean-ai-text") {
    const dashes = count(input, /—/g);
    const quotes = count(input, /[“”‘’]/g);
    const hidden = count(input, invisibleExpression);
    const emojis = count(input, emojiExpression);
    const output = input
      .replaceAll("—", ",")
      // Same tidy-up as remove-em-dashes' default: drop the space the dash left,
      // otherwise " — " becomes " ," and every clause gains a stray space.
      .replace(/\s+,/g, ",")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(invisibleExpression, "")
      // Converted, never deleted: removing a no-break space joins two words.
      .replace(/[\u00a0\u202f]/g, " ")
      .replace(emojiExpression, "")
      .replace(/[ \t]{2,}/g, " ");
    const cleaned = settings.stripMarkdown ? stripMarkdown(output) : output;
    return {
      output: cleaned,
      html: settings.showChanges ? changesHtml(input, cleaned) : undefined,
      stats: [{ label: "Em dashes", value: dashes }, { label: "Smart quotes", value: quotes }, { label: "Hidden characters", value: hidden }, { label: "Emojis", value: emojis }],
    };
  }
  if (processor === "humanize-ai-text") {
    // The full mechanical-formatting pass: a superset of clean-ai-text that also
    // folds pseudo-font Unicode, no-break spaces, and stray horizontal
    // whitespace. Nothing here touches words, order, or meaning.
    const { output: plain, converted } = normalizeFancyText(input);
    // Counted on the post-fancy string rather than the raw input because that is
    // what the later stages actually remove: NFKC turns a handful of pictographs
    // (™, ℹ) into letters, so counting them as emoji on the input would report a
    // removal that never happens.
    const dashes = count(plain, /—/g);
    const quotes = count(plain, /[“”‘’]/g);
    const hidden = count(plain, invisibleExpression);
    const emojis = count(plain, emojiExpression);
    const output = plain
      .replaceAll("—", ",")
      // Same tidy-up as remove-em-dashes' default: drop the space the dash left.
      .replace(/\s+,/g, ",")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(invisibleExpression, "")
      // NFKC already folds no-break spaces; this explicit pass covers input
      // that reached the tool with no pseudo-font characters to normalize.
      .replace(/[\u00a0\u202f]/g, " ")
      .replace(emojiExpression, "")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/[ \t]+$/gm, "");
    return {
      output,
      stats: [
        { label: "Em dashes", value: dashes },
        { label: "Smart quotes", value: quotes },
        { label: "Hidden characters", value: hidden },
        { label: "Emojis", value: emojis },
        { label: "Characters converted", value: converted },
      ],
    };
  }
  if (processor === "remove-invisible-characters") {
    const hidden = count(input, invisibleExpression);
    return { output: input.replace(invisibleExpression, ""), stats: [{ label: "Hidden characters found", value: hidden }, { label: "Zero-width", value: count(input, /[\u200b-\u200f\u2060]/g) }, { label: "Soft hyphens", value: count(input, /\u00ad/g) }] };
  }
  if (processor === "show-invisible-characters") {
    // Diagnostic sibling of remove-invisible-characters: nothing is deleted, so
    // every marker is an insertion and the surrounding text is byte-identical.
    const output = input.replace(markedExpression, (char) => `[${invisibleMarkers[char]}]`);
    return {
      output,
      stats: [
        { label: "Hidden characters found", value: count(input, markedExpression) },
        { label: "Zero-width", value: count(input, zeroWidthExpression) },
        { label: "Soft hyphens", value: count(input, /\u00ad/g) },
        { label: "Characters", value: input.length },
      ],
    };
  }
  if (processor === "remove-smart-quotes") {
    const fixed = count(input, /[“”‘’]/g);
    return { output: input.replace(/[“”]/g, '"').replace(/[‘’]/g, "'"), stats: [{ label: "Quotes fixed", value: fixed }] };
  }
  if (processor === "remove-emojis") {
    const removed = count(input, emojiExpression);
    return { output: input.replace(emojiExpression, "").replace(/[ \t]{2,}/g, " "), stats: [{ label: "Emojis removed", value: removed }] };
  }
  if (processor === "remove-line-breaks") {
    const breaks = count(input, /(?<!\n)\n(?!\n)/g);
    return { output: input.replace(/(?<!\n)\n(?!\n)/g, " ").replace(/\n{3,}/g, "\n\n"), stats: [{ label: "Line breaks fixed", value: breaks }] };
  }
  if (processor === "chatgpt-conversation-to-document") {
    const messages = count(input, /^(You|User|ChatGPT|Assistant):/gim);
    return { output: input.replace(/^(You|User):/gim, "## You\n").replace(/^(ChatGPT|Assistant):/gim, "## Assistant\n"), stats: [{ label: "Messages formatted", value: messages }] };
  }
  if (processor === "token-counter") {
    const tokens = Math.ceil(input.length / 4);
    return { output: `~${tokens.toLocaleString()} estimated tokens`, stats: [{ label: "Estimated tokens", value: tokens }, { label: "Words", value: words(input) }, { label: "Characters", value: input.length }] };
  }
  if (processor === "text-splitter") {
    const chunks = input.match(/[\s\S]{1,2000}(?:\s|$)/g)?.map((chunk) => chunk.trim()).filter(Boolean) ?? [input];
    return { output: chunks.map((chunk, index) => `--- Chunk ${index + 1} ---\n${chunk}`).join("\n\n"), stats: [{ label: "Chunks produced", value: chunks.length }, ...base.stats] };
  }
  if (processor === "text-diff") {
    const [before = "", after = ""] = input.split(/\n---\n/);
    const changes = diffWords(before, after);
    const additions = changes.filter((change) => change.added).reduce((total, change) => total + words(change.value), 0);
    const deletions = changes.filter((change) => change.removed).reduce((total, change) => total + words(change.value), 0);
    const html = changesHtml(before, after);
    return { output: after, html, stats: [{ label: "Additions", value: additions }, { label: "Deletions", value: deletions }] };
  }
  if (processor === "json-formatter") {
    try {
      const output = JSON.stringify(JSON.parse(input), null, 2);
      return { output, valid: true, stats: [{ label: "Status", value: "Valid JSON" }, { label: "Lines", value: output.split("\n").length }] };
    } catch (error) {
      return { output: error instanceof Error ? error.message : "Invalid JSON", valid: false, stats: [{ label: "Status", value: "Invalid JSON" }] };
    }
  }
  if (processor === "json-to-csv") {
    try {
      const parsed = JSON.parse(input);
      const records = Array.isArray(parsed) ? parsed : [parsed];
      const columns = [...new Set(records.flatMap((record) => Object.keys(record)))];
      const output = [columns.join(","), ...records.map((record) => columns.map((column) => csvCell(record[column])).join(","))].join("\n");
      return { output, valid: true, stats: [{ label: "Rows", value: records.length }, { label: "Columns", value: columns.length }] };
    } catch {
      return { output: "Invalid JSON", valid: false, stats: [{ label: "Status", value: "Invalid JSON" }] };
    }
  }
  if (processor === "csv-to-markdown-table") {
    const rows = input.trim().split(/\r?\n/).map((line) => line.split(",").map((cell) => cell.trim()));
    const output = rows.length ? [`| ${rows[0].join(" | ")} |`, `| ${rows[0].map(() => "---").join(" | ")} |`, ...rows.slice(1).map((row) => `| ${row.join(" | ")} |`)].join("\n") : "";
    return { output, stats: [{ label: "Rows", value: Math.max(0, rows.length - 1) }, { label: "Columns", value: rows[0]?.length ?? 0 }] };
  }
  if (processor === "extract-table-from-text") {
    const rows = input
      .split(/\r?\n/)
      .filter((line) => line.includes("|") || line.includes("\t"))
      .map((line) => line.split(line.includes("|") ? "|" : "\t").map((cell) => cell.trim()).filter(Boolean))
      // A Markdown alignment row (`| --- | ---: |`) is table syntax, not data.
      .filter((cells) => !(cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell))));
    return { output: tableToCsv(rows), stats: [{ label: "Tables found", value: rows.length > 1 ? 1 : 0 }, { label: "Rows", value: rows.length }] };
  }
  if (processor === "word-counter") {
    return { output: input, stats: [{ label: "Words", value: words(input) }, { label: "Characters", value: input.length.toLocaleString() }, { label: "Sentences", value: count(input, /[.!?]+(?:\s|$)/g) }, { label: "Reading time", value: `${Math.max(1, Math.ceil(words(input) / 220))} min` }] };
  }
  if (processor === "case-converter") {
    const mode = settings.caseMode ?? "title";
    const output = mode === "upper"
      ? input.toUpperCase()
      : mode === "lower"
        ? input.toLowerCase()
        : mode === "sentence"
          ? input.toLowerCase().replace(/(^|[.!?]\s+)\p{L}/gu, (match) => match.toUpperCase())
          : titleCase(input);
    return { output, stats: [{ label: "Characters converted", value: input.length }] };
  }
  if (processor === "bullet-points-to-paragraph") {
    const toBullets = settings.listDirection === "bullets";
    const { output, items } = toBullets ? paragraphToBullets(input) : bulletsToParagraph(input);
    return {
      output,
      stats: [
        { label: "Elements", value: items },
        { label: "Sentences", value: count(output, /[.!?]+(?:\s|$)/g) },
        { label: "Words", value: words(output) },
      ],
    };
  }
  if (processor === "latex-to-word") {
    const output = input.replace(/^\s*(?:\\\[|\$\$)|(?:\\\]|\$\$)\s*$/gm, "").replaceAll("\\dfrac", "\\frac").trim();
    return { output, stats: [{ label: "Equations converted", value: Math.max(1, count(input, /\$\$|\\\[/g)) }] };
  }
  return { output: input, stats: base.stats };
}
