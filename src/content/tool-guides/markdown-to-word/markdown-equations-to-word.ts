import type { ToolGuide } from "../../../lib/tool-guides";

export const markdownEquationsToWord: ToolGuide = {
  parentTool: "markdown-to-word",
  slug: "markdown-equations-to-word",
  title: "Get Markdown or LaTeX Equations Into Word as Real Math",
  description: "Word shows $x^2$ from Markdown as plain text. Paste the LaTeX into an equation box (Alt+=) in LaTeX mode, then build it up. Steps, limits and fixes.",
  h1: "How do I get Markdown or LaTeX equations into Word?",
  dek: "Markdown math is LaTeX between dollar signs. Word can read LaTeX, but only inside an equation, and only once the dollar signs are gone.",
  cluster: "how-to",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Word does not read the $...$ math in Markdown. Press Alt+= to open an equation, set the Equation tab to LaTeX, paste the expression without its $ or \\[ delimiters, then press Ctrl+= to turn it into a formatted equation. Microsoft lists LaTeX input as a Microsoft 365 feature; other versions take UnicodeMath instead.",
  sections: [
    {
      id: "why-equations-arrive-as-text",
      heading: "Why equations arrive in Word as dollar signs and backslashes",
      body: `Markdown itself has no maths syntax. The equations you see in AI answers, Jupyter notebooks, GitHub files and notes apps are LaTeX written inside delimiters, which a maths library in the page (usually MathJax or KaTeX) draws as formatted equations:

| Delimiter | Meaning |
| --- | --- |
| \`$ ... $\` or \`\\( ... \\)\` | Inline maths, inside a sentence |
| \`$$ ... $$\` or \`\\[ ... \\]\` | Display maths, on its own line |

When you copy the source, with a Copy button or from a \`.md\` file, you get the LaTeX, for example \`$$\\frac{a}{b+c}$$\`. Word has no Markdown or maths renderer for pasted text, so that is what it shows.

Copying the *rendered* equation out of a web page is not a reliable alternative. Depending on the page and browser you may get the LaTeX, a jumble of symbols, accessibility text, or nothing at all.

The reliable route is to give Word the LaTeX in the one place it understands it: an equation (Microsoft calls it a math zone).`,
    },
    {
      id: "one-equation-at-a-time",
      heading: "Paste one equation into Word's equation editor",
      body: `1. Click where the equation should go and press **Alt+=** (or **Insert > Equation > Insert New Equation**). An equation box appears and the **Equation** tab opens.
2. On the Equation tab, switch the input format to **LaTeX**. Word supports two linear formats, UnicodeMath and LaTeX, and uses whichever is selected for what you type or paste.
3. Paste the expression **without its delimiters**: \`\\frac{a}{b+c}\`, not \`$$\\frac{a}{b+c}$$\`.
4. Press **Ctrl+=**, or choose **Convert > Professional**, to build it up into a formatted equation. **Ctrl+Shift+=** takes it back to the linear source if you need to edit it.

Pasting into an ordinary paragraph, outside the equation box, only ever gives you text.

[LaTeX to Word Equation](/latex-to-word) prepares copied LaTeX for step 3. What it does, exactly:

- Removes \`$$\` and \`\\[\` / \`\\]\` delimiters at the start and end of lines.
- Replaces \`\\dfrac\` with \`\\frac\`.

What it does not do: inline \`$...$\` and \`\\(...\\)\` delimiters are left alone, so delete those by hand, and it does not rewrite LaTeX that Word cannot read. Microsoft lists a few keywords as unsupported (\`\\eqarray\`, \`\\Middle\`, \`\\ldiv\`, \`\\dsmash\`) and notes that \`\\begin{}\` and \`\\end{}\` do not work, so a matrix written as \`\\begin{matrix} a & b \\\\ c & d \\end{matrix}\` must become \`\\matrix{a & b \\\\ c & d}\`. Environments such as \`aligned\` or \`cases\` need the same kind of rewrite, or splitting into separate equations.

If you reuse a formula, select the finished equation, open its dropdown arrow and choose **Save as New Equation**. It then appears in the **Insert > Equation** gallery, so you do not have to paste and convert it again.`,
    },
    {
      id: "whole-documents",
      heading: "Documents with text and equations together",
      body: `For a long answer or a notes file with prose, headings and maths mixed together, do it in two passes.

**Pass 1: the text.** Convert the Markdown with [Markdown to Word](/markdown-to-word) and download the \`.docx\`. Headings, lists, tables, bold and links become Word formatting.

Be clear about what happens to the maths in that pass: the converter has no equation support. Each formula comes through as text, dollar signs included. Worse, characters that mean something in Markdown can be misread inside formulas: two underscores in \`$x_1 + y_2$\` can be taken as italic markers and disappear, and two asterisks used for multiplication can do the same. Display equations on their own lines usually survive intact; inline ones are the ones to check.

**Pass 2: the equations.** In Word, use **Find** to search for \`$\` and replace each formula with a real equation using the steps above. Copy the LaTeX from the original Markdown rather than from the converted document, so a lost underscore does not follow it in.

If a document has dozens of equations, a dedicated converter is worth the setup. The free command-line tool Pandoc, for example, turns LaTeX maths in Markdown into native Word equations when it writes a \`.docx\`. It is a separate install and has its own rules, but it saves retyping when the maths is the point of the document.`,
    },
    {
      id: "older-word-versions",
      heading: "If your Word has no LaTeX option",
      body: `Microsoft describes LaTeX input as new for Word for Microsoft 365 subscribers, and says the other Office apps support only UnicodeMath. If you do not see a LaTeX choice on the Equation tab, the equation editor still works, but it expects UnicodeMath, a linear format that looks closer to ordinary writing:

| LaTeX | UnicodeMath |
| --- | --- |
| \`\\frac{a}{b+c}\` | \`a/(b+c)\` |
| \`x^{2}\` | \`x^2\` |
| \`\\sqrt{x}\` | \`\\sqrt(x)\` |

Many LaTeX symbol names also work in UnicodeMath through Math AutoCorrect: type \`\\alpha\`, \`\\pm\`, \`\\infty\` or \`\\times\` followed by a space inside an equation and Word replaces it with the symbol. Fractions, roots and matrices need the UnicodeMath syntax.

For simple formulas, rewriting by hand is quick. For complex ones, the Pandoc route above avoids it.`,
    },
    {
      id: "troubleshooting",
      heading: "When the equation does not build",
      body: `- **It stays as plain text.** You pasted outside the equation box. Press Alt+= first, then paste inside it.
- **It builds into the wrong thing.** The input format is set to UnicodeMath, so Word read \`\\frac{a}{b}\` as text with braces. Switch the Equation tab to LaTeX and convert again.
- **Dollar signs show inside the equation.** The delimiters came along. Remove them, or run the text through LaTeX to Word Equation first.
- **One command will not convert.** Check it against Microsoft's unsupported list and the \`\\begin\` / \`\\end\` rule above, and rewrite that part.
- **Bold and headings are missing too.** That is a separate problem: the rest of the Markdown also needs converting. See [why pasted AI text shows ** and ## in Word](/guides/markdown-symbols-in-word).

Sources: Microsoft Support, [Linear format equations using UnicodeMath and LaTeX in Word](https://support.microsoft.com/en-us/office/linear-format-equations-using-unicodemath-and-latex-in-word-2e00618d-b1fd-49d8-8cb4-8d17f25754f8) and [Write an equation or formula](https://support.microsoft.com/en-us/office/write-an-equation-or-formula-1d01cabc-ceb1-458d-bc70-7f9737722702). Checked October 2026.`,
    },
  ],
  faqs: [
    {
      question: "How do I type LaTeX in Word?",
      answer: "Press Alt+= to insert an equation, choose LaTeX as the input format on the Equation tab, type or paste the LaTeX, then press Ctrl+= or choose Convert > Professional to build it up.",
    },
    {
      question: "Why does Word show my equation as $x^2$?",
      answer: "The dollar signs are Markdown delimiters that tell a web page to render LaTeX. Word does not use them. Paste the expression without the dollar signs into an equation box instead of a normal paragraph.",
    },
    {
      question: "Does the Markdown to Word converter convert equations?",
      answer: "No. It converts headings, lists, tables, emphasis, links and code, but equations come through as text. Underscores or asterisks inside inline formulas can be misread as italics, so rebuild each equation with Alt+=.",
    },
    {
      question: "Why does \\begin{matrix} not work in Word?",
      answer: "Word's LaTeX input does not support \\begin{} and \\end{}. Write the matrix as \\matrix{a & b \\\\ c & d}, and rewrite other environments, such as aligned or cases, in a form Word accepts.",
    },
    {
      question: "Can I use LaTeX in Word 2016 or 2019?",
      answer: "Microsoft describes LaTeX input as a Word for Microsoft 365 feature. Without it, the equation editor uses UnicodeMath, so a fraction is typed as a/(b+c) rather than \\frac{a}{b+c}.",
    },
  ],
  relatedTools: ["markdown-to-word", "latex-to-word", "markdown-viewer"],
  relatedGuides: ["markdown-symbols-in-word", "export-chatgpt-conversation"],
};
