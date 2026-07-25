export type ToolCategory = "Markdown & documents" | "AI cleanup" | "Data & prompts";

export type ToolDefinition = {
  slug: string;
  name: string;
  title: string;
  description: string;
  category: ToolCategory;
  placeholder: string;
  outputLabel?: string;
  report?: boolean;
  download?: "docx" | "xlsx" | "csv" | "html" | "txt";
  intro: string;
  faqs: { question: string; answer: string }[];
};

const sharedFaqs = (name: string) => [
  {
    question: `Is ${name.toLowerCase()} free?`,
    answer: "Yes. It is free, requires no account, and has no usage limit.",
  },
  {
    question: "Does my text get uploaded?",
    answer:
      "No. Processing happens in your browser. Text is stored only if you explicitly create a share link.",
  },
  {
    question: "Can I use it on mobile?",
    answer: "Yes. The editor works in current mobile and desktop browsers.",
  },
];

const markdownPlaceholder =
  "# Paste your AI response here\n\nThis is **bold**, this is *italic*, and this is a table:\n\n| Name | Score |\n| --- | ---: |\n| Ada | 98 |\n";

const define = (
  slug: string,
  name: string,
  title: string,
  description: string,
  category: ToolCategory,
  intro: string,
  extra: Partial<ToolDefinition> = {},
): ToolDefinition => ({
  slug,
  name,
  title,
  description,
  category,
  intro,
  placeholder: markdownPlaceholder,
  faqs: sharedFaqs(name),
  ...extra,
});

export const coreTools: ToolDefinition[] = [
  define("markdown-to-word", "Markdown to Word", "Markdown to Word Converter — Free & Instant", "Convert Markdown to a properly formatted Word document online. Free, private, and instant.", "Markdown & documents", "Turn Markdown from ChatGPT, Claude, or any editor into a real Word document. Headings, lists, links, code, and tables are preserved instead of appearing as raw symbols.", { download: "docx" }),
  define("markdown-to-pdf", "Markdown to PDF", "Markdown to PDF — Free Online Converter", "Convert Markdown to a clean PDF using your browser. No upload, signup, or watermark.", "Markdown & documents", "Preview formatted Markdown instantly, then use the print-ready view to save a crisp PDF. The browser handles PDF creation, so your document stays on your device."),
  define("markdown-to-google-docs", "Markdown to Google Docs", "Markdown to Google Docs Converter", "Convert Markdown for Google Docs with formatting preserved. Copy rich text or download DOCX.", "Markdown & documents", "Paste Markdown, copy the rich result, and paste it into Google Docs. Headings, lists, emphasis, links, and tables retain their structure without manual cleanup.", { download: "docx" }),
  define("remove-markdown-formatting", "Remove Markdown Formatting", "Remove Markdown Formatting Online", "Strip Markdown symbols while keeping clean, readable text. Free and private.", "Markdown & documents", "Remove asterisks, heading marks, link syntax, code fences, and other Markdown characters without damaging the words underneath.", { outputLabel: "Clean text", download: "txt" }),
  define("markdown-table-to-excel", "Markdown Table to Excel", "Markdown Table to Excel Converter", "Convert a Markdown pipe table to an Excel spreadsheet instantly.", "Markdown & documents", "Convert pipe-and-dash tables copied from AI chats into rows and columns that open correctly in Excel, Numbers, and Google Sheets.", { download: "xlsx" }),
  define("markdown-table-to-csv", "Markdown Table to CSV", "Markdown Table to CSV Converter", "Convert Markdown tables to clean CSV in your browser.", "Markdown & documents", "Paste a Markdown table and get standards-compatible CSV immediately. Quoted cells and commas are escaped so the file imports cleanly.", { download: "csv" }),
  define("markdown-viewer", "Markdown Viewer", "Markdown Viewer Online — Live Preview", "Preview Markdown live in a fast, private browser-based viewer.", "Markdown & documents", "Read and inspect Markdown as a formatted document while you type. It is useful for checking AI output, README content, notes, and documentation.", { download: "html" }),
  define("markdown-to-html", "Markdown to HTML", "Markdown to HTML Converter", "Convert Markdown to clean HTML instantly, entirely in your browser.", "Markdown & documents", "Generate clean semantic HTML from Markdown with a live preview. Copy the markup for a website, newsletter, CMS, or email workflow.", { outputLabel: "HTML", download: "html" }),
  define("word-to-markdown", "Word to Markdown", "Word to Markdown Converter Online", "Paste rich text from Word or Google Docs and convert it to Markdown.", "Markdown & documents", "Paste copied rich text from Word, Google Docs, or a webpage. The converter turns headings, emphasis, lists, links, and tables into portable Markdown.", { outputLabel: "Markdown", download: "txt", placeholder: "Paste rich text from Word or Google Docs here…" }),
  define("remove-em-dashes", "Remove Em Dashes", "Remove Em Dashes from Text", "Replace em dashes with commas, hyphens, or spaces instantly.", "Markdown & documents", "Find and replace em dashes in AI-generated or human-written text. The live count tells you exactly how many were changed.", { report: true, outputLabel: "Clean text", download: "txt", placeholder: "Paste text with em dashes — like this one — to replace them." }),
  define("clean-ai-text", "AI Text Cleaner", "Clean ChatGPT Text & AI Formatting", "Clean AI text artifacts such as em dashes, smart quotes, invisible characters, and emoji.", "AI cleanup", "The AI Artifact Report counts mechanical formatting artifacts; it does not guess whether text was written by AI. Toggle cleanup choices and review the transparent counts.", { report: true, outputLabel: "Clean text", download: "txt", placeholder: "Paste ChatGPT, Claude, or Gemini text here — “smart quotes,” emoji ✨ and hidden characters are reported." }),
  define("remove-invisible-characters", "Invisible Character Scanner", "Remove Invisible Characters from Text", "Find and remove zero-width spaces, soft hyphens, BOMs, and direction marks.", "AI cleanup", "Invisible Unicode can break search, validation, code, and copy-paste workflows. This scanner identifies each supported character type and removes it safely.", { report: true, outputLabel: "Clean text", download: "txt", placeholder: "Paste text to scan for zero-width and other invisible Unicode characters." }),
  define("remove-smart-quotes", "Smart Quotes to Straight Quotes", "Replace Smart Quotes Online", "Replace curly quotes with straight quotes and normalize apostrophes.", "AI cleanup", "Normalize typographic quotation marks for code, CSV, databases, plain-text email, and systems that expect ASCII punctuation.", { report: true, outputLabel: "Clean text", download: "txt", placeholder: "Paste “curly quotes” and ‘apostrophes’ here." }),
  define("remove-emojis", "Remove Emojis", "Remove Emojis from Text Online", "Remove emoji characters from text instantly and privately.", "AI cleanup", "Strip emoji pictographs and their modifiers while leaving ordinary text and punctuation intact. The result updates while you type.", { report: true, outputLabel: "Clean text", download: "txt", placeholder: "Paste text with emoji 👋🏽✨ to remove them." }),
  define("remove-line-breaks", "Fix Copy-Paste Line Breaks", "Remove Line Breaks from Text", "Fix unwanted line breaks while preserving paragraphs.", "AI cleanup", "Repair hard wraps copied from PDFs, emails, and AI chats. Single line breaks become spaces while paragraph breaks remain readable.", { report: true, outputLabel: "Clean text", download: "txt", placeholder: "Paste text with\nunwanted hard line\nbreaks.\n\nParagraphs stay separate." }),
  define("chatgpt-conversation-to-document", "ChatGPT Conversation to Document", "Export ChatGPT Conversation to Document", "Format a copied ChatGPT conversation as a clean document.", "AI cleanup", "Turn copied ChatGPT transcripts into readable documents with clear user and assistant sections, ready to share or archive.", { download: "txt", placeholder: "You:\nSummarize this topic.\n\nChatGPT:\nHere is a concise summary…" }),
  define("token-counter", "Token Counter", "Token Counter — GPT & Claude Estimate", "Count tokens, words, characters, and estimated model cost.", "Data & prompts", "Estimate prompt size before sending it to a model. Counts are fast browser-side approximations; exact billing may vary by model tokenizer.", { report: true, placeholder: "Paste a prompt or model response to estimate its token count." }),
  define("text-splitter", "Text Splitter", "Text Splitter for AI Prompts", "Split long text into clean, copyable chunks for AI tools.", "Data & prompts", "Break long documents into practical chunks near paragraph boundaries. This helps fit content into prompts without cutting words in half.", { report: true, placeholder: "Paste a long document to split it into manageable chunks." }),
  define("text-diff", "Text Diff", "Text Diff Online — Compare Text", "Compare two text versions and see additions and deletions.", "Data & prompts", "Compare drafts, prompts, generated answers, and edited copy. Put the original above a line containing only three hyphens, then the revised text below.", { report: true, placeholder: "Original text\n---\nRevised text" }),
  define("json-formatter", "JSON Formatter & Validator", "JSON Formatter & Validator", "Format, minify, and validate JSON with precise errors.", "Data & prompts", "Paste JSON to validate and format it with readable indentation. Invalid input shows the parser error immediately.", { report: true, outputLabel: "Formatted JSON", download: "txt", placeholder: "{\"project\":\"fixmyformatting\",\"fast\":true}" }),
  define("json-to-csv", "JSON to CSV", "JSON to CSV Converter Online", "Convert arrays of JSON objects into downloadable CSV.", "Data & prompts", "Flatten a JSON array into a spreadsheet-friendly CSV file. All object keys become columns and missing values remain empty.", { report: true, outputLabel: "CSV", download: "csv", placeholder: "[{\"name\":\"Ada\",\"score\":98},{\"name\":\"Lin\",\"score\":95}]" }),
  define("csv-to-markdown-table", "CSV to Markdown Table", "CSV to Markdown Table Converter", "Convert CSV rows into a clean Markdown pipe table.", "Data & prompts", "Turn comma-separated data into Markdown you can paste into documentation, GitHub, Notion, or an AI chat.", { report: true, outputLabel: "Markdown table", download: "txt", placeholder: "Name,Score\nAda,98\nLin,95" }),
  define("extract-table-from-text", "Extract Tables from Text", "Extract Table from Text Online", "Find table-like rows in text and convert them to CSV.", "Data & prompts", "Extract pipe-delimited or tab-delimited tables from surrounding prose. The result is ready for a spreadsheet.", { report: true, outputLabel: "Extracted table", download: "csv", placeholder: "Results:\nName | Score\nAda | 98\nLin | 95\n\nEnd of report." }),
  define("word-counter", "Word & Character Counter", "Word Counter & Character Counter", "Count words, characters, sentences, paragraphs, and reading time.", "Data & prompts", "Get instant writing statistics without uploading your document. The report is useful for essays, posts, descriptions, and prompts.", { report: true, placeholder: "Paste or type text to count words, characters, and sentences." }),
  define("case-converter", "Case Converter", "Case Converter Online", "Convert text to uppercase, lowercase, title case, or sentence case.", "Data & prompts", "Normalize inconsistent capitalization instantly. The default output is title case; additional case options are available above the editor.", { outputLabel: "Converted text", download: "txt", placeholder: "paste text with inconsistent CAPITALIZATION" }),
  define("latex-to-word", "LaTeX to Word Equation", "LaTeX to Word Equation Converter", "Prepare LaTeX for Word's equation editor by removing display delimiters.", "Data & prompts", "Prepare LaTeX copied from an AI response for Word's equation editor by removing display delimiters and normalizing common commands. In Word, press Alt+= to open an equation box, choose LaTeX input if needed, and paste the result there; pasting into a normal paragraph will not create a native equation.", { report: true, outputLabel: "Word equation input", download: "txt", placeholder: "\\[ E = mc^2 \\]\n\n$$\\frac{a}{b}$$" }),
];

export const brands = ["chatgpt", "claude", "gemini", "copilot", "perplexity", "deepseek"] as const;
export const brandActions = ["to-word", "to-pdf", "to-google-docs", "table-to-excel", "remove-formatting"] as const;

export const brandNames: Record<(typeof brands)[number], string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
  copilot: "Microsoft Copilot",
  perplexity: "Perplexity",
  deepseek: "DeepSeek",
};

export const actionSource: Record<(typeof brandActions)[number], string> = {
  "to-word": "markdown-to-word",
  "to-pdf": "markdown-to-pdf",
  "to-google-docs": "markdown-to-google-docs",
  "table-to-excel": "markdown-table-to-excel",
  "remove-formatting": "remove-markdown-formatting",
};

const actionLabel: Record<(typeof brandActions)[number], string> = {
  "to-word": "to Word",
  "to-pdf": "to PDF",
  "to-google-docs": "to Google Docs",
  "table-to-excel": "Table to Excel",
  "remove-formatting": "Remove Formatting",
};

const brandReasons: Record<(typeof brands)[number], string> = {
  chatgpt: "ChatGPT often returns useful structure as Markdown, which exposes asterisks, hashes, and pipe tables when pasted into office software.",
  claude: "Claude frequently writes long, carefully structured answers whose headings and tables need conversion before they behave like a normal document.",
  gemini: "Gemini tables can paste as visible pipes and separator dashes because chat output uses Markdown rather than spreadsheet cells.",
  copilot: "Copilot responses mix prose, lists, and code-oriented Markdown, so a direct paste may not preserve the visual hierarchy.",
  perplexity: "Perplexity answers often combine Markdown structure with citation links, making clean conversion important when reusing research.",
  deepseek: "DeepSeek commonly formats technical answers in Markdown, including fenced code and formulas that plain pasting leaves exposed.",
};

const brandActionCopy: Record<(typeof brandActions)[number], {
  description: (brand: string) => string;
  guidance: (brand: string) => string;
}> = {
  "to-word": {
    description: (brand) => `Convert ${brand} responses to editable Word documents with headings, lists, code, and tables preserved.`,
    guidance: (brand) => `Use this when a ${brand} answer needs to become a report, brief, assignment, or document that other people can edit in Word.`,
  },
  "to-pdf": {
    description: (brand) => `Convert ${brand} responses to clean, print-ready PDF files without uploading your text.`,
    guidance: (brand) => `The live preview shows how the ${brand} response will print before you choose Save as PDF in your browser.`,
  },
  "to-google-docs": {
    description: (brand) => `Move ${brand} output into Google Docs while preserving headings, lists, links, emphasis, and tables.`,
    guidance: (brand) => `Copy the rich-text result and paste it into Google Docs when a normal paste from ${brand} leaves visible Markdown symbols.`,
  },
  "table-to-excel": {
    description: (brand) => `Convert ${brand} Markdown tables into real Excel rows and columns, ready to sort and edit.`,
    guidance: (brand) => `This fixes the pipe-and-dash table syntax ${brand} displays in chat and downloads a genuine .xlsx spreadsheet.`,
  },
  "remove-formatting": {
    description: (brand) => `Remove Markdown formatting from ${brand} responses while keeping the readable text intact.`,
    guidance: (brand) => `Use the clean text in email, forms, messaging apps, or editors that show ${brand} asterisks and heading marks literally.`,
  },
};

export const brandTools: ToolDefinition[] = brands.flatMap((brand) =>
  brandActions.map((action) => {
    const source = coreTools.find((tool) => tool.slug === actionSource[action])!;
    const brandName = brandNames[brand];
    const name = `${brandName} ${actionLabel[action]}`;
    return {
      ...source,
      slug: `${brand}-${action}`,
      name,
      title: `${name} Converter — Free Online`,
      description: brandActionCopy[action].description(brandName),
      intro: `${brandReasons[brand]} ${brandActionCopy[action].guidance(brandName)} ${source.intro}`,
      placeholder: source.placeholder.replace("your AI response", `your ${brandName} response`),
      faqs: [
        {
          question: `How do I use ${name}?`,
          answer: `Copy the relevant content from ${brandName}, paste it into the editor above, and use the live result immediately.`,
        },
        {
          question: `Does this upload my ${brandName} conversation?`,
          answer: "No. Conversion runs in your browser. Text is stored only when you explicitly create a share link.",
        },
        {
          question: `Can I edit the converted ${brandName} result?`,
          answer: "Yes. The result remains editable when copied or downloaded in an editable format.",
        },
      ],
    };
  }),
);

export const allTools = [...coreTools, ...brandTools];

export function getTool(slug: string) {
  return allTools.find((tool) => tool.slug === slug);
}

export function getProcessorSlug(slug: string) {
  const brandMatch = brands.find((brand) => slug.startsWith(`${brand}-`));
  if (!brandMatch) return slug;
  const action = slug.slice(brandMatch.length + 1) as (typeof brandActions)[number];
  return actionSource[action] ?? slug;
}
