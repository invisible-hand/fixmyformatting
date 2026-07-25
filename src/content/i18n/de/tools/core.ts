import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "Markdown in Word umwandeln", description: "Markdown kostenlos und privat in ein korrekt formatiertes Word-Dokument umwandeln." },
  "markdown-to-pdf": { name: "Markdown in PDF umwandeln", description: "Markdown direkt im Browser in ein übersichtliches PDF umwandeln." },
  "markdown-to-google-docs": { name: "Markdown in Google Docs umwandeln", description: "Markdown mit Überschriften, Listen, Links und Tabellen in Google Docs übernehmen." },
  "remove-markdown-formatting": { name: "Markdown-Formatierung entfernen", description: "Sternchen, Rauten und andere Markdown-Zeichen entfernen, ohne den Text zu verlieren." },
  "markdown-table-to-excel": { name: "Markdown-Tabelle in Excel umwandeln", description: "Markdown-Tabellen in echte Excel-Zeilen und -Spalten umwandeln." },
  "markdown-table-to-csv": { name: "Markdown-Tabelle in CSV umwandeln", description: "Eine Markdown-Tabelle in eine saubere, kompatible CSV-Datei konvertieren." },
  "markdown-viewer": { name: "Markdown-Viewer online", description: "Formatiertes Markdown in Echtzeit und ohne Datei-Upload anzeigen." },
  "markdown-to-html": { name: "Markdown in HTML umwandeln", description: "Sofort sauberes, semantisches HTML aus Markdown erzeugen." },
  "word-to-markdown": { name: "Word in Markdown umwandeln", description: "Formatierten Text aus Word oder Google Docs einfügen und in Markdown umwandeln." },
  "remove-em-dashes": { name: "Gedankenstriche aus Text entfernen", description: "Lange Gedankenstriche finden und durch einfachere Satzzeichen ersetzen." },
  "clean-ai-text": { name: "ChatGPT- und KI-Text bereinigen", description: "Gedankenstriche, typografische Anführungszeichen, Emojis und versteckte Zeichen bereinigen." },
  "remove-invisible-characters": { name: "Unsichtbare Zeichen entfernen", description: "Nullbreitenzeichen, weiche Trennzeichen und Richtungsmarken erkennen und entfernen." },
};
