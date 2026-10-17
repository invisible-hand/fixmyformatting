import type { ToolGuide } from "../../../lib/tool-guides";

export const markdownTableToWordTable: ToolGuide = {
  parentTool: "markdown-to-word",
  slug: "markdown-table-to-word-table",
  title: "Turn a Markdown Table Into a Real Word Table",
  description: "Word shows a pasted Markdown table as pipes and dashes. Convert it to .docx, or use Convert Text to Table with the right separator. Steps and limits.",
  h1: "How do I turn a Markdown table into a Word table?",
  dek: "Three routes from pipes and dashes to an editable Word table, and the clean-up each one needs.",
  cluster: "how-to",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Word cannot read Markdown, so a pasted table shows up as lines of pipes and dashes. Convert the Markdown to a .docx, which builds a real Word table, or delete the dashes row, select the lines and use Insert > Table > Convert Text to Table with | as the separator. Turning the pipes into tabs first is cleaner.",
  sections: [
    {
      id: "why-word-shows-pipes",
      heading: "Why Word shows pipes instead of a table",
      body: `A Markdown table is plain text:

\`\`\`
| Task      | Owner | Due    |
| --------- | ----- | ------ |
| Draft     | Ada   | 3 Nov  |
| **Review**| Bob   | 10 Nov |
\`\`\`

A Markdown renderer turns that into a grid. Word has no Markdown renderer, so pasting the text gives you exactly what is on the clipboard: four paragraphs of characters, with the bars, the dashes and any \`**\` markers showing. The same thing happens to headings and bold text, which is covered in [why pasted AI text shows ** and ## in Word](/guides/markdown-symbols-in-word).

Word does have a tool for turning delimited text into a table, **Convert Text to Table**, and it accepts any single character as a separator. The catch is that Markdown wraps every row in pipes and adds a row of dashes, both of which Word treats as data. The three routes below deal with that in different ways:

1. Convert the whole Markdown document to \`.docx\` and let the converter build the table.
2. Turn the pipes into tabs first, then use Convert Text to Table.
3. Use Convert Text to Table on the pipes directly and clean up afterwards.`,
    },
    {
      id: "convert-to-docx",
      heading: "Route 1: convert the Markdown to a .docx",
      body: `[Markdown to Word](/markdown-to-word) reads the Markdown and writes a Word file in your browser. Paste the whole document, tables and all, and download the \`.docx\`. Each pipe table becomes a real Word table, with headings, lists and the rest of the text converted around it. To move the table into an existing document, open the file, click inside the table, select it and copy.

What the table contains:

- One Word table row per Markdown row, one cell per value, with thin single borders on every cell.
- Bold, italic, inline code and links inside cells are converted, so \`**Review**\` becomes bold text, not asterisks.
- The dashes row is removed.

Where it falls short, so you can check:

- **Rows must start and end with a pipe.** Markdown allows tables without the outer pipes (\`Task | Owner | Due\`). The Word export does not recognise those and leaves them as text. Add the outer pipes, or use route 2.
- **The header row is not styled.** It is an ordinary first row: select it and make it bold, or apply a table style from the **Table Design** tab.
- **Column alignment is ignored.** The colons in \`---:\` are dropped, so right-aligned number columns come out left-aligned.
- **Escaped pipes split.** A \`\\|\` inside a cell is treated as a cell boundary in the Word export, which adds a cell to that row. Replace it with another character first.
- **No merged cells or images.** Markdown cannot merge cells, and an image becomes its alt text.

**Copy instead of Download.** The converter's Copy button puts a formatted version on the clipboard as well as the text, and pasting that into Word usually gives you a table directly, without a file. Check the borders and widths after pasting, since Word decides how pasted web-style tables look. For a document with several tables, Download is the more dependable of the two.`,
    },
    {
      id: "pipes-to-tabs-then-convert",
      heading: "Route 2: turn the pipes into tabs, then Convert Text to Table",
      body: `Microsoft's own advice for Convert Text to Table is to use tabs as the separator when the text contains commas. Tabs are also the separator that leaves nothing behind, so this route gives the cleanest Word table.

1. Paste the table into [Remove Markdown Formatting](/remove-markdown-formatting). It drops the dashes row, removes the outer pipes, joins the cells with tab characters and strips \`**\`, backticks and link syntax inside the cells. Copy the result.
2. In Word, paste with **Keep Text Only** (press Ctrl+V, then Ctrl, then T) so each row lands as a plain paragraph with tabs inside it.
3. Click **Show/Hide ¶** on the **Home** tab. You should see a tab arrow between the values and a ¶ at the end of each row.
4. Select the rows and click **Insert > Table > Convert Text to Table**.
5. Under **Separate text at**, choose **Tabs**. Check that **Number of columns** matches your table.
6. Under **AutoFit behavior**, choose **AutoFit to contents** for a compact table or **AutoFit to window** for full width, then click **OK**.

Two things to watch. This route needs the outer pipes too: a table written without them is not converted to tabs. And an escaped \`\\|\` stays in the cell as \`\\|\`, so search for it afterwards.`,
    },
    {
      id: "convert-pipes-directly",
      heading: "Route 3: Convert Text to Table on the pipes directly",
      body: `Without any other tool, Word can still split on the pipe character:

1. Paste the Markdown table and delete the row of dashes.
2. Select the remaining rows and click **Insert > Table > Convert Text to Table**.
3. Under **Separate text at**, choose **Other** and type \`|\`.
4. Check **Number of columns**. Because each row starts and ends with a pipe, Word counts an empty column at each edge, so a three-column table needs five.
5. Click **OK**, then delete the empty first and last columns (select a column, right-click, **Delete Columns**).

The cells keep the padding spaces and any Markdown inside them, so \`**Review**\` still shows asterisks. Clean those with Find and Replace, searching for \`**\` with **Use wildcards** unticked.`,
    },
    {
      id: "finishing-the-table",
      heading: "Finishing the table",
      body: `Whichever route you used, a few touches make the table look like it was built in Word:

- **Header row.** Make the first row bold, or pick a style on the **Table Design** tab that formats the header row.
- **Number alignment.** Right-align columns of figures; none of the routes keep Markdown's alignment colons.
- **Column widths.** Drag the column borders, or use AutoFit, if a long value stretches one column.
- **From a spreadsheet instead.** If the table is going to be edited as data, convert it with [Markdown Table to Excel](/markdown-table-to-excel), open the file in Excel, and copy the range into Word. Word pastes Excel data as a table.

To turn a Word table back into Markdown later, [Word to Markdown](/word-to-markdown) converts rich text copied from Word, tables included.

Sources for the Word steps: Microsoft Support, [Convert text to a table or a table to text](https://support.microsoft.com/en-us/word/convert-text-to-a-table-or-a-table-to-text) and [Control the formatting when you paste text](https://support.microsoft.com/en-us/word/control-the-formatting-when-you-paste-text). Menu names are for Word for Microsoft 365, 2024 and 2021 on Windows, checked October 2026.`,
    },
  ],
  faqs: [
    {
      question: "Can Word convert Markdown to a table automatically?",
      answer: "No. Word has no Markdown support, so it pastes the pipes and dashes as text. Its Convert Text to Table command can split the rows on the | character, but you have to remove the dashes row and the empty edge columns yourself.",
    },
    {
      question: "Why does Convert Text to Table give me two extra columns?",
      answer: "Every Markdown row starts and ends with a pipe, so Word sees an empty value before the first pipe and after the last. Delete the first and last columns, or convert the pipes to tabs before converting.",
    },
    {
      question: "Does the Markdown to Word converter keep bold text inside table cells?",
      answer: "Yes. Bold, italic, inline code and links inside cells are converted to Word formatting. The header row is not bolded automatically, and column alignment from the Markdown is not kept.",
    },
    {
      question: "Why is my Markdown table not converted in the .docx?",
      answer: "The Word export recognises a table only when every row starts and ends with a pipe and a dashes row follows the header. Add the outer pipes and the --- row, then convert again.",
    },
  ],
  relatedTools: ["markdown-to-word", "remove-markdown-formatting", "markdown-table-to-excel"],
  relatedGuides: ["markdown-symbols-in-word", "paste-chatgpt-table-into-excel"],
};
