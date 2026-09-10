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
        heading: "Das De-slop-Werkzeug",
        body: ["De-slop ist die einzige Ausnahme von der reinen Browser-Verarbeitung: Wenn du auf De-slop klickst, wird der Text im Editor für eine einzelne Bearbeitung an OpenAIs API gesendet, und das Ergebnis kommt zurück in deinen Browser. Wir speichern weder die Eingabe noch die Ausgabe. OpenAI verarbeitet API-Anfragen nach seinen Bedingungen zur API-Datennutzung. Kein anderes Werkzeug sendet Text irgendwohin."],
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
  "dashRemove": "Nichts",
  "listLabel": "Umwandeln in",
  "listToParagraph": "Fließtext",
  "listToBullets": "Aufzählung",
  "loadExample": "Beispiel laden",
  "exampleLoaded": "Beispiel geladen",
  "keepUrls": "Link-URLs behalten",
  "listMarkersLabel": "Listenzeichen",
  "listMarkersKeep": "Als Aufzählung und Nummerierung behalten",
  "listMarkersRemove": "Entfernen",
  "keepCode": "Codeblöcke wie geschrieben behalten",
  "tidySpacing": "Leerraum auch aufräumen",
  "showChanges": "Änderungen anzeigen",
  "stripMarkdown": "Auch Markdown-Symbole entfernen",
  "deslop": "Text de-sloppen",
  "deslopping": "De-slop läuft …",
  "deslopFailed": "Der Text konnte nicht de-sloppt werden. Versuch es gleich noch einmal.",
  "deslopLimit": "Limit erreicht. Dieses Werkzeug kostet pro Durchlauf Geld, daher sind nur wenige Durchläufe pro Stunde erlaubt. Versuch es später erneut.",
  "privateRemote": "Dieses Werkzeug sendet deinen Text zur Bearbeitung an OpenAI und speichert ihn nicht. Alle anderen Werkzeuge laufen in deinem Browser.",
  "unchanged": "Keine KI-Muster gefunden. Text unverändert zurückgegeben.",
  "remoteEmpty": "Text einfügen und auf De-slop klicken. Die Bearbeitung dauert einige Sekunden.",
};

export const guideChrome: GuideChrome = {
  "navLabel": "Ratgeber",
  "onThisPage": "Auf dieser Seite",
  "toolsMentioned": "Werkzeuge in diesem Ratgeber",
  "relatedGuides": "Ähnliche Ratgeber",
  "home": "Startseite"
};
