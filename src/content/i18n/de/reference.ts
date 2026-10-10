import type { ReferenceCopy } from "@/lib/i18n/types";

export const reference: ReferenceCopy = {
  guideLead: "Ratgeber",
  pages: {
    "remove-invisible-characters": {
      heading: "Alle unsichtbaren Zeichen, die der Scanner behandelt",
      answer:
        "Der Scanner für unsichtbare Zeichen entfernt {count} unsichtbare Unicode-Zeichen: Leerzeichen und Verbinder ohne Breite, weiche Trennstriche, Richtungsmarken und andere bidirektionale Steuerzeichen, den Wortverbinder, unsichtbare mathematische Operatoren und die Byte-Reihenfolge-Markierung. Normale Leerzeichen, Tabulatoren, geschützte Leerzeichen und Zeilenumbrüche bleiben erhalten.",
      note: "Hier ausgedruckt, damit du es ohne Ausführen des Werkzeugs lesen kannst. U+2065 ist in Unicode nicht belegt und wird ebenfalls entfernt. Tabulatoren, geschützte Leerzeichen sowie Zeilen- und Absatztrenner bleiben erhalten, weil ihr Löschen Wörter oder Zeilen zusammenziehen würde.",
    },
    "show-invisible-characters": {
      heading: "Alle Zeichen, die der Viewer kennzeichnet",
      answer:
        "Der Viewer für unsichtbare Zeichen kennzeichnet {count} Zeichen direkt an Ort und Stelle mit Markierungen wie [ZWSP] und [NBSP] und löscht nichts. Er markiert Zeichen ohne Breite, weiche Trennstriche, Richtungsmarken, die Byte-Reihenfolge-Markierung, Tabulatoren, geschützte Leerzeichen sowie Zeilen- und Absatztrenner.",
      note: "Hier ausgedruckt, damit du es ohne Ausführen des Werkzeugs lesen kannst. Die Scanner-Spalte zeigt, was der Scanner für unsichtbare Zeichen mit demselben Zeichen macht. Zeichen ohne Markierung kennzeichnet der Viewer nicht.",
    },
    "remove-smart-quotes": {
      heading: "Welche Anführungszeichen ersetzt werden",
      answer:
        "Das Werkzeug für typografische zu geraden Anführungszeichen ersetzt die vier geschwungenen Anführungszeichen durch gerade ASCII-Zeichen: beide geschwungenen doppelten Anführungszeichen werden zu \" und beide geschwungenen einfachen, einschließlich des geschwungenen Apostrophs, zu '. Sonst wird nichts im Text verändert.",
      note: "Andere Anführungszeichen wie „ ‚ « » ‹ › bleiben unverändert.",
    },
    "remove-em-dashes": {
      heading: "Welche Striche ersetzt werden",
      answer:
        "Der Gedankenstrich-Entferner ersetzt nur den Geviertstrich (—, U+2014): standardmäßig durch ein Komma, auf Wunsch durch ein Semikolon, einen Bindestrich oder nichts. Halbgeviertstriche, Minuszeichen und Bindestriche bleiben, wie sie sind.",
      note: "Nach dem Ersetzen wird das Leerzeichen vor dem Strich entfernt, damit kein überflüssiges Leerzeichen bleibt. Wird der Strich ganz entfernt, werden mehrere Leerzeichen zu einem zusammengezogen.",
    },
  },
  headers: {
    character: "Zeichen",
    codePoint: "Codepunkt",
    name: "Unicode-Name",
    type: "Was es ist",
    scanner: "Scanner",
    viewer: "Viewer-Markierung",
    becomes: "Wird zu",
    output: "Ergebnis des Werkzeugs",
  },
  invisibleTypes: {
    softHyphen: "Verborgener Trennstrich, nur am Zeilenumbruch sichtbar",
    zeroWidth: "Leerzeichen oder Verbinder ohne Breite",
    directionMark: "Textrichtungsmarke",
    bidiEmbedding: "Bidirektionale Einbettung oder Überschreibung",
    wordJoiner: "Wortverbinder (verhindert einen Zeilenumbruch)",
    mathOperator: "Unsichtbarer mathematischer Operator",
    isolate: "Bidirektionale Isolierung",
    deprecated: "Veraltetes Formatsteuerzeichen",
    bom: "Byte-Reihenfolge-Markierung",
    whitespace: "Tabulator oder geschütztes Leerzeichen",
    separator: "Zeilen- oder Absatztrenner",
  },
  removed: "Entfernt",
  kept: "Bleibt",
  notLabelled: "Nicht markiert",
  unchanged: "Unverändert",
  defaultLabel: "Standard",
};
