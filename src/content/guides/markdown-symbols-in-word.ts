import type { GuideDefinition } from "../../lib/guides";

export const markdownInWord: GuideDefinition = {
  slug: "markdown-symbols-in-word",
  title: "Why Pasted AI Text Shows ** and ## in Word",
  description: "Those asterisks and hash marks are Markdown. Here is why Word shows them literally, and the three ways to paste AI output with formatting intact.",
  h1: "Why does pasted AI text show ** and ## in Word?",
  dek: "The symbols are real formatting instructions — Word just has no idea how to read them.",
  cluster: "how-to",
  published: "2026-07-25",
  updated: "2026-07-25",
  answer:
    "Those symbols are Markdown, a plain-text formatting language that chat models write in. Asterisks mark bold, hash marks mark headings, and pipes build tables. Word has no Markdown parser, so it treats them as ordinary characters and prints them literally. Converting the text before pasting turns them into real formatting.",
  sections: [
    {
      id: "what-the-symbols-are",
      heading: "What the symbols actually mean",
      body: `Markdown is a convention for describing formatting using only characters you can type. It was designed so that a document reads sensibly even when nothing renders it. Chat models write in it because it is compact, unambiguous, and displays properly in the chat interface.

Here is the whole vocabulary you are likely to meet:

| You see | It means |
| --- | --- |
| \`**bold**\` | Bold text |
| \`*italic*\` or \`_italic_\` | Italic text |
| \`# Heading\` | Heading level 1 (more hashes, smaller heading) |
| \`- item\` or \`* item\` | Bullet list item |
| \`1. item\` | Numbered list item |
| Backticks around \`code\` | Inline code |
| \`> quote\` | Block quotation |
| \`[text](url)\` | Hyperlink |
| \`\\| a \\| b \\|\` | Table row |

Nothing is broken and nothing was corrupted in transit. You are looking at correctly formed instructions that landed somewhere with no interpreter.`,
      figure: "markdown-in-word",
    },
    {
      id: "why-word-cannot-read-it",
      heading: "Why Word cannot read it",
      body: `Word stores formatting as structured data inside the document. Bold is an attribute attached to a run of characters, not a pair of asterisks around it. When you paste plain text, Word takes every character at face value, because from its perspective an asterisk is a punctuation mark someone typed deliberately.

This is why the usual workarounds disappoint:

- **Paste Special → Formatted Text** does nothing, because there was no formatting on the clipboard to preserve. The clipboard held plain characters.
- **Find and replace** removes the asterisks but leaves the text unbolded, so you lose the structure entirely rather than gaining it.
- **AutoFormat** handles a few patterns such as bullet characters, but it is not a Markdown parser and it will not touch \`**bold**\` or \`## Heading\`.

Google Docs behaves the same way for the same reason. Notion, Obsidian, and most developer editors *do* parse Markdown, which is why the same paste behaves correctly there and creates the impression that Word is the one doing something wrong.`,
    },
    {
      id: "three-ways-to-fix",
      heading: "Three ways to get properly formatted text",
      body: `Which one you want depends on whether you need the formatting or just want it gone.

**1. Convert to a Word document.** The most complete option. [Markdown to Word](/markdown-to-word) turns the response into a real \`.docx\` with genuine heading styles, bold runs, lists, and tables — the kind Word's navigation pane and table of contents can actually see. Use this when the output is going to become a report or anything someone else will edit.

**2. Convert to rich text and paste.** [Markdown to Google Docs](/markdown-to-google-docs) produces formatted rich text you can copy straight into Google Docs, Word, Outlook, or any editor that accepts pasted HTML. Use this when you are dropping a section into a document that already exists.

**3. Strip the symbols entirely.** Sometimes you want clean prose with no formatting at all — for an email, a form field, a CMS box, or a chat message. [Remove Markdown Formatting](/remove-markdown-formatting) deletes the syntax characters while leaving every word intact, which is what find-and-replace fails to do safely.

All three run in your browser. Nothing is uploaded.`,
    },
    {
      id: "stopping-it-at-the-source",
      heading: "Stopping it at the source",
      body: `You can also ask the model not to use Markdown in the first place. A prompt such as *"reply in plain prose with no Markdown formatting, no asterisks, no hash marks, and no bullet lists"* works reasonably well for short answers.

It is less reliable than it sounds. Compliance tends to drift over a long response, and structured content — anything with steps, comparisons, or data — will pull the model back toward lists and tables because that is genuinely the clearest way to present it. If your answer contains a table, you almost certainly want the table; you just want it as a real table.

For anything long or structured, converting after the fact is the more dependable habit. It also means you keep the readable version in the chat window and get a properly formatted one in your document.

If the specific thing you are fighting with is a table rather than prose, that has its own quirks — see [how to paste a ChatGPT table into Excel](/guides/paste-chatgpt-table-into-excel).`,
    },
  ],
  faqs: [
    {
      question: "Why does ChatGPT text show asterisks when I paste it into Word?",
      answer:
        "The asterisks are Markdown syntax marking bold and italic text. Word has no Markdown parser, so it treats them as ordinary characters and displays them literally. Converting the Markdown to a Word document or to rich text first turns them into real formatting.",
    },
    {
      question: "How do I paste ChatGPT output into Word with formatting?",
      answer:
        "Convert it first. Markdown to Word produces a .docx with real heading styles, bold runs, lists, and tables; Markdown to Google Docs produces rich text you can paste directly into an existing document. Pasting the raw response will always show the syntax characters.",
    },
    {
      question: "Does Paste Special fix Markdown symbols?",
      answer:
        "No. Paste Special preserves formatting that already exists on the clipboard, and plain-text Markdown has none — the formatting is encoded as characters, not as attributes. There is nothing for Paste Special to keep.",
    },
    {
      question: "What does ## mean in AI-generated text?",
      answer:
        "It marks a heading. One hash is a top-level heading, two is a second-level heading, and so on down to six. In a Markdown-aware editor the hashes disappear and the line renders as a styled heading.",
    },
    {
      question: "Can I just find and replace the asterisks?",
      answer:
        "You can, but you will delete the formatting rather than apply it — the text stops being bold and simply loses the markers. Removing Markdown safely also means handling headings, list markers, links, and code fences, which is what a dedicated stripper does in one pass.",
    },
  ],
  relatedTools: ["markdown-to-word", "markdown-to-google-docs", "remove-markdown-formatting"],
  relatedGuides: ["paste-chatgpt-table-into-excel", "export-chatgpt-conversation"],
};
