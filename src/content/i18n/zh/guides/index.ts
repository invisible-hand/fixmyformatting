import type { GuideTranslation } from "@/lib/i18n";
import { guide as g0 } from "./ai-text-watermarks";
import { guide as g1 } from "./chatgpt-invisible-characters";
import { guide as g2 } from "./em-dash-copy-paste";
import { guide as g3 } from "./em-dash-vs-en-dash-vs-hyphen";
import { guide as g4 } from "./export-chatgpt-conversation";
import { guide as g5 } from "./invisible-unicode-characters";
import { guide as g6 } from "./markdown-symbols-in-word";
import { guide as g7 } from "./paste-chatgpt-table-into-excel";
import { guide as g8 } from "./prompt-token-count-explained";
import { guide as g9 } from "./signs-of-ai-written-text";
import { guide as g10 } from "./smart-quotes-break-code";
import { guide as g11 } from "./what-is-an-em-dash";
import { guide as g12 } from "./why-chatgpt-uses-em-dashes";
import { guide as g13 } from "./zero-width-space";

export const guides: Partial<Record<string, GuideTranslation>> = {
  "ai-text-watermarks": g0,
  "chatgpt-invisible-characters": g1,
  "em-dash-copy-paste": g2,
  "em-dash-vs-en-dash-vs-hyphen": g3,
  "export-chatgpt-conversation": g4,
  "invisible-unicode-characters": g5,
  "markdown-symbols-in-word": g6,
  "paste-chatgpt-table-into-excel": g7,
  "prompt-token-count-explained": g8,
  "signs-of-ai-written-text": g9,
  "smart-quotes-break-code": g10,
  "what-is-an-em-dash": g11,
  "why-chatgpt-uses-em-dashes": g12,
  "zero-width-space": g13,
};
