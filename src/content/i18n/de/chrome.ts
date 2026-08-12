import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = {
  "about": {
    "metaTitle": "Über Fix My Formatting",
    "description": "Warum Fix My Formatting kostenlose, private Textwerkzeuge für den Browser entwickelt.",
    "h1": "Über Fix My Formatting",
    "dek": "Kostenlose, private Werkzeuge für die Lücke zwischen KI-Chat und dem Rest deiner Arbeit.",
    "sections": [
      {
        "body": [
          "Fix My Formatting beseitigt die kleinen, nervigen Probleme zwischen KI-Chat und dem Rest deiner Arbeit. Jedes Werkzeug ist kostenlos, öffnet sich sofort und verarbeitet Text in deinem Browser.",
          "Es gibt keine Konten, keine Bezahlschranken und keine Uploads bei der normalen Umwandlung. Wenn du einen Freigabelink erstellst, wird der Text ausdrücklich gespeichert, damit der Link funktioniert."
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "Datenschutz | Fix My Formatting",
    "description": "Datenschutzdetails zu den Browser-Werkzeugen und optionalen Freigabelinks von Fix My Formatting.",
    "h1": "Datenschutz",
    "dek": "Kurzfassung: Deine Eingabe bleibt im Browser, es sei denn, du erstellst einen Freigabelink.",
    "sections": [
      {
        "heading": "Verarbeitung im Browser",
        "body": [
          "Umwandlungen und Analysen laufen lokal auf deinem Gerät. Normale Werkzeug-Eingaben werden nicht an unsere Server gesendet."
        ]
      },
      {
        "heading": "Freigabelinks",
        "body": [
          "Wenn du „Link kopieren“ wählst, werden die Eingabe, das gewählte Werkzeug und die Einstellungen gespeichert, damit der Link geöffnet werden kann. Teile keine sensiblen oder persönlichen Daten. Freigegebene Ergebnisse laufen standardmäßig nach 180 Tagen ab."
        ]
      },
      {
        "heading": "Analysen",
        "body": [
          "Wir erfassen aggregierte Seiten- und Interaktionszahlen, um zu verstehen, welche Werkzeuge nützlich sind. Dafür nutzen wir Vercel Analytics, das ohne Cookies auskommt, und Google Analytics, das Cookies setzt, um Besuche und Sitzungen zu messen. Wir verkaufen keine persönlichen Daten."
        ]
      }
    ]
  },
  "notFound": {
    "h1": "Seite nicht gefunden",
    "dek": "Probiere stattdessen eines dieser kostenlosen Formatierungswerkzeuge."
  },
  "guidesIndex": {
    "metaTitle": "Ratgeber – KI-Textformatierung reparieren",
    "description": "Verständliche Ratgeber zu Gedankenstrichen, unsichtbaren Zeichen, Markdown-Symbolen und anderen Formatierungsmacken von KI-Texten.",
    "h1": "Ratgeber",
    "dek": "Warum KI-Texte kaputt ankommen und wie du sie reparierst. Jeder Ratgeber endet mit einem Werkzeug, das die Arbeit mit einem Klick erledigt.",
    "clusters": {
      "ai-tells": "KI-Texte erkennen",
      "how-to": "KI-Ausgaben reparieren",
      "reference": "Nachschlagen"
    }
  }
};

export const workspace: WorkspaceMessages = {
  "printPdf": "Drucken / PDF speichern",
  "downloaded": "Heruntergeladen",
  "excelDownloaded": "Excel-Datei heruntergeladen",
  "reportImageDownloaded": "Berichtsbild heruntergeladen",
  "pasteFirst": "Füge zuerst Text ein",
  "creatingLink": "Link wird erstellt…",
  "couldNotCreateLink": "Link konnte nicht erstellt werden",
  "shareUnavailable": "Teilen nicht verfügbar",
  "reportNote": "Zählt nur mechanische Artefakte. Das ist keine KI-Erkennung.",
  "conversionOptions": "Umwandlungsoptionen",
  "editorView": "Editoransicht",
  "caseLabel": "Schreibweise",
  "caseTitle": "Titelschreibweise",
  "caseSentence": "Satzschreibweise",
  "caseUpper": "GROSSBUCHSTABEN",
  "caseLower": "kleinbuchstaben",
  "dashLabel": "Gedankenstriche ersetzen durch",
  "dashComma": "Komma",
  "dashSemicolon": "Semikolon",
  "dashHyphen": "Bindestrich",
  "dashRemove": "Nichts"
};

export const guideChrome: GuideChrome = {
  "navLabel": "Ratgeber",
  "onThisPage": "Auf dieser Seite",
  "toolsMentioned": "Werkzeuge in diesem Ratgeber",
  "relatedGuides": "Ähnliche Ratgeber",
  "home": "Startseite"
};
