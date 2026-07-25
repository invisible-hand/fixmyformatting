import type { FigureCopy } from "@/lib/i18n/types";

export const figures: FigureCopy = {
  "dash-widths": {
    "caption": "Ein für KI-Entwürfe typisches Gedankenstrich-Muster und derselbe Satz mit Kommas umgeschrieben.",
    "notes": [],
    "labels": {
      "before": "KI-ENTWURF",
      "after": "NACH BEREINIGUNG"
    }
  },
  "ai-tells-panel": {
    "caption": "Vier mechanische Muster, die ein Copy-and-paste aus einem KI-Chat oft überleben.",
    "notes": [],
    "labels": {
      "eyebrow": "TYPISCHE MERKMALE"
    }
  },
  "hidden-characters": {
    "caption": "Ein Nullbreiten-Leerzeichen ist auf dem Bildschirm unsichtbar, aber im zugrunde liegenden Text vorhanden.",
    "notes": [],
    "labels": {
      "before": "WAS DU SIEHST",
      "after": "WAS TATSÄCHLICH GESPEICHERT IST"
    }
  },
  "markdown-in-word": {
    "caption": "Dieselbe Antwort als rohes Markdown eingefügt und so umgewandelt, dass die Struktur erhalten bleibt.",
    "notes": [
      "Word hat keinen Markdown-Parser, daher werden die Zeichen als gewöhnliche Zeichen behandelt.",
      "Eine vorherige Umwandlung macht daraus echte Überschriften, Fettdruck und Listeneinträge."
    ],
    "labels": {
      "before": "ALS REINTEXT EINGEFÜGT",
      "after": "UMGEWANDELT"
    }
  },
  "table-to-grid": {
    "caption": "Eine Pipe-Tabelle ist reiner Text, bis sie in echte Tabellenzellen zerlegt wird.",
    "notes": [
      "Beim Einfügen der rohen Tabelle landet jeder Wert in einer einzigen Spalte.",
      "Die Umwandlung in XLSX oder CSV erhält Zeilen und Spalten."
    ],
    "labels": {
      "before": "MARKDOWN",
      "after": "TABELLENKALKULATION",
      "region": "Region"
    }
  },
  "transcript-to-doc": {
    "caption": "Ein kopiertes Chat-Protokoll, umstrukturiert zu einem Dokument mit gekennzeichneten Sprechern.",
    "notes": [
      "Sprecherwechsel werden zu Überschriften, sodass der Export auch außerhalb des Chatfensters lesbar bleibt."
    ],
    "labels": {
      "before": "KOPIERTES PROTOKOLL",
      "after": "DOKUMENT",
      "title": "Unterhaltungsexport",
      "you": "Du",
      "assistant": "Assistent",
      "ask": "Fasse diesen Bericht zusammen",
      "reply": "Hier ist eine kurze Zusammenfassung…",
      "followUp": "Ergänze die Zahlen"
    }
  },
  "smart-quotes-code": {
    "caption": "Geschwungene Anführungszeichen sind andere Zeichen als die geraden Anführungszeichen, die Parser erwarten.",
    "notes": [],
    "labels": {
      "before": "AUS CHAT EINGEFÜGT",
      "after": "NACH NORMALISIERUNG"
    }
  },
  "dash-ruler": {
    "caption": "Bindestrich, Halbgeviertstrich und Geviertstrich in gleicher Schriftgröße mit ihren üblichen Verwendungen.",
    "notes": [],
    "labels": {
      "hyphenName": "Bindestrich",
      "hyphenUse": "Zusammensetzungen: well-known",
      "enName": "Halbgeviertstrich",
      "enUse": "Bereiche: 2020–2024",
      "emName": "Geviertstrich",
      "emUse": "Einschübe im Satz"
    }
  },
  "token-chunks": {
    "caption": "Tokens sind Wortfragmente, daher stimmen Zeichenzahl und Token-Anzahl selten überein.",
    "notes": [
      "37 Zeichen · 7 Tokens · etwa 5,3 Zeichen pro Token",
      "Grobe Faustregel für Englisch: 1 Token ≈ 4 Zeichen ≈ 0,75 Wörter.",
      "Code, nichtenglische Schriften und seltene Wörter verbrauchen mehr Tokens pro Zeichen."
    ],
    "labels": {
      "eyebrow": "EIN SATZ, SIEBEN TOKENS"
    }
  }
};
