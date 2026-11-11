"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { copyText } from "@/lib/clipboard";
import { fontSample, fontStyles } from "@/lib/unicode-fonts";

/** Plain strings passed in by the server component, so no copy module enters the client bundle. */
export type FontWorkspaceLabels = {
  input: string;
  characters: string;
  copy: string;
  copied: string;
  free: string;
  noSignup: string;
  private: string;
};

export type FontWorkspaceProps = {
  slug: string;
  name: string;
  placeholder: string;
  initialInput?: string;
  locale?: string;
  labels: FontWorkspaceLabels;
};

/**
 * The workspace of the fonts-copy-and-paste tool: one text box, then the same
 * text in every Unicode style with a copy button per row. Until something is
 * typed the rows show a sample phrase, which is also what the server renders,
 * so the styles are in the HTML before any script runs.
 */
export function FontWorkspace({ slug, name, placeholder, initialInput = "", locale = "en", labels }: FontWorkspaceProps) {
  const [input, setInput] = useState(initialInput);
  const [copied, setCopied] = useState<string | null>(null);
  const deferredInput = useDeferredValue(input);
  const conversionTracked = useRef(false);
  const text = deferredInput || fontSample;

  useEffect(() => {
    if (!deferredInput || conversionTracked.current) return;
    conversionTracked.current = true;
    track("tool_conversion", { tool: slug });
  }, [deferredInput, slug]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyStyle(id: string, output: string) {
    if (!(await copyText(output))) return;
    setCopied(id);
    track("tool_action", { tool: slug, action: "copy", style: id });
  }

  const copiedStyle = copied ? fontStyles.find((style) => style.id === copied) : undefined;

  return (
    <section className="workspace font-workspace" aria-label={`${name} tool`}>
      <div className="font-input">
        <div className="panel-label">
          <label htmlFor="font-input">{labels.input}</label>
          <span>{input.length.toLocaleString(locale)} {labels.characters}</span>
        </div>
        <textarea
          id="font-input"
          dir="auto"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          rows={3}
          autoFocus
          spellCheck={false}
        />
      </div>
      <ul className="font-list">
        {fontStyles.map((style) => {
          const output = style.convert(text);
          return (
            <li className="font-row" key={style.id} id={`style-${style.id}`}>
              <span className="font-name">{style.name}</span>
              <span className="font-output" dir="auto">{output}</span>
              <button
                type="button"
                className={copied === style.id ? "font-copy copied" : "font-copy"}
                onClick={() => copyStyle(style.id, output)}
                aria-label={`${copied === style.id ? labels.copied : labels.copy}: ${style.name}`}
              >
                {copied === style.id ? labels.copied : labels.copy}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="font-status" role="status">{copiedStyle ? `${labels.copied}: ${copiedStyle.name}` : ""}</p>
      <div className="trust-strip">{labels.free} <span>·</span> {labels.noSignup} <span>·</span> {labels.private}</div>
    </section>
  );
}
