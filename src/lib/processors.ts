import { getProcessorSlug } from "./tools";

export type ProcessedResult = {
  output: string;
  html?: string;
  stats: { label: string; value: string | number }[];
  valid?: boolean;
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

function parseMarkdownRow(row: string) {
  return row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

function parseMarkdownTable(input: string) {
  const lines = input.split(/\r?\n/);
  const start = lines.findIndex((line, index) => line.includes("|") && /^\|?[\s:|-]+\|?$/.test(lines[index + 1]?.trim() ?? ""));
  if (start < 0) return [] as string[][];
  return [parseMarkdownRow(lines[start]), ...lines.slice(start + 2).filter((line) => line.includes("|")).map(parseMarkdownRow)];
}

const csvCell = (value: unknown) => {
  const text = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const tableToCsv = (rows: string[][]) => rows.map((row) => row.map(csvCell).join(",")).join("\n");

function stripMarkdown(input: string) {
  return input
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/^```\w*\n?|\n?```$/g, ""))
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/([*_~`])([^]*?)\1/g, "$2")
    .replace(/^\s*[-+*]\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, "")
    .trim();
}

const count = (input: string, expression: RegExp) => input.match(expression)?.length ?? 0;
const invisibleExpression = /[\u00ad\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g;
const emojiExpression = /\p{Extended_Pictographic}(?:\uFE0F|\p{Emoji_Modifier})?/gu;

function words(input: string) {
  return input.trim() ? input.trim().split(/\s+/).length : 0;
}

function titleCase(input: string) {
  return input.toLowerCase().replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
}

export function processText(slug: string, input: string): ProcessedResult {
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
    const output = stripMarkdown(input);
    return { output, stats: [{ label: "Symbols removed", value: Math.max(0, input.length - output.length) }] };
  }
  if (["markdown-table-to-excel", "markdown-table-to-csv"].includes(processor)) {
    const rows = parseMarkdownTable(input);
    return { output: tableToCsv(rows), stats: [{ label: "Rows", value: Math.max(0, rows.length - 1) }, { label: "Columns", value: rows[0]?.length ?? 0 }] };
  }
  if (processor === "word-to-markdown") return { output: input, stats: base.stats };
  if (processor === "remove-em-dashes") {
    const found = count(input, /—/g);
    return { output: input.replaceAll("—", ",").replace(/\s+,/g, ","), stats: [{ label: "Em dashes replaced", value: found }] };
  }
  if (processor === "clean-ai-text") {
    const dashes = count(input, /—/g);
    const quotes = count(input, /[“”‘’]/g);
    const hidden = count(input, invisibleExpression);
    const emojis = count(input, emojiExpression);
    const output = input
      .replaceAll("—", ",")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(invisibleExpression, "")
      .replace(emojiExpression, "")
      .replace(/[ \t]{2,}/g, " ");
    return { output, stats: [{ label: "Em dashes", value: dashes }, { label: "Smart quotes", value: quotes }, { label: "Hidden characters", value: hidden }, { label: "Emojis", value: emojis }] };
  }
  if (processor === "remove-invisible-characters") {
    const hidden = count(input, invisibleExpression);
    return { output: input.replace(invisibleExpression, ""), stats: [{ label: "Hidden characters found", value: hidden }, { label: "Zero-width", value: count(input, /[\u200b-\u200f\u2060]/g) }, { label: "Soft hyphens", value: count(input, /\u00ad/g) }] };
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
    return { output: input, stats: [{ label: "Estimated tokens", value: tokens.toLocaleString() }, { label: "Words", value: words(input) }, { label: "Characters", value: input.length.toLocaleString() }, { label: "Est. input cost", value: `$${((tokens / 1_000_000) * 2.5).toFixed(4)}` }] };
  }
  if (processor === "text-splitter") {
    const chunks = input.match(/[\s\S]{1,2000}(?:\s|$)/g)?.map((chunk) => chunk.trim()).filter(Boolean) ?? [input];
    return { output: chunks.map((chunk, index) => `--- Chunk ${index + 1} ---\n${chunk}`).join("\n\n"), stats: [{ label: "Chunks produced", value: chunks.length }, ...base.stats] };
  }
  if (processor === "text-diff") {
    const [before = "", after = ""] = input.split(/\n---\n/);
    const beforeWords = new Set(before.split(/\s+/));
    const afterWords = new Set(after.split(/\s+/));
    return { output: after, stats: [{ label: "Additions", value: [...afterWords].filter((word) => !beforeWords.has(word)).length }, { label: "Deletions", value: [...beforeWords].filter((word) => !afterWords.has(word)).length }] };
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
    const rows = input.split(/\r?\n/).filter((line) => line.includes("|") || line.includes("\t")).map((line) => line.split(line.includes("|") ? "|" : "\t").map((cell) => cell.trim()).filter(Boolean));
    return { output: tableToCsv(rows), stats: [{ label: "Tables found", value: rows.length > 1 ? 1 : 0 }, { label: "Rows", value: rows.length }] };
  }
  if (processor === "word-counter") {
    return { output: input, stats: [{ label: "Words", value: words(input) }, { label: "Characters", value: input.length.toLocaleString() }, { label: "Sentences", value: count(input, /[.!?]+(?:\s|$)/g) }, { label: "Reading time", value: `${Math.max(1, Math.ceil(words(input) / 220))} min` }] };
  }
  if (processor === "case-converter") return { output: titleCase(input), stats: [{ label: "Characters converted", value: input.length }] };
  if (processor === "latex-to-word") {
    const output = input.replace(/^\s*(?:\\\[|\$\$)|(?:\\\]|\$\$)\s*$/gm, "").replaceAll("\\dfrac", "\\frac").trim();
    return { output, stats: [{ label: "Equations converted", value: Math.max(1, count(input, /\$\$|\\\[/g)) }] };
  }
  return { output: input, stats: base.stats };
}
