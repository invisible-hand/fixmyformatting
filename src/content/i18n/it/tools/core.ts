import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "Convertire Markdown in Word", description: "Converti Markdown in un documento Word ben formattato, gratis e in privato." },
  "markdown-to-pdf": { name: "Convertire Markdown in PDF", description: "Trasforma Markdown in un PDF pulito direttamente nel browser." },
  "markdown-to-google-docs": { name: "Convertire Markdown in Google Docs", description: "Porta Markdown in Google Docs conservando titoli, elenchi, link e tabelle." },
  "remove-markdown-formatting": { name: "Rimuovere la formattazione Markdown", description: "Elimina asterischi, cancelletti e altri simboli Markdown senza perdere il testo." },
  "markdown-table-to-excel": { name: "Convertire tabella Markdown in Excel", description: "Trasforma le tabelle Markdown in vere righe e colonne Excel." },
  "markdown-table-to-csv": { name: "Convertire tabella Markdown in CSV", description: "Converti una tabella Markdown in un file CSV pulito e compatibile." },
  "markdown-viewer": { name: "Visualizzatore Markdown online", description: "Visualizza Markdown formattato in tempo reale senza caricare file." },
  "markdown-to-html": { name: "Convertire Markdown in HTML", description: "Genera subito HTML pulito e semantico a partire da Markdown." },
  "word-to-markdown": { name: "Convertire Word in Markdown", description: "Incolla testo formattato da Word o Google Docs e convertilo in Markdown." },
  "remove-em-dashes": { name: "Rimuovere i trattini lunghi", description: "Trova e sostituisci i trattini lunghi con una punteggiatura più semplice." },
  "clean-ai-text": { name: "Pulire il testo di ChatGPT e IA", description: "Pulisci trattini, virgolette curve, emoji e caratteri nascosti dai testi IA." },
  "remove-invisible-characters": { name: "Rimuovere caratteri invisibili", description: "Rileva e rimuovi spazi a larghezza zero, trattini morbidi e segni direzionali." },
};
