"use client";

import { useState } from "react";

export type CopyChar = { char: string; label: string; hint: string };

/** Plain strings passed in by the server component, so no translation module enters the client bundle. */
export type CopyMessages = { group: string; copied: string; status: string };

const englishMessages: CopyMessages = {
  group: "Copy a character",
  copied: "Copied!",
  status: "{char} copied to the clipboard — paste it with Ctrl+V or Cmd+V.",
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers/contexts without the async clipboard API.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  }
}

/** One-click copy buttons for single characters (e.g. the em dash), shown above a guide's answer. */
export function CharCopy({ chars, messages = englishMessages }: { chars: CopyChar[]; messages?: CopyMessages }) {
  const [copied, setCopied] = useState<string | null>(null);
  return (
    <div className="char-copy" role="group" aria-label={messages.group}>
      {chars.map((c) => (
        <button
          key={c.char}
          type="button"
          className="char-copy-button"
          onClick={async () => {
            if (await copyText(c.char)) {
              setCopied(c.char);
              window.setTimeout(() => setCopied((cur) => (cur === c.char ? null : cur)), 1600);
            }
          }}
        >
          <span className="char-copy-glyph" aria-hidden="true">{c.char}</span>
          <span className="char-copy-text">
            <strong>{copied === c.char ? messages.copied : c.label}</strong>
            <small>{c.hint}</small>
          </span>
        </button>
      ))}
      <p className="char-copy-status" aria-live="polite">{copied ? messages.status.replace("{char}", copied) : ""}</p>
    </div>
  );
}
