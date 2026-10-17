import type { ToolGuide } from "../../../lib/tool-guides";

export const pasteChatgptIntoEmailLinkedin: ToolGuide = {
  parentTool: "remove-markdown-formatting",
  slug: "paste-chatgpt-into-email-linkedin",
  title: "Paste ChatGPT Into Email or LinkedIn Without ** and ##",
  description: "Why ChatGPT text shows asterisks and hashes in Gmail, Outlook and LinkedIn, and how to paste it clean: plain text for LinkedIn, rich text for email.",
  h1: "How do I paste ChatGPT text into email or LinkedIn without the formatting symbols?",
  dek: "The asterisks and hashes are Markdown. Strip them for LinkedIn, convert them for email, and check the few places where a cleanup can go wrong.",
  cluster: "how-to",
  published: "2026-10-17",
  updated: "2026-10-17",
  answer:
    "Remove the Markdown before you paste. For a LinkedIn post, strip it to plain text: LinkedIn shows ** and ## literally and has no headings. For an email, either strip it the same way or convert it to rich text so bold and bullet lists survive. Then paste with your app's plain-text paste so no leftover styling comes along.",
  sections: [
    {
      id: "where-the-symbols-come-from",
      heading: "Where the asterisks and hashes come from",
      body: `ChatGPT, Claude and Gemini write their answers in **Markdown**, a plain-text shorthand for formatting. Two asterisks around a phrase mean bold, a hash at the start of a line means a heading, a hyphen at the start of a line means a bullet, and square brackets followed by a web address in round brackets mean a link. The chat window converts that shorthand into formatted text before you see it, so on screen the answer looks clean.

What reaches your clipboard depends on how you copy it. Selecting the rendered answer with the mouse usually copies formatted text. The copy button under an answer, a raw or code view, or an export often gives you the Markdown source instead, and the exact behaviour has changed between app versions and differs between the web, desktop and mobile apps. Either way, the destination decides what you see:

- **LinkedIn** posts do not interpret Markdown at all. Every symbol appears as typed, so a post arrives with \`**Key takeaway:**\` and \`## Why it matters\` in it.
- **Gmail and Outlook** compose windows are rich-text editors. They keep bold and lists only when the clipboard carries real formatting (HTML). Pasted Markdown is just text to them, so the symbols show.
- **Plain-text fields** such as forms, CRMs, text messages and most comment boxes show the symbols too.

The longer explanation of why Word behaves the same way is in [why pasted AI text shows ** and ## in Word](/guides/markdown-symbols-in-word).`,
    },
    {
      id: "linkedin-plain-text",
      heading: "For LinkedIn: strip it to plain text",
      body: `A LinkedIn post is plain text with line breaks. There is no bold, no italic and no heading, so the right move is to remove the Markdown rather than convert it.

1. Copy the answer from ChatGPT, whichever way you like.
2. Paste it into [Remove Markdown Formatting](/remove-markdown-formatting).
3. Leave **List markers** on Keep. Bullets become the • character, which LinkedIn displays as an ordinary character, and numbered items keep their numbers. Choose Remove if you want the list to read as prose instead.
4. Tick **Tidy spacing** so doubled spaces and stacked blank lines collapse.
5. Copy the result and paste it into the post box.

LinkedIn caps a post at 3,000 characters, according to [LinkedIn's help page on sharing posts](https://www.linkedin.com/help/linkedin/answer/a528176) (as of 2026-10-17). A ChatGPT answer can run past that easily; the [word and character counter](/word-counter) tells you where you stand before you paste.

Two things the cleanup does not do for LinkedIn. First, it does not invent bold. Some people get bold-looking text on LinkedIn by swapping letters for Unicode "mathematical" look-alikes; those characters are not letters to search engines or screen readers, which is why [Fancy Text to Plain Text](/remove-fancy-text) exists to undo them. Second, it does not change the tone. If the post still reads like a chatbot, that is a wording problem, not a formatting one.`,
    },
    {
      id: "email-two-options",
      heading: "For email: plain text or real formatting",
      body: `Email gives you a choice, because Gmail and Outlook can show real bold and real bullet lists.

**Option 1: plain text.** Run the answer through [Remove Markdown Formatting](/remove-markdown-formatting) exactly as for LinkedIn, then paste. This suits short replies and anything going to a plain-text system. Headings become ordinary lines, which in an email usually reads better anyway.

**Option 2: keep the formatting.** Paste the Markdown into [Markdown to Google Docs](/markdown-to-google-docs) and use its Copy button. That button puts both formatted HTML and plain text on the clipboard, so a rich-text editor such as Gmail or Outlook receives real bold, real lists and real links instead of symbols. The tool is named for Google Docs, but the clipboard it produces is ordinary rich text that most email clients accept. Headings arrive as large heading text, which can look heavy in a message; delete the heading lines first if you only want bold and bullets.

**Links.** By default, Remove Markdown Formatting keeps a link's visible text and drops the address, which is right when the address was decoration. If the reader needs the link, tick **Keep link URLs** to get "text (https://…)" instead. With Option 2 the link stays clickable.

**Paste as plain text.** If the destination is set up for plain text, or you copied from a rich source and want none of its fonts, use the plain-text paste: Ctrl+Shift+V in Chrome and Edge on Windows, Cmd+Shift+Option+V in many Mac apps. In Gmail the toolbar's Remove formatting button clears styling after the fact.`,
    },
    {
      id: "what-the-tool-changes",
      heading: "What the cleanup changes, and what it leaves",
      body: `Remove Markdown Formatting runs a fixed set of find-and-replace rules in your browser. Nothing is rewritten and no AI is involved, so no word is added, removed or swapped. By default:

- Heading hashes are removed; the heading text stays as its own line.
- Bold and italic asterisks and underscores are removed; the words stay.
- Links keep their visible text; images keep their alt text.
- Bullet markers become •; numbered items keep their numbers.
- Block-quote markers (>) and horizontal rules (---) are removed.
- Code fences are removed and the code inside stays, unless you tick **Keep code blocks**.
- Pipe tables become rows of tab-separated cells, with the dashed alignment row dropped.

Identifiers such as snake_case_word and MY_ENV_VAR keep their underscores. Tick **Show what changed** to see a word-level diff that marks every character the cleanup removed, which is the quickest way to confirm that only symbols went.`,
    },
    {
      id: "where-it-gets-things-wrong",
      heading: "Where it can get things wrong",
      body: `The rules are simple, and simple rules have edges. Check these before you send:

- **Asterisks and tildes used as characters.** A pair of asterisks or tildes is read as emphasis, even when it is not. "2 * 3 * 4" loses both asterisks, and "about ~5 to ~10" loses both tildes. Footnote stars and math are the usual victims.
- **Tables.** Tab-separated rows are right for a spreadsheet and wrong for LinkedIn, which does not line up tabs. Rewrite a table as sentences or a short list before posting it.
- **Headings.** They become ordinary lines with no visual weight. In a long email that can make the structure hard to follow; add a blank line or turn the heading into a short opening sentence.
- **Nested lists.** The indentation is removed along with the marker, so sub-items become bullets at the same level as their parents. Re-indent them by hand or fold them into the parent item.

The cleanup also leaves non-Markdown artifacts alone: em dashes, curly quotes, emoji and invisible characters pass through untouched. If you want those gone too, the [AI Formatting Humanizer](/humanize-ai-text) normalizes them in one pass without changing a word. And if you want to keep all of the Markdown in a document rather than an email, [Markdown to Word](/markdown-to-word) converts it into real Word formatting.`,
    },
  ],
  faqs: [
    {
      question: "Why does my LinkedIn post show asterisks around words?",
      answer: "LinkedIn posts are plain text and do not read Markdown. The two asterisks were ChatGPT's way of marking bold, and LinkedIn shows them as typed. Strip them before posting; LinkedIn has no built-in bold to convert them into.",
    },
    {
      question: "Can I keep bold text when pasting ChatGPT output into Gmail?",
      answer: "Yes, if the clipboard carries rich text. Convert the Markdown with Markdown to Google Docs and use its Copy button, which places formatted HTML on the clipboard. Gmail then shows real bold and lists instead of symbols.",
    },
    {
      question: "Does removing Markdown change any of my words?",
      answer: "No. Remove Markdown Formatting only deletes formatting characters such as asterisks, hashes, backticks and brackets. Tick Show what changed to see a diff that marks exactly what was removed.",
    },
    {
      question: "What happens to links when I strip the formatting?",
      answer: "By default the link's visible text stays and the web address is dropped. Tick Keep link URLs to keep the address in brackets after the text, which is safer for email and plain-text fields.",
    },
    {
      question: "Is my text uploaded when I clean it?",
      answer: "No. The cleanup runs in your browser and the text is not sent to a server. It is stored only if you choose to create a share link.",
    },
  ],
  relatedTools: ["remove-markdown-formatting", "markdown-to-google-docs", "word-counter", "humanize-ai-text"],
  relatedGuides: ["markdown-symbols-in-word", "export-chatgpt-conversation"],
};
