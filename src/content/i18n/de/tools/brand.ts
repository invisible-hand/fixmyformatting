import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
    "to-word": "{brand} in Word",
    "to-pdf": "{brand} in PDF",
    "to-google-docs": "{brand} in Google Docs",
    "table-to-excel": "{brand}-Tabelle in Excel",
    "remove-formatting": "{brand}-Formatierung entfernen",
  },
  actionTitle: {
    "to-word": "{brand} in Word umwandeln – kostenlos & sofort",
    "to-pdf": "{brand} in PDF umwandeln – kostenlos im Browser",
    "to-google-docs": "{brand} in Google Docs umwandeln",
    "table-to-excel": "{brand}-Tabelle in Excel umwandeln",
    "remove-formatting": "{brand}-Formatierung online entfernen",
  },
  actionDescription: {
    "to-word": "Antworten aus {brand} in bearbeitbare Word-Dokumente umwandeln – mit erhaltenen Überschriften, Listen, Code und Tabellen.",
    "to-pdf": "Antworten aus {brand} über die formatierte Vorschau in ein druckfertiges PDF umwandeln – im Browser, ohne Upload und ohne Wasserzeichen.",
    "to-google-docs": "Inhalte aus {brand} in Google Docs übernehmen – mit erhaltenen Überschriften, Listen, Links, Hervorhebungen und Tabellen.",
    "table-to-excel": "Markdown-Tabellen aus {brand} in echte Excel-Zeilen und -Spalten umwandeln – bereit zum Sortieren und Bearbeiten.",
    "remove-formatting": "Sternchen, Rauten und Link-Syntax aus {brand}-Antworten entfernen und den lesbaren Text behalten – für E-Mails, Formulare und Messenger.",
  },
  actionGuidance: {
    "to-word": "Nutze dieses Werkzeug, wenn eine {brand}-Antwort zu einem Bericht, Briefing, einer Aufgabe oder einem Dokument werden soll, das andere in Word bearbeiten können.",
    "to-pdf": "Die Live-Vorschau zeigt, wie die {brand}-Antwort gedruckt aussehen wird, bevor du im Browser „Als PDF speichern“ wählst.",
    "to-google-docs": "Kopiere das formatierte Ergebnis und füge es in Google Docs ein, wenn ein normales Einfügen aus {brand} sichtbare Markdown-Zeichen hinterlässt.",
    "table-to-excel": "Das Werkzeug repariert die Tabellensyntax mit senkrechten Strichen und Bindestrichen aus dem {brand}-Chat und lädt eine echte .xlsx-Datei herunter.",
    "remove-formatting": "Verwende den bereinigten Text in E-Mails, Formularen, Messengern oder Editoren, die Sternchen und Überschriftenzeichen aus {brand} wörtlich anzeigen.",
  },
  reasons: {
    "chatgpt": "ChatGPT liefert nützliche Strukturen oft als Markdown – beim Einfügen in Office-Programme bleiben Sternchen, Rauten und Pipe-Tabellen sichtbar.",
    "claude": "Claude schreibt häufig lange, sorgfältig strukturierte Antworten, deren Überschriften und Tabellen erst umgewandelt werden müssen, damit sie sich wie ein normales Dokument verhalten.",
    "gemini": "Tabellen aus Gemini werden beim Einfügen oft als sichtbare Pipes und Trennstriche dargestellt, weil die Chat-Ausgabe Markdown statt Tabellenzellen verwendet.",
    "copilot": "Antworten aus Copilot mischen Fließtext, Listen und codeorientiertes Markdown, sodass ein direktes Einfügen die visuelle Hierarchie verlieren kann.",
    "perplexity": "Antworten von Perplexity kombinieren oft Markdown-Struktur mit Quellenlinks – eine saubere Umwandlung ist wichtig, wenn du Rechercheergebnisse weiterverwendest.",
    "deepseek": "DeepSeek formatiert technische Antworten meist in Markdown, inklusive Codeblöcken und Formeln, die beim einfachen Einfügen sichtbar bleiben.",
    "grok": "Grok strukturiert seine Antworten als Markdown, sodass Überschriften, Listen und Pipe-Tabellen in Office-Programmen als rohe Symbole statt als Formatierung erscheinen.",
  },
  faqs: [
    { question: "Wie verwende ich {name}?", answer: "Kopiere den gewünschten Inhalt aus {brand}, füge ihn oben in den Editor ein und nutze das Live-Ergebnis sofort." },
    { question: "Wird meine {brand}-Unterhaltung hochgeladen?", answer: "Nein. Die Umwandlung läuft in deinem Browser. Text wird nur gespeichert, wenn du ausdrücklich einen Freigabelink erstellst." },
    { question: "Kann ich das umgewandelte {brand}-Ergebnis bearbeiten?", answer: "Ja. Das Ergebnis bleibt bearbeitbar, wenn es kopiert oder in einem bearbeitbaren Format heruntergeladen wird." },
  ],
};
