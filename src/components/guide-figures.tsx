import type { ReactNode } from "react";
import type { GuideFigureKey } from "@/lib/guides";

/**
 * Static inline SVG. No client JS, no raster assets, and every colour comes
 * from the theme tokens in globals.css so the figures follow the OS dark mode.
 */

function Frame({ caption, height, children }: { caption: string; height: number; children: ReactNode }) {
  return (
    <figure className="guide-figure">
      <svg viewBox={`0 0 720 ${height}`} role="img" aria-label={caption} xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Panel({ x, y, width, height, tone = "surface" }: { x: number; y: number; width: number; height: number; tone?: "surface" | "alt" | "accent" }) {
  const className = tone === "alt" ? "fig-panel-alt" : tone === "accent" ? "fig-panel-accent" : "fig-panel";
  return <rect x={x} y={y} width={width} height={height} rx={10} className={className} />;
}

function ArrowDown({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y} v18 m-7 -7 l7 7 l7 -7`} className="fig-arrow" fill="none" />;
}

function ArrowRight({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y} h26 m-8 -7 l8 7 l-8 7`} className="fig-arrow" fill="none" />;
}

function EmDashBeforeAfter() {
  return (
    <Frame caption="An em dash pattern typical of AI drafts, and the same sentence rewritten with commas." height={228}>
      <text x={0} y={14} className="fig-eyebrow">AI DRAFT</text>
      <Panel x={0} y={26} width={720} height={62} />
      <text x={20} y={64} className="fig-mono">
        The results
        <tspan className="fig-mark"> — </tspan>
        which surprised us
        <tspan className="fig-mark"> — </tspan>
        were clear.
      </text>
      <ArrowDown x={360} y={100} />
      <text x={0} y={158} className="fig-eyebrow">AFTER CLEANUP</text>
      <Panel x={0} y={170} width={720} height={58} tone="accent" />
      <text x={20} y={206} className="fig-mono">
        The results
        <tspan className="fig-accent">,</tspan>
        {" "}which surprised us
        <tspan className="fig-accent">,</tspan>
        {" "}were clear.
      </text>
    </Frame>
  );
}

function AiTellsPanel() {
  const tells = [
    { n: 1, y: 62, text: "Delve into the multifaceted landscape" },
    { n: 2, y: 104, text: "It's not just X — it's Y" },
    { n: 3, y: 146, text: "“Smart quotes” and … ellipses" },
    { n: 4, y: 188, text: "✅ Emoji-headed bullet lists" },
  ];
  return (
    <Frame caption="Four mechanical patterns that commonly survive a copy-paste from an AI chat." height={226}>
      <text x={0} y={14} className="fig-eyebrow">COMMON TELLS</text>
      {tells.map((tell) => (
        <g key={tell.n}>
          <Panel x={0} y={tell.y - 30} width={720} height={36} tone="alt" />
          <circle cx={22} cy={tell.y - 12} r={11} className="fig-badge" />
          <text x={22} y={tell.y - 8} className="fig-badge-text" textAnchor="middle">{tell.n}</text>
          <text x={46} y={tell.y - 7} className="fig-mono">{tell.text}</text>
        </g>
      ))}
    </Frame>
  );
}

function HiddenCharacters() {
  return (
    <Frame caption="A zero-width space is invisible on screen but still present in the underlying text." height={210}>
      <text x={0} y={14} className="fig-eyebrow">WHAT YOU SEE</text>
      <Panel x={0} y={26} width={720} height={58} />
      <text x={20} y={62} className="fig-mono">quarterly report</text>
      <ArrowDown x={360} y={96} />
      <text x={0} y={148} className="fig-eyebrow">WHAT IS ACTUALLY STORED</text>
      <Panel x={0} y={160} width={720} height={50} tone="alt" />
      <text x={20} y={191} className="fig-mono">
        quarterly
        <tspan className="fig-mark">[U+200B]</tspan>
        report
      </text>
    </Frame>
  );
}

function MarkdownInWord() {
  return (
    <Frame caption="The same response pasted as raw Markdown, and converted so the structure survives." height={250}>
      <text x={0} y={14} className="fig-eyebrow">PASTED AS PLAIN TEXT</text>
      <Panel x={0} y={26} width={344} height={140} />
      <text x={18} y={58} className="fig-mono fig-small"><tspan className="fig-mark">## </tspan>Quarterly summary</text>
      <text x={18} y={86} className="fig-mono fig-small"><tspan className="fig-mark">**</tspan>Revenue<tspan className="fig-mark">**</tspan> rose 12%.</text>
      <text x={18} y={114} className="fig-mono fig-small"><tspan className="fig-mark">- </tspan>Europe led growth</text>
      <text x={18} y={142} className="fig-mono fig-small"><tspan className="fig-mark">- </tspan>Asia held flat</text>
      <ArrowRight x={356} y={96} />
      <text x={412} y={14} className="fig-eyebrow">CONVERTED</text>
      <Panel x={412} y={26} width={308} height={140} tone="accent" />
      <text x={430} y={60} className="fig-heading">Quarterly summary</text>
      <text x={430} y={88} className="fig-body"><tspan className="fig-bold">Revenue</tspan> rose 12%.</text>
      <circle cx={436} cy={110} r={3} className="fig-bullet" />
      <text x={448} y={114} className="fig-body">Europe led growth</text>
      <circle cx={436} cy={134} r={3} className="fig-bullet" />
      <text x={448} y={138} className="fig-body">Asia held flat</text>
      <text x={0} y={200} className="fig-note">Word has no Markdown parser, so the symbols are treated as ordinary characters.</text>
      <text x={0} y={226} className="fig-note">Converting first turns them into real headings, bold runs, and list items.</text>
    </Frame>
  );
}

function TableToGrid() {
  const rows = [
    ["Region", "Q1", "Q2"],
    ["Europe", "412", "486"],
    ["Asia", "377", "381"],
  ];
  return (
    <Frame caption="A pipe table is plain text until it is parsed into real spreadsheet cells." height={232}>
      <text x={0} y={14} className="fig-eyebrow">MARKDOWN</text>
      <Panel x={0} y={26} width={330} height={132} />
      <text x={16} y={54} className="fig-mono fig-small">| Region | Q1 | Q2 |</text>
      <text x={16} y={78} className="fig-mono fig-small fig-dim">| --- | ---: | ---: |</text>
      <text x={16} y={102} className="fig-mono fig-small">| Europe | 412 | 486 |</text>
      <text x={16} y={126} className="fig-mono fig-small">| Asia | 377 | 381 |</text>
      <ArrowRight x={344} y={92} />
      <text x={400} y={14} className="fig-eyebrow">SPREADSHEET</text>
      {rows.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          const x = 400 + columnIndex * 106;
          const y = 26 + rowIndex * 40;
          return (
            <g key={`${rowIndex}-${columnIndex}`}>
              <rect x={x} y={y} width={106} height={40} className={rowIndex === 0 ? "fig-cell-head" : "fig-cell"} />
              <text x={x + 14} y={y + 25} className={rowIndex === 0 ? "fig-body fig-bold" : "fig-body"}>{cell}</text>
            </g>
          );
        }),
      )}
      <text x={0} y={200} className="fig-note">Pasting the raw table drops every value into a single column.</text>
      <text x={0} y={224} className="fig-note">Converting to XLSX or CSV keeps the rows and columns intact.</text>
    </Frame>
  );
}

function TranscriptToDoc() {
  return (
    <Frame caption="A copied chat transcript restructured into a document with labelled speakers." height={230}>
      <text x={0} y={14} className="fig-eyebrow">COPIED TRANSCRIPT</text>
      <Panel x={0} y={26} width={330} height={150} tone="alt" />
      <rect x={16} y={42} width={196} height={30} rx={9} className="fig-bubble-user" />
      <text x={28} y={62} className="fig-body fig-small">Summarize this report</text>
      <rect x={60} y={82} width={254} height={30} rx={9} className="fig-bubble-ai" />
      <text x={72} y={102} className="fig-body fig-small">Here is a concise summary…</text>
      <rect x={16} y={122} width={166} height={30} rx={9} className="fig-bubble-user" />
      <text x={28} y={142} className="fig-body fig-small">Add the numbers</text>
      <ArrowRight x={344} y={95} />
      <text x={400} y={14} className="fig-eyebrow">DOCUMENT</text>
      <Panel x={400} y={26} width={320} height={150} />
      <text x={418} y={54} className="fig-heading fig-small">Conversation export</text>
      <text x={418} y={82} className="fig-body fig-small fig-bold">You</text>
      <text x={418} y={102} className="fig-body fig-small">Summarize this report</text>
      <text x={418} y={130} className="fig-body fig-small fig-bold">Assistant</text>
      <text x={418} y={150} className="fig-body fig-small">Here is a concise summary…</text>
      <text x={0} y={212} className="fig-note">Speaker turns become headings, so the export stays readable outside the chat window.</text>
    </Frame>
  );
}

function SmartQuotesCode() {
  return (
    <Frame caption="Curly quotation marks are different characters from the straight quotes parsers expect." height={244}>
      <text x={0} y={14} className="fig-eyebrow">PASTED FROM CHAT</text>
      <Panel x={0} y={26} width={720} height={58} />
      <text x={20} y={62} className="fig-mono">
        {"{ "}
        <tspan className="fig-mark">{"“"}</tspan>
        name
        <tspan className="fig-mark">{"”"}</tspan>
        {": "}
        <tspan className="fig-mark">{"“"}</tspan>
        Ada
        <tspan className="fig-mark">{"”"}</tspan>
        {" }"}
      </text>
      <text x={0} y={110} className="fig-error">SyntaxError: Unexpected token &apos;“&apos;</text>
      <ArrowDown x={360} y={126} />
      <text x={0} y={184} className="fig-eyebrow">AFTER NORMALIZING</text>
      <Panel x={0} y={196} width={720} height={48} tone="accent" />
      <text x={20} y={226} className="fig-mono">
        {"{ "}
        <tspan className="fig-accent">&quot;</tspan>
        name
        <tspan className="fig-accent">&quot;</tspan>
        {": "}
        <tspan className="fig-accent">&quot;</tspan>
        Ada
        <tspan className="fig-accent">&quot;</tspan>
        {" }"}
      </text>
    </Frame>
  );
}

function DashRuler() {
  const dashes = [
    { glyph: "-", width: 26, name: "Hyphen", code: "U+002D", use: "Compound words: well-known" },
    { glyph: "–", width: 52, name: "En dash", code: "U+2013", use: "Ranges: 2020–2024" },
    { glyph: "—", width: 104, name: "Em dash", code: "U+2014", use: "Breaks in a sentence" },
  ];
  return (
    <Frame caption="Hyphen, en dash, and em dash at the same type size, with their standard uses." height={250}>
      {dashes.map((dash, index) => {
        const y = 24 + index * 74;
        return (
          <g key={dash.code}>
            <Panel x={0} y={y} width={720} height={62} tone={index === 2 ? "accent" : "alt"} />
            <text x={22} y={y + 42} className="fig-glyph">{dash.glyph}</text>
            <rect x={64} y={y + 28} width={dash.width} height={5} rx={2.5} className="fig-rule" />
            <text x={190} y={y + 28} className="fig-body fig-bold">{dash.name}</text>
            <text x={190} y={y + 48} className="fig-note">{dash.code}</text>
            <text x={330} y={y + 40} className="fig-body">{dash.use}</text>
          </g>
        );
      })}
    </Frame>
  );
}

function TokenChunks() {
  const tokens = ["Un", "believ", "able", " results", " for", " the", " quarter"];
  let cursor = 0;
  return (
    <Frame caption="Tokens are sub-word fragments, so character count and token count rarely match." height={198}>
      <text x={0} y={14} className="fig-eyebrow">ONE SENTENCE, SEVEN TOKENS</text>
      {tokens.map((token, index) => {
        const width = Math.max(52, token.length * 11 + 22);
        const x = cursor;
        cursor += width + 8;
        return (
          <g key={index}>
            <rect x={x} y={30} width={width} height={48} rx={9} className={index % 2 === 0 ? "fig-token" : "fig-token-alt"} />
            <text x={x + width / 2} y={60} className="fig-mono fig-small" textAnchor="middle">{token.trim() || "·"}</text>
          </g>
        );
      })}
      <text x={0} y={118} className="fig-note">37 characters · 7 tokens · roughly 5.3 characters per token</text>
      <Panel x={0} y={134} width={720} height={64} tone="alt" />
      <text x={20} y={162} className="fig-body">A rough English rule of thumb: 1 token ≈ 4 characters ≈ 0.75 words.</text>
      <text x={20} y={186} className="fig-note">Code, non-English scripts, and rare words all use more tokens per character.</text>
    </Frame>
  );
}

const figures: Record<GuideFigureKey, () => ReactNode> = {
  "dash-widths": EmDashBeforeAfter,
  "ai-tells-panel": AiTellsPanel,
  "hidden-characters": HiddenCharacters,
  "markdown-in-word": MarkdownInWord,
  "table-to-grid": TableToGrid,
  "transcript-to-doc": TranscriptToDoc,
  "smart-quotes-code": SmartQuotesCode,
  "dash-ruler": DashRuler,
  "token-chunks": TokenChunks,
};

export function GuideFigure({ figure }: { figure: GuideFigureKey }) {
  const Component = figures[figure];
  return Component ? <Component /> : null;
}
