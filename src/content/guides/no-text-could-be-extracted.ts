import type { GuideDefinition } from "../../lib/guides";

export const noTextExtracted: GuideDefinition = {
  slug: "no-text-could-be-extracted",
  title: "ChatGPT: “No Text Could Be Extracted From This File”",
  description: "Usually the PDF is a scan — pictures of text with no text layer. Here is the ten-second test, how to OCR it, and what to do when OCR is not an option.",
  h1: "Why does ChatGPT say “No text could be extracted from this file”?",
  dek: "Nearly always because the file is a picture of a document rather than a document.",
  cluster: "how-to",
  published: "2026-09-01",
  updated: "2026-09-01",
  answer:
    "The error almost always means the file is image-based: a scan or a photograph, holding pictures of text rather than a text layer, so there is literally nothing to extract until the characters are recognized. Test it in ten seconds — open the file and try to select a word with your cursor, or search for a visible word with Ctrl/Cmd + F. If neither works, run the file through OCR (Adobe Acrobat, macOS Preview, or uploading it to Google Drive and opening it with Google Docs), then re-upload it. Faster still: copy the recognized text and paste it straight into the chat.",
  sections: [
    {
      id: "does-your-pdf-have-text",
      heading: "How can you tell whether your PDF has a text layer?",
      body: `This is the diagnostic that settles the question, and it takes about ten seconds. Open the file in any PDF viewer and try both of these:

1. **Select a word with the cursor.** Click and drag across a line of text. If you get a clean text selection with a highlighted run of characters, there is a text layer. If you get a rectangle, a lasso, or nothing at all, there is not.
2. **Search for a word you can see.** Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd> and type a word that is plainly visible on the page. If the viewer reports no results for a word you are looking at, the page is an image.

If both tests fail, the file is a picture of a document. Nothing is wrong with it and nothing is corrupt — it simply contains no characters, only pixels arranged to look like characters. Any tool that reads text from it, including a chat assistant's file-extraction step, has nothing to read.

The same test works in reverse for diagnosing a partial failure. Some documents are mixed: a text-based report with a scanned appendix, or a contract where only the signature page was scanned back in. Select-and-search page by page and you will find exactly where the text layer stops.

A related case is a Word document or image that behaves the same way. A \`.docx\` containing only screenshots has no extractable text either, and a photograph of a page is the purest form of the problem.`,
    },
    {
      id: "scanned-and-photographed",
      heading: "Scanned and photographed documents",
      body: `A scanner and a phone camera both do the same thing: they record light, not language. The output is an image, and wrapping that image in a PDF container does not change what it holds. This is why a 40-page scanned contract can be a large file and still contain zero characters.

The fix is OCR — optical character recognition — which looks at the image, recognizes the shapes as letters, and writes a real text layer underneath. Several routes, all of them workable:

- **Adobe Acrobat.** Its text-recognition feature runs OCR over a scanned PDF in place and saves a searchable version. The most thorough option if you have it.
- **macOS Preview and Live Text.** Open the PDF or image in Preview; on recent macOS versions the text in an image becomes selectable and copyable directly. Select it, copy it, and you have the text without producing a new file at all. The same works on iPhone and iPad in Photos.
- **Microsoft Word.** Opening a PDF in Word converts it to an editable document, and Word runs recognition on the pages while doing so. Results vary with scan quality, but for a clean scan it is often enough. Microsoft OneNote can also extract text from an inserted image printout.
- **Google Drive.** Upload the PDF to Drive, right-click it, and choose *Open with → Google Docs*. Drive runs OCR during the conversion and hands you a Google Doc containing the recognized text. This is the most reliable free route for most people, and it needs nothing installed.
- **Phone scanner apps.** Most modern scanning apps — including the scan feature built into the iOS Notes app and Google Drive on Android — can produce a searchable PDF rather than a plain image. If you are the one creating the file, turning that option on removes the problem at the source.

Once OCR has run, you have two options. Re-upload the new searchable file, or skip the round trip entirely: select the recognized text, copy it, and paste it directly into the chat. Pasting is faster, avoids a second extraction step, and works even when the OCR output is messy, because you can see what you are pasting.

Two things to expect from OCR. Accuracy tracks scan quality — a straight, high-contrast, 300 dpi scan reads almost perfectly; a phone photo taken at an angle in poor light will produce errors. And recognition does not preserve layout intelligently, so multi-column pages and tables frequently come out interleaved. Read the first paragraph of the output before trusting the rest.`,
    },
    {
      id: "other-causes",
      heading: "What else causes the error?",
      body: `Image-based PDFs account for most of these failures, but not all. The rest divide into a handful of distinct causes, each with its own fix.

| Cause | How to recognize it | What to do |
| --- | --- | --- |
| **Password or permission restrictions** | The file asks for a password, or a properties dialog shows copying or extraction disallowed | Open it with the password and re-save an unrestricted copy, or print it to a new PDF |
| **Corrupt or partial download** | The file fails to open, opens blank, or is much smaller than expected | Download it again, ideally from the original source rather than a mail attachment |
| **Genuinely no text** | The document is charts, diagrams, photographs, or slides made of images | There is nothing to extract; describe the content or export the underlying data |
| **Broken encoding or unmapped fonts** | Text looks correct on screen but pastes as gibberish or as boxes | Re-export the PDF from the source application with fonts embedded properly |
| **File too large** | Upload fails or stalls on a big document | Split it into sections, or extract just the pages you need |
| **Wrong or mislabelled type** | A \`.pdf\` extension on something that is not a PDF, or an unsupported format | Open it locally to see what it really is, then re-save it in a normal format |

Two of these deserve a longer note.

**Permission-restricted PDFs** are the confusing case, because the file looks completely normal. It opens, the text selects, search works — and extraction still fails, because the document carries a flag saying copying and extraction are not permitted. If you have the right to the content, opening it and printing to a new PDF generally produces a clean file, since printing renders the pages afresh.

**Broken font mapping** is the case that fools everyone. A PDF can display text perfectly while providing no correct mapping from its glyphs back to Unicode characters, usually because of an unusual embedded or subsetted font. The giveaway is that the page reads fine but copying a sentence produces nonsense — random letters, boxes, or blank output. There is no repairing this from the PDF side; either re-export from whatever created it, or treat the file as an image and run OCR on it, which sidesteps the font problem entirely by reading the pixels.

Upload size limits and supported file types change over time and differ between products, so rather than trusting any number you read, test it yourself: try a small, plainly text-based PDF. If that uploads and reads fine, the problem is your file, not the limit.`,
    },
    {
      id: "when-nothing-works",
      heading: "What to do when nothing works",
      body: `There is a fallback that never fails, because it removes the extraction step altogether: get the text out yourself and paste it as text.

1. **Copy from the source application.** If the document exists as a Word file, a Google Doc, an email, or a web page, copy it from there rather than from the PDF. The original always has a clean text layer.
2. **Export to plain text.** Most applications will save or export as \`.txt\`, which strips every container problem at once.
3. **Copy the OCR output.** If you ran recognition, copy the recognized text rather than re-uploading the new file.

Text pulled out this way usually arrives messy, and that is where a cleanup pass helps before you paste it into a chat:

- Copying from a PDF puts a hard line break at the end of every visual line, so paragraphs arrive shattered into fragments. [Remove Line Breaks](/remove-line-breaks) rejoins them while keeping real paragraph breaks intact — worth doing, because fragmented text is harder for a model to read as continuous prose.
- If you copied rich text out of Word or Google Docs, [Word to Markdown](/word-to-markdown) converts headings, lists, and tables into plain-text structure that survives being pasted anywhere.
- If the text carries smart quotes, invisible characters, or other artifacts picked up along the way, [AI Text Cleaner](/clean-ai-text) reports and removes them.

All three run in your browser, which matters when the document you could not upload is a contract or a medical record.

One more thing worth doing: paste in sections rather than all at once. A 60-page document pasted as one block is unwieldy for both of you. Paste the part you actually have a question about.`,
    },
    {
      id: "other-tools",
      heading: "Does this happen in other tools?",
      body: `Yes, and for the same reason. Any system that reads an uploaded document has to extract characters from it first, and no extractor can invent characters that are not there. The wording differs — some tools say no text was found, some report an empty document, some accept the file and then behave as though it were blank — but an image-based PDF defeats all of them equally.

The practical consequence is that the fix transfers. If a file fails in one assistant, converting it once with OCR fixes it everywhere, and pasting the text as text works in every tool without exception.

Where products genuinely differ is in what they do with images as images, and that changes often enough that it is not worth memorizing. Test it with your own file rather than relying on what was true last year. What does not change is the underlying rule: a text layer can be read, and pixels have to be recognized first.`,
    },
  ],
  faqs: [
    {
      question: "Why does ChatGPT say no text could be extracted?",
      answer:
        "Because the file contains no extractable characters. Almost always it is an image-based PDF — a scan or photograph holding pictures of text rather than a text layer. Less often it is password-restricted, corrupt, genuinely empty, or built with fonts that have no Unicode mapping.",
    },
    {
      question: "How do I know if my PDF is scanned?",
      answer:
        "Open it and try to select a word with your cursor, then press Ctrl/Cmd + F and search for a word you can plainly see on the page. If you cannot select text and search finds nothing, the page is an image and the PDF is a scan.",
    },
    {
      question: "How do I OCR a PDF for free?",
      answer:
        "Upload it to Google Drive, right-click, and choose Open with Google Docs — Drive runs OCR during the conversion. On a Mac, opening the file in Preview often lets you select the text directly. Opening a PDF in Microsoft Word also runs recognition while converting it.",
    },
    {
      question: "Why can I see the text but the file still will not extract?",
      answer:
        "Seeing text proves only that the page renders it, not that characters are stored. A scan shows text as pixels, and some PDFs display real glyphs with no correct mapping back to Unicode. The test is whether you can select and search the text, not whether you can read it.",
    },
    {
      question: "Does uploading an image instead of a PDF help?",
      answer:
        "Not on its own — a photo of a page has the same problem as a scanned PDF, since neither contains characters. What a model can do with an image as an image varies by product and changes over time, so test it with your own file. Running OCR and pasting the text works regardless.",
    },
    {
      question: "What if the PDF is password protected?",
      answer:
        "A password or a permission restriction can block extraction even when the document opens and displays normally. If you have the right to the content, open it with the password and print it to a new PDF, which renders the pages afresh into an unrestricted file.",
    },
    {
      question: "What is the fastest fix when I am blocked right now?",
      answer:
        "Skip the file. Copy the text from wherever it originally came from, or from OCR output, and paste it straight into the chat. If it arrives broken into fragmented lines, run it through Remove Line Breaks first so the paragraphs read as continuous prose.",
    },
  ],
  relatedTools: ["remove-line-breaks", "word-to-markdown", "clean-ai-text"],
  relatedGuides: ["export-chatgpt-conversation", "markdown-symbols-in-word"],
};
