import type { GuideDefinition } from "../../lib/guides";

export const exportConversation: GuideDefinition = {
  slug: "export-chatgpt-conversation",
  title: "Export a ChatGPT Conversation to PDF or Word",
  description: "Print-to-PDF clips your chat and loses formatting. Here is how to turn a conversation into a clean, readable PDF or Word document instead.",
  h1: "How to export a ChatGPT conversation to PDF or Word",
  dek: "Why printing the page fails, and how to get a document you would actually send to someone.",
  cluster: "how-to",
  published: "2026-07-25",
  updated: "2026-07-25",
  answer:
    "Printing the chat page directly usually clips long messages, drops code blocks, and carries the interface furniture into the file. Copying the conversation as text, restructuring it so each speaker turn becomes a labelled section, and then converting to PDF or DOCX produces a document that is actually readable and editable.",
  sections: [
    {
      id: "why-printing-fails",
      heading: "Why printing the chat page fails",
      body: `Reaching for <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> on the chat window is the obvious move, and it produces disappointing results for structural reasons.

Chat interfaces are built as scrolling application views, not documents. That leads to predictable print failures:

- **Long messages get clipped.** Individual messages sit in their own scroll containers, so print captures only the visible portion.
- **Code blocks lose their content.** Horizontally scrolling code is cut at the container edge, so the right-hand side of every long line simply vanishes.
- **Interface furniture comes along.** Sidebars, avatars, model selectors, and regenerate buttons all print.
- **Page breaks land badly.** Nothing tells the browser where a sensible break is, so headings get orphaned at the bottom of pages.
- **Only loaded messages exist.** Long conversations are virtualised, so earlier messages that have not been rendered are absent from the print entirely.

The result is a file that technically contains your conversation but is not something you would attach to an email.`,
    },
    {
      id: "the-reliable-route",
      heading: "The reliable route: copy, structure, convert",
      body: `Treat the conversation as text, not as a web page.

1. **Select the conversation and copy it.** Drag-select from the first message to the last. You will get the text of both sides, usually with the Markdown structure intact.
2. **Restructure it into a document.** Paste into [ChatGPT Conversation to Document](/chatgpt-conversation-to-document). It detects speaker turns and rebuilds them as clear, labelled sections rather than an undifferentiated wall of text.
3. **Convert to the format you need.** For a shareable file, [Markdown to PDF](/markdown-to-pdf) gives a print-ready view you can save straight to PDF. For something editable, [Markdown to Word](/markdown-to-word) produces a \`.docx\` with real heading styles.

The output is a document with a title, headed speaker sections, preserved code blocks and tables, and page breaks that fall in sensible places.`,
      figure: "transcript-to-doc",
    },
    {
      id: "labelling-speakers",
      heading: "Getting the speaker labels right",
      body: `The one part worth a moment of attention is how the copied text distinguishes who said what.

Depending on the interface and browser, a copied conversation may arrive with explicit labels, or with nothing at all separating the turns. If your paste has no labels, add them before converting — a line containing just \`You:\` or \`ChatGPT:\` above each turn is enough for the converter to find the boundaries.

A format that works consistently:

\`\`\`
You:
Summarize the Q2 results.

ChatGPT:
Revenue rose 12% year over year, driven by...
\`\`\`

For long technical conversations, it is worth deleting the exploratory dead ends before converting. A transcript of forty exchanges where six mattered is not more useful for being complete — it is less useful, because the reader has to find the six. Export the conversation you would want to read.`,
    },
    {
      id: "practical-notes",
      heading: "Practical notes on the finished file",
      body: `**PDF page setup.** When saving from the print dialog, enable background graphics if you want code blocks to keep their shading, and check that margins are not clipping wide tables. Landscape orientation is often the right call for a conversation full of data.

**Word documents and headings.** Because the converter emits real heading styles rather than bold text, Word's navigation pane works and you can insert an automatic table of contents. That is the main practical advantage over any copy-paste approach.

**Long code.** Code that scrolled horizontally in the chat window will wrap in a document. If exact line breaks matter — a config file, a shell command — check those blocks after converting.

**Privacy.** Both converters run entirely in your browser; nothing is uploaded. That matters more than usual here, since conversations often contain work context, client details, or unreleased material. If you would hesitate to paste it into an unknown website, local processing is the reason this approach is safe.

**A note on official exports.** ChatGPT offers a data export in settings, which emails you a ZIP containing your conversation history. It is thorough and useful for archiving, but it is structured as raw data rather than as a readable document, so you would still convert it to share a single conversation with someone.`,
    },
  ],
  faqs: [
    {
      question: "How do I save a ChatGPT conversation as a PDF?",
      answer:
        "Copy the conversation, restructure it with ChatGPT Conversation to Document so each speaker turn becomes a labelled section, then use Markdown to PDF and save from the print dialog. This avoids the clipped messages and missing code blocks you get from printing the chat page.",
    },
    {
      question: "Why does printing the ChatGPT page cut off my messages?",
      answer:
        "Messages sit inside their own scrolling containers and long conversations are virtualised, so printing captures only what is currently rendered and visible. Horizontally scrolling code blocks are cut at the container edge for the same reason.",
    },
    {
      question: "Can I export a ChatGPT conversation to Word?",
      answer:
        "Yes. Convert the copied conversation to a .docx with Markdown to Word. Because it produces real heading styles rather than bold text, the navigation pane works and you can generate an automatic table of contents.",
    },
    {
      question: "Does ChatGPT have a built-in export?",
      answer:
        "There is a data export in settings that emails you an archive of your conversation history. It is good for backup but is structured as raw data rather than a readable document, so converting is still the practical route for sharing a single conversation.",
    },
    {
      question: "Is it safe to paste a private conversation into a converter?",
      answer:
        "It depends entirely on the tool. Ours process text in your browser and upload nothing, which is why the conversation stays on your machine. Any tool that sends text to a server should be treated as publishing it, which matters for work or client material.",
    },
  ],
  relatedTools: ["chatgpt-conversation-to-document", "markdown-to-pdf", "markdown-to-word"],
  relatedGuides: ["markdown-symbols-in-word", "paste-chatgpt-table-into-excel", "no-text-could-be-extracted"],
};
