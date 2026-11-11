import type { FontGuideCopy } from "@/lib/i18n/types";

/**
 * English source of truth for the static sections under the Fonts Copy and
 * Paste tool. Examples written out here (plɹoʍ ollǝɥ, ꜱᴍᴀʟʟ ᴄᴀᴘꜱ) are
 * asserted against the converter in tests/fonts-page.test.tsx.
 */
export const fontGuide: FontGuideCopy = {
  tableHeading: "Every style and where its characters come from",
  tableNote:
    "Printed here so you can read it without running the tool. Each row shows ABC abc 123 in that style, the Unicode block the characters belong to, and what the style has to leave as typed. The code points were checked against the Unicode Character Database.",
  headers: {
    style: "Style",
    sample: "ABC abc 123",
    source: "Unicode block",
    covers: "What it converts",
  },
  sections: [
    {
      id: "not-fonts",
      heading: "Are copy and paste fonts really fonts?",
      body: `No. A font is a file that tells a device how to draw characters. It stays on the device, and nothing about it is carried in copied text. The styles on this page work the other way round: each letter is replaced by a **different Unicode character** that happens to look bold, cursive or gothic. A bold A from this page is not the letter A in a heavy typeface; it is the separate character U+1D400, named MATHEMATICAL BOLD CAPITAL A.

Most of these characters sit in the Mathematical Alphanumeric Symbols block. The [Unicode code chart](https://www.unicode.org/charts/PDF/U1D400.pdf) for that block says they are "to be used for mathematical variables where style variations are important semantically" and that general text should use standard letters with markup. Using them as decoration works, but it has costs:

- **Screen readers** may read a styled word letter by letter or skip it, so a listener can lose the sentence.
- **Search** in some apps and some search engines does not match styled characters to ordinary letters, so a styled name or keyword may never be found.
- **Spell check and translation** may not recognise a styled word as a word.
- **Some devices lack the characters** and show an empty box in their place.

**Where they work:** social media bios, posts and comments, chat messages, and short decorative lines where nothing is lost if a reader misses them.

**Where to avoid them:** your name or job title on a résumé or in any document, image alt text, headings and link text, file names, and anything that has to be searchable or read aloud. If styled text has ended up somewhere it should not be, [Fancy Text to Plain Text](/remove-fancy-text) turns it back into ordinary letters.`,
    },
    {
      id: "upside-down-text",
      heading: "How do you make upside-down text?",
      body: `Type your text and copy the **Upside down** row. The tool does two things: it swaps every letter for a character that looks like that letter turned half a circle, and it reverses the order, so the line reads correctly when the screen is turned around. *hello world* becomes *plɹoʍ ollǝɥ*.

Unicode has no upside-down alphabet, so flipped text is made of look-alikes. Many of the small letters come from the IPA Extensions block, where ɐ, ɥ, ɹ and ʎ are phonetic letters in their own right, and a few pairs simply trade places: b and q, d and p, n and u. Capitals and digits rely on rougher matches, such as ∀ for A, Ǝ for E, ⊥ for T and ㄥ for 7, so lowercase text flips most cleanly.

To flip text without turning the letters over, copy the **Backwards** row instead: *hello world* becomes *dlrow olleh*, with every letter unchanged.`,
    },
    {
      id: "superscript",
      heading: "How do you copy and paste superscript text?",
      body: `Type the text and copy the **Superscript** row; **Subscript** is the row under it. Digits are the dependable part: ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ and ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ all exist, along with plus, minus, equals and parentheses. That covers x², m³, H₂O and a footnote mark such as ¹.

Letters are patchier, because Unicode encoded raised and lowered letters for phonetic notation rather than as a complete alphabet:

| | Has its own character | What the tool does with the rest |
| --- | --- | --- |
| Superscript small letters | every letter except q | q stays as typed |
| Superscript capitals | A B D E G H I J K L M N O P R T U V W | C F S X Y Z use the small superscript letter; Q stays as typed |
| Subscript letters | a e h i j k l m n o p r s t u v x | b c d f g q w y z stay as typed; capitals use the small subscript letter |

In a document, use the app's own formatting instead. Word applies superscript with <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>+</kbd> and HTML has \`<sup>\` and \`<sub>\`. Real formatting works for every letter and leaves the text as ordinary characters. The Unicode characters are for places with no formatting at all, such as a bio or a chat message.`,
    },
    {
      id: "small-caps",
      heading: "How do you get small caps you can copy and paste?",
      body: `Type in lowercase and copy the **Small caps** row: *small caps* becomes *ꜱᴍᴀʟʟ ᴄᴀᴘꜱ*. Capital letters and digits are left alone, which gives the usual look of a full capital followed by small capitals.

These are separate characters named LATIN LETTER SMALL CAPITAL, encoded mostly for phonetic notation and spread over three Unicode blocks. Two letters are worth knowing about. There is **no small capital X** in Unicode, so x stays an ordinary x. And **small capital Q** (ꞯ, U+A7AF) was added in Unicode 11 in 2018, so a device with older fonts may show an empty box for it.

In a document or on a web page, use real small caps instead: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd> in Word, or \`font-variant: small-caps\` in CSS. Both keep the underlying text as ordinary letters, so it can still be searched, copied and read aloud.`,
    },
  ],
};
