"use client";

import { useEffect, useState } from "react";
import { copyText } from "@/lib/clipboard";

export type QuickCopyItem = { char: string; name: string; use: string };

export type QuickCopyBlock = {
  label: string;
  answer: string;
  lead: QuickCopyItem & { button: string };
  others: QuickCopyItem[];
  copy: string;
};

/** Plain strings passed in by the server component, so no translation module enters the client bundle. */
export type QuickCopyMessages = { copied: string; status: string };

const codePoint = (char: string) => `U+${char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`;

/**
 * Quick-copy block at the top of a character guide: the question in plain
 * words with its one-sentence answer, the character in large type with a copy
 * button, the characters it gets confused with as a compact copyable row, and
 * a note rendered on the server (noteHtml).
 */
export function QuickCopy({ block, noteHtml, messages }: { block: QuickCopyBlock; noteHtml: string; messages: QuickCopyMessages }) {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy(char: string) {
    if (await copyText(char)) setCopied(char);
  }

  const { lead } = block;
  return (
    <div className="quick-copy" role="region" aria-label={block.label}>
      {/* One text node each, so the sentence is not split by React's comment markers in the HTML. */}
      <p className="quick-copy-answer"><strong>{`${block.label}:`}</strong>{` ${block.answer}`}</p>
      <div className="quick-copy-lead">
        <span className="quick-copy-glyph">{lead.char}</span>
        <div className="quick-copy-lead-text">
          <p className="quick-copy-name"><strong>{lead.name}</strong> <code dir="ltr">{codePoint(lead.char)}</code></p>
          <p className="quick-copy-use">{lead.use}</p>
          <button type="button" className="primary-action quick-copy-button" onClick={() => copy(lead.char)}>
            {copied === lead.char ? messages.copied : lead.button}
          </button>
        </div>
      </div>
      <ul className="quick-copy-row">
        {block.others.map((item) => (
          <li key={item.char}>
            <button type="button" className="quick-copy-item" onClick={() => copy(item.char)}>
              <span className="quick-copy-char">{item.char}</span>
              <span className="quick-copy-text">
                <strong>{item.name}</strong>
                <code dir="ltr">{codePoint(item.char)}</code>
                <span className="quick-copy-action">{copied === item.char ? messages.copied : block.copy}</span>
                <small>{item.use}</small>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="quick-copy-note" dangerouslySetInnerHTML={{ __html: noteHtml }} />
      <p className="quick-copy-status" aria-live="polite">{copied ? messages.status.replace("{char}", copied) : ""}</p>
    </div>
  );
}
