import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "Markdown को Word में बदलें", description: "Markdown को सही फ़ॉर्मैट वाले Word दस्तावेज़ में मुफ़्त और निजी रूप से बदलें।" },
  "markdown-to-pdf": { name: "Markdown को PDF में बदलें", description: "Markdown को सीधे ब्राउज़र में साफ़ PDF में बदलें।" },
  "markdown-to-google-docs": { name: "Markdown को Google Docs में बदलें", description: "शीर्षक, सूची, लिंक और टेबल बचाते हुए Markdown को Google Docs में ले जाएँ।" },
  "remove-markdown-formatting": { name: "Markdown फ़ॉर्मैटिंग हटाएँ", description: "टेक्स्ट बचाते हुए तारांकन, हैश और अन्य Markdown चिन्ह हटाएँ।" },
  "markdown-table-to-excel": { name: "Markdown टेबल को Excel में बदलें", description: "Markdown पाइप टेबल को Excel की पंक्तियों और कॉलम में बदलें।" },
  "markdown-table-to-csv": { name: "Markdown टेबल को CSV में बदलें", description: "Markdown टेबल को साफ़ और अनुकूल CSV फ़ाइल में बदलें।" },
  "markdown-viewer": { name: "ऑनलाइन Markdown व्यूअर", description: "फ़ाइल अपलोड किए बिना फ़ॉर्मैट किया हुआ Markdown लाइव देखें।" },
  "markdown-to-html": { name: "Markdown को HTML में बदलें", description: "Markdown से तुरंत साफ़ और अर्थपूर्ण HTML बनाएँ।" },
  "word-to-markdown": { name: "Word को Markdown में बदलें", description: "Word या Google Docs का रिच टेक्स्ट पेस्ट करके Markdown में बदलें।" },
  "remove-em-dashes": { name: "टेक्स्ट से लंबे डैश हटाएँ", description: "लंबे डैश खोजें और उन्हें आसान विराम चिह्न से बदलें।" },
  "clean-ai-text": { name: "ChatGPT और AI टेक्स्ट साफ़ करें", description: "AI टेक्स्ट से डैश, घुमावदार उद्धरण, इमोजी और छिपे अक्षर साफ़ करें।" },
  "remove-invisible-characters": { name: "अदृश्य अक्षर हटाएँ", description: "ज़ीरो-विथ स्पेस, सॉफ्ट हाइफ़न और दिशा चिह्न खोजकर हटाएँ।" },
};
