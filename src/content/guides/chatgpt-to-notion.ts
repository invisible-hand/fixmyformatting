import type { GuideDefinition } from "../../lib/guides";

export const chatgptToNotion: GuideDefinition = {
  slug: "chatgpt-to-notion",
  title: "How to Paste ChatGPT Output Into Notion",
  description: "Notion reads Markdown natively, so most ChatGPT output pastes with formatting intact. Here is what survives, what breaks, and how to fix tables.",
  h1: "How to move ChatGPT output into Notion",
  dek: "Notion parses Markdown, so the paste usually works. The interesting part is the handful of things that do not.",
  cluster: "how-to",
  published: "2026-09-01",
  updated: "2026-09-01",
  answer:
    "Notion understands Markdown natively, so pasting a ChatGPT response into a Notion page usually produces real blocks: headings become headings, **bold** becomes bold, and hyphens become bullets. This is the opposite of Word or Google Docs, where the same paste shows literal asterisks and hashes. The main exception is tables — a Markdown pipe table often arrives as plain text lines rather than a Notion table, and converting it to CSV or into spreadsheet cells first is the reliable fix.",
  sections: [
    {
      id: "what-pastes-correctly",
      heading: "What pastes correctly with no work at all",
      body: `Notion is one of the few mainstream editors that treats Markdown as input rather than as text. It converts syntax into blocks both as you type it and, in most cases, when you paste it. That makes the default answer to "how do I get ChatGPT output into Notion" refreshingly boring: paste it.

In practice the following normally survive a plain paste and become real Notion blocks:

| In the response | In Notion |
| --- | --- |
| \`# Heading\` through \`###\` | Heading blocks |
| \`**bold**\`, \`*italic*\` | Bold and italic text |
| \`- item\` / \`* item\` | Bulleted list |
| \`1. item\` | Numbered list |
| \`- [ ] item\` | To-do checkbox |
| \`> quote\` | Quote block |
| \`---\` | Divider |
| Backticks around \`code\` | Inline code |
| Triple-backtick fence | Code block |
| \`[text](url)\` | Link |

Because this works, people paste an entire answer, see it come out formatted, and reasonably assume everything made it. The parts that did not are easy to miss on a quick read — which is what the rest of this page is about.

Notion's behaviour here has changed and expanded over the years, and it differs slightly between the web app, the desktop app, and mobile. If a particular block type does not convert on your setup, that is normal variation rather than something you have broken.`,
    },
    {
      id: "two-ways-to-copy",
      heading: "Rich paste or plain paste: which one do you want?",
      body: `There are two different things you can put on the clipboard, and they behave differently.

**Rendered rich text.** If you drag-select the answer in the chat window and copy it, you are copying what the browser displays — HTML with formatting already applied. Notion accepts pasted HTML and maps it onto blocks, so this usually arrives formatted too.

**Markdown source.** If you use the response's copy button, you generally get the underlying Markdown. Notion then parses the syntax and builds the blocks itself.

Both routes work, and they fail in different ways. Rich-text paste can carry along styling artefacts, background colours, and the interface's own wrapper elements. Markdown paste is cleaner but depends on Notion's parser recognizing each construct, which is where nested lists and tables get lost.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> on a Mac) pastes without formatting. That is the right choice when you want the words and nothing else — and the wrong choice when you are pasting Markdown source you wanted Notion to convert, because it will drop the text in with the syntax characters intact and nothing parsed. If a paste came out plainer than expected, that shortcut is the first thing to check.

A useful habit: if the first paste is wrong, undo it completely and try the other route rather than repairing the result by hand. The two produce different structures, and fixing one to look like the other is slower than pasting again.`,
    },
    {
      id: "tables",
      heading: "Why did my ChatGPT table paste as plain text?",
      body: `This is the failure people actually hit. A Markdown pipe table looks like this on the clipboard:

\`\`\`
| Region | Q1 | Q2 |
| --- | ---: | ---: |
| Europe | 412 | 486 |
| Asia | 377 | 381 |
\`\`\`

Notion's Markdown handling frequently does not turn that into a table block. You get four text lines with the pipes still visible, including the row of dashes and colons that was only ever alignment syntax. Whether it converts depends on the surrounding content and on which app you pasted into, so a table that worked once may not work the next time.

Two routes get you real rows and columns:

**Convert to CSV and import.** [Markdown Table to CSV](/markdown-table-to-csv) turns the pipe table into a proper CSV file with quoting and commas escaped correctly. Notion's import option accepts CSV and creates a database from it, which is what you want if the data is going to be filtered, sorted, or linked to anything.

**Go through a spreadsheet.** [Markdown Table to Excel](/markdown-table-to-excel) produces a real \`.xlsx\`. Open it, select the cells, copy, and paste into a Notion table — clipboard data that already has cell boundaries maps onto rows and columns rather than becoming text. This is the quicker path for a one-off table you just want to sit inside a page.

Either way, convert before pasting rather than after. Rebuilding a pasted table by hand means retyping every cell, and the padding spaces Markdown adds for readability come along into the values if you split them manually.`,
      figure: "table-to-grid",
    },
    {
      id: "lists-and-maths",
      heading: "Nested lists, indentation, and equations",
      body: `**Nested lists** are the second most common complaint. Markdown expresses nesting with leading spaces, and how many spaces count as one level is not consistent between the tool that wrote the text and the tool that reads it. The usual symptoms are a sub-list flattened up to the top level, or a list that arrives one level deeper than it should. Notion indents and outdents list items with <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd>, so this is a fast repair — but check for it, because a flattened list still reads plausibly and the mistake is easy to publish.

Mixed lists — bullets containing numbered items, or checkboxes inside bullets — are the most fragile case. If a structure matters, paste it and then verify the levels rather than assuming.

**Equations.** Notion has its own equation blocks and inline equations, and LaTeX written in a chat response does not survive a plain paste as rendered maths. It lands as literal \`$\` delimiters and backslash commands. You can add the equation to a Notion equation block and paste the LaTeX source into it, which is a manual step per equation. For anything longer than a couple of formulas, converting the whole document elsewhere is usually less work than repairing it in place.

**Images and diagrams** generated in the chat interface are not on the clipboard as image data when you copy the surrounding text. They need to be downloaded and added to the page separately.`,
    },
    {
      id: "hidden-characters",
      heading: "The characters that ride along invisibly",
      body: `Whatever route you take, the text arrives with its punctuation intact — including the parts you may not want in your notes.

Chat models produce em dashes, curly quotes, non-breaking spaces, and occasionally zero-width characters. None of these break anything in Notion, which is exactly the problem: they sit in your page unnoticed until the text is exported, pushed into code, or searched for and not found because the apostrophe is not the apostrophe you typed.

[AI Text Cleaner](/clean-ai-text) reports and removes those artefacts in one pass, and [Remove Em Dashes](/remove-em-dashes) handles the narrower case where the dashes are the only thing bothering you. Both run in the browser, and both count what they changed rather than guessing whether the text was AI-written. Run the text through before pasting if the page is going anywhere else afterwards.`,
    },
    {
      id: "at-scale",
      heading: "How do I move a lot of content at once?",
      body: `Pasting is fine for a single answer. For anything repeated, Notion has an import option that accepts Markdown files, reached from the workspace's import menu.

The behaviour worth knowing: each \`.md\` file becomes its own page, with its Markdown parsed into blocks the same way a paste would be. Import a folder of files and you get a page per file. That makes the sensible workflow "one topic per file" rather than one enormous document, since a single file will not split itself into separate pages at its headings.

The same import path handles CSV, which is why the CSV route for tables above is the tidy one — a table that should be a database goes in as a database rather than as a picture of one.

If the content you are moving is a whole conversation rather than a single answer, capturing it cleanly is its own problem — see [how to export a ChatGPT conversation](/guides/export-chatgpt-conversation). And if you are also sending the same content to Word or Google Docs, note that they behave nothing like Notion: [pasted Markdown shows literal ** and ##](/guides/markdown-symbols-in-word) there, because neither has a Markdown parser.`,
    },
  ],
  faqs: [
    {
      question: "Does Notion support Markdown?",
      answer:
        "Yes. Notion converts Markdown syntax into real blocks as you type it and when you paste it, covering headings, bold, italic, bullet and numbered lists, checkboxes, quotes, dividers, inline code, code fences, and links. It is not a Markdown editor — the underlying document is Notion blocks — but Markdown works as input.",
    },
    {
      question: "Why did my ChatGPT table paste into Notion as plain text?",
      answer:
        "Markdown pipe tables are the weak spot in Notion's paste handling, and whether one converts varies with the surrounding content and the app you pasted into. Converting the table to CSV and importing it, or opening it as a spreadsheet and copying the cells, both produce real rows and columns.",
    },
    {
      question: "How do I paste ChatGPT output into Notion without formatting?",
      answer:
        "Use Ctrl+Shift+V, or Cmd+Shift+V on a Mac, to paste without formatting. Be aware that this also stops Notion parsing Markdown syntax, so raw Markdown pasted this way keeps its asterisks and hashes as visible characters.",
    },
    {
      question: "How do I import a Markdown file into Notion?",
      answer:
        "Use Notion's import option and choose Markdown. Each .md file becomes its own page with its syntax parsed into blocks, so importing a folder produces one page per file rather than one long page split by headings.",
    },
    {
      question: "Why are my nested lists flattened when I paste into Notion?",
      answer:
        "Markdown marks nesting with leading spaces, and the number of spaces per level is not standardized, so a sub-list can arrive at the wrong depth or at the top level. Tab and Shift+Tab re-indent list items in Notion, but the levels are worth checking rather than assuming.",
    },
    {
      question: "Does LaTeX from ChatGPT work in Notion?",
      answer:
        "Not on a plain paste. It arrives as literal dollar signs and backslash commands. Notion has dedicated equation blocks, and you can paste the LaTeX source into one to get rendered maths, but this is a manual step for each equation.",
    },
    {
      question: "Should I copy from the chat window or use the copy button?",
      answer:
        "Both work and fail differently. Selecting the rendered answer copies formatted rich text, which Notion pastes as blocks but can bring styling artefacts with it. The copy button gives Markdown source, which is cleaner but relies on Notion's parser, and that is where tables and nested lists get lost.",
    },
  ],
  relatedTools: ["markdown-table-to-csv", "markdown-table-to-excel", "clean-ai-text"],
  relatedGuides: ["paste-chatgpt-table-into-excel", "markdown-symbols-in-word", "export-chatgpt-conversation"],
};
