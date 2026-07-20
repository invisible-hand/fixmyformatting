import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";

function inlineRuns(markdown: string) {
  const children: Array<InstanceType<typeof TextRun> | InstanceType<typeof ExternalHyperlink>> = [];
  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|_([^_\n]+)_)/g;
  let cursor = 0;
  for (const match of markdown.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) children.push(new TextRun(markdown.slice(cursor, index)));
    if (match[2] && match[3]) {
      children.push(new ExternalHyperlink({
        link: match[3],
        children: [new TextRun({ text: match[2], style: "Hyperlink" })],
      }));
    } else if (match[4]) {
      children.push(new TextRun({ text: match[4], font: "Courier New" }));
    } else if (match[5] || match[6]) {
      children.push(new TextRun({ text: match[5] ?? match[6], bold: true }));
    } else {
      children.push(new TextRun({ text: match[7] ?? match[8], italics: true }));
    }
    cursor = index + match[0].length;
  }
  if (cursor < markdown.length) children.push(new TextRun(markdown.slice(cursor)));
  return children.length ? children : [new TextRun("")];
}

function tableCells(line: string) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

export async function createMarkdownDocx(input: string) {
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const children: Array<InstanceType<typeof Paragraph> | InstanceType<typeof Table>> = [];
  let inCode = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      children.push(new Paragraph({ children: [new TextRun({ text: line, font: "Courier New" })] }));
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const levels = [
        HeadingLevel.HEADING_1,
        HeadingLevel.HEADING_2,
        HeadingLevel.HEADING_3,
        HeadingLevel.HEADING_4,
        HeadingLevel.HEADING_5,
        HeadingLevel.HEADING_6,
      ];
      children.push(new Paragraph({ children: inlineRuns(heading[2]), heading: levels[heading[1].length - 1] }));
      continue;
    }

    if (/^\|.+\|$/.test(line.trim()) && /^\|?[\s:|-]+\|?$/.test(lines[index + 1]?.trim() ?? "")) {
      const rows = [tableCells(line)];
      let cursor = index + 2;
      while (cursor < lines.length && /^\|.+\|$/.test(lines[cursor].trim())) {
        rows.push(tableCells(lines[cursor]));
        cursor += 1;
      }
      children.push(new Table({
        rows: rows.map((row) => new TableRow({
          children: row.map((cell) => new TableCell({ children: [new Paragraph({ children: inlineRuns(cell) })] })),
        })),
      }));
      index = cursor - 1;
      continue;
    }

    const unordered = line.match(/^(\s*)[-*+]\s+(.+)$/);
    if (unordered) {
      children.push(new Paragraph({
        children: inlineRuns(unordered[2]),
        bullet: { level: Math.min(8, Math.floor(unordered[1].length / 2)) },
      }));
      continue;
    }

    const ordered = line.match(/^(\s*)\d+[.)]\s+(.+)$/);
    if (ordered) {
      children.push(new Paragraph({
        children: inlineRuns(ordered[2]),
        numbering: { reference: "markdown-numbering", level: Math.min(8, Math.floor(ordered[1].length / 2)) },
      }));
      continue;
    }

    children.push(new Paragraph({ children: inlineRuns(line) }));
  }

  const numberingLevels = Array.from({ length: 9 }, (_, level) => ({
    level,
    format: LevelFormat.DECIMAL,
    text: `%${level + 1}.`,
    alignment: AlignmentType.START,
    style: { paragraph: { indent: { left: 720 + level * 360, hanging: 260 } } },
  }));
  const document = new Document({
    numbering: { config: [{ reference: "markdown-numbering", levels: numberingLevels }] },
    sections: [{ children }],
  });
  return Packer.toBlob(document);
}
