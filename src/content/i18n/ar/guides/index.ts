import type { GuideTranslation } from "@/lib/i18n";
import { guide as g0 } from "./chatgpt-invisible-characters";
import { guide as g1 } from "./em-dash-vs-en-dash-vs-hyphen";
import { guide as g2 } from "./export-chatgpt-conversation";
import { guide as g3 } from "./invisible-unicode-characters";
import { guide as g4 } from "./markdown-symbols-in-word";
import { guide as g5 } from "./paste-chatgpt-table-into-excel";
import { guide as g6 } from "./prompt-token-count-explained";
import { guide as g7 } from "./signs-of-ai-written-text";
import { guide as g8 } from "./smart-quotes-break-code";
import { guide as g9 } from "./why-chatgpt-uses-em-dashes";

export const guides: Partial<Record<string, GuideTranslation>> = {
  "chatgpt-invisible-characters": g0,
  "em-dash-vs-en-dash-vs-hyphen": g1,
  "export-chatgpt-conversation": g2,
  "invisible-unicode-characters": g3,
  "markdown-symbols-in-word": g4,
  "paste-chatgpt-table-into-excel": g5,
  "prompt-token-count-explained": g6,
  "signs-of-ai-written-text": g7,
  "smart-quotes-break-code": g8,
  "why-chatgpt-uses-em-dashes": g9,
};
