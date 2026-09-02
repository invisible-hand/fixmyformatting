import type { ReactNode } from "react";
import type { GuideFigureKey } from "@/lib/guides";
import type { FigureCopy, FigureText } from "@/lib/i18n/types";

/**
 * Static inline SVG. No client JS, no raster assets, and every colour comes
 * from the theme tokens in globals.css so the figures follow the OS dark mode.
 */

/**
 * Figures never mirror. Each depicts a left-to-right transformation of Latin
 * Markdown, JSON or code samples that stay English, so flipping the layout for
 * Arabic would put the source on the right with the arrow pointing back into
 * it. Translated prose lives outside the SVG and mirrors for free.
 */
function Frame({ text, height, children }: { text: FigureText; height: number; children: ReactNode }) {
  return (
    <figure className="guide-figure">
      <svg viewBox={`0 0 720 ${height}`} role="img" aria-label={text.caption} xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
      <figcaption>{text.caption}</figcaption>
      {text.notes.map((note) => <p className="fig-note-block" key={note}>{note}</p>)}
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

function EmDashBeforeAfter({ t }: { t: FigureText }) {
  return (
    <Frame text={t} height={228}>
      <text x={0} y={14} className="fig-eyebrow">{t.labels.before}</text>
      <Panel x={0} y={26} width={720} height={62} />
      <text x={20} y={64} className="fig-mono">
        The results
        <tspan className="fig-mark"> — </tspan>
        which surprised us
        <tspan className="fig-mark"> — </tspan>
        were clear.
      </text>
      <ArrowDown x={360} y={100} />
      <text x={0} y={158} className="fig-eyebrow">{t.labels.after}</text>
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

function AiTellsPanel({ t }: { t: FigureText }) {
  const tells = [
    { n: 1, y: 62, text: "Delve into the multifaceted landscape" },
    { n: 2, y: 104, text: "It's not just X — it's Y" },
    { n: 3, y: 146, text: "“Smart quotes” and … ellipses" },
    { n: 4, y: 188, text: "✅ Emoji-headed bullet lists" },
  ];
  return (
    <Frame text={t} height={226}>
      <text x={0} y={14} className="fig-eyebrow">{t.labels.eyebrow}</text>
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

function HiddenCharacters({ t }: { t: FigureText }) {
  return (
    <Frame text={t} height={210}>
      <text x={0} y={14} className="fig-eyebrow">{t.labels.before}</text>
      <Panel x={0} y={26} width={720} height={58} />
      <text x={20} y={62} className="fig-mono">quarterly report</text>
      <ArrowDown x={360} y={96} />
      <text x={0} y={148} className="fig-eyebrow">{t.labels.after}</text>
      <Panel x={0} y={160} width={720} height={50} tone="alt" />
      <text x={20} y={191} className="fig-mono">
        quarterly
        <tspan className="fig-mark">[U+200B]</tspan>
        report
      </text>
    </Frame>
  );
}

function MarkdownInWord({ t }: { t: FigureText }) {
  return (
    <Frame text={t} height={176}>
      <text x={0} y={14} className="fig-eyebrow">{t.labels.before}</text>
      <Panel x={0} y={26} width={344} height={140} />
      <text x={18} y={58} className="fig-mono fig-small"><tspan className="fig-mark">## </tspan>Quarterly summary</text>
      <text x={18} y={86} className="fig-mono fig-small"><tspan className="fig-mark">**</tspan>Revenue<tspan className="fig-mark">**</tspan> rose 12%.</text>
      <text x={18} y={114} className="fig-mono fig-small"><tspan className="fig-mark">- </tspan>Europe led growth</text>
      <text x={18} y={142} className="fig-mono fig-small"><tspan className="fig-mark">- </tspan>Asia held flat</text>
      <ArrowRight x={356} y={96} />
      <text x={412} y={14} className="fig-eyebrow">{t.labels.after}</text>
      <Panel x={412} y={26} width={308} height={140} tone="accent" />
      <text x={430} y={60} className="fig-heading">Quarterly summary</text>
      <text x={430} y={88} className="fig-body"><tspan className="fig-bold">Revenue</tspan> rose 12%.</text>
      <circle cx={436} cy={110} r={3} className="fig-bullet" />
      <text x={448} y={114} className="fig-body">Europe led growth</text>
      <circle cx={436} cy={134} r={3} className="fig-bullet" />
      <text x={448} y={138} className="fig-body">Asia held flat</text>
    </Frame>
  );
}

function TableToGrid({ t }: { t: FigureText }) {
  const rows = [
    ["Region", "Q1", "Q2"],
    ["Europe", "412", "486"],
    ["Asia", "377", "381"],
  ];
  return (
    <Frame text={t} height={166}>
      <text x={0} y={14} className="fig-eyebrow">{t.labels.before}</text>
      <Panel x={0} y={26} width={330} height={132} />
      <text x={16} y={54} className="fig-mono fig-small">| Region | Q1 | Q2 |</text>
      <text x={16} y={78} className="fig-mono fig-small fig-dim">| --- | ---: | ---: |</text>
      <text x={16} y={102} className="fig-mono fig-small">| Europe | 412 | 486 |</text>
      <text x={16} y={126} className="fig-mono fig-small">| Asia | 377 | 381 |</text>
      <ArrowRight x={344} y={92} />
      <text x={400} y={14} className="fig-eyebrow">{t.labels.after}</text>
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
    </Frame>
  );
}

function TranscriptToDoc({ t }: { t: FigureText }) {
  return (
    <Frame text={t} height={184}>
      <text x={0} y={14} className="fig-eyebrow">{t.labels.before}</text>
      <Panel x={0} y={26} width={330} height={150} tone="alt" />
      <rect x={16} y={42} width={196} height={30} rx={9} className="fig-bubble-user" />
      <text x={28} y={62} className="fig-body fig-small">{t.labels.ask}</text>
      <rect x={60} y={82} width={254} height={30} rx={9} className="fig-bubble-ai" />
      <text x={72} y={102} className="fig-body fig-small">{t.labels.reply}</text>
      <rect x={16} y={122} width={166} height={30} rx={9} className="fig-bubble-user" />
      <text x={28} y={142} className="fig-body fig-small">{t.labels.followUp}</text>
      <ArrowRight x={344} y={95} />
      <text x={400} y={14} className="fig-eyebrow">{t.labels.after}</text>
      <Panel x={400} y={26} width={320} height={150} />
      <text x={418} y={54} className="fig-heading fig-small">{t.labels.title}</text>
      <text x={418} y={82} className="fig-body fig-small fig-bold">{t.labels.you}</text>
      <text x={418} y={102} className="fig-body fig-small">{t.labels.ask}</text>
      <text x={418} y={130} className="fig-body fig-small fig-bold">{t.labels.assistant}</text>
      <text x={418} y={150} className="fig-body fig-small">{t.labels.reply}</text>
    </Frame>
  );
}

function SmartQuotesCode({ t }: { t: FigureText }) {
  return (
    <Frame text={t} height={244}>
      <text x={0} y={14} className="fig-eyebrow">{t.labels.before}</text>
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
      <text x={0} y={184} className="fig-eyebrow">{t.labels.after}</text>
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

function DashRuler({ t }: { t: FigureText }) {
  const dashes = [
    { glyph: "-", width: 26, name: t.labels.hyphenName, code: "U+002D", use: t.labels.hyphenUse },
    { glyph: "–", width: 52, name: t.labels.enName, code: "U+2013", use: t.labels.enUse },
    { glyph: "—", width: 104, name: t.labels.emName, code: "U+2014", use: t.labels.emUse },
  ];
  return (
    <Frame text={t} height={176}>
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

function TokenChunks({ t }: { t: FigureText }) {
  // Verified against gpt-tokenizer's gpt-4o model: encode("Unbelievable results for
  // the quarter") is exactly these seven tokens. Do not adjust by eye.
  const tokens = ["Un", "bel", "ievable", " results", " for", " the", " quarter"];
  let cursor = 0;
  return (
    <Frame text={t} height={92}>
      <text x={0} y={14} className="fig-eyebrow">{t.labels.eyebrow}</text>
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
    </Frame>
  );
}

const figures: Record<GuideFigureKey, (props: { t: FigureText }) => ReactNode> = {
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

export function GuideFigure({ figure, copy }: { figure: GuideFigureKey; copy: FigureCopy }) {
  const Component = figures[figure];
  const text = copy[figure];
  return text ? <Component t={text} /> : null;
}
