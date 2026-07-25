import type { FigureCopy } from "@/lib/i18n/types";

export const figures: FigureCopy = {
  "dash-widths": {
    "caption": "Un tipico uso del trattino lungo nelle bozze IA, e la stessa frase riscritta con le virgole.",
    "notes": [],
    "labels": {
      "before": "BOZZA IA",
      "after": "DOPO LA PULIZIA"
    }
  },
  "ai-tells-panel": {
    "caption": "Quattro schemi meccanici che spesso sopravvivono al copia-incolla da una chat IA.",
    "notes": [],
    "labels": {
      "eyebrow": "SEGNALI COMUNI"
    }
  },
  "hidden-characters": {
    "caption": "Uno spazio a larghezza zero è invisibile sullo schermo ma resta presente nel testo sottostante.",
    "notes": [],
    "labels": {
      "before": "COSA VEDI",
      "after": "COSA VIENE SALVATO"
    }
  },
  "markdown-in-word": {
    "caption": "La stessa risposta incollata come Markdown grezzo, e convertita per conservare la struttura.",
    "notes": [
      "Word non ha un parser Markdown, quindi i simboli vengono trattati come caratteri normali.",
      "Convertendo prima, diventano veri titoli, grassetto ed elementi di elenco."
    ],
    "labels": {
      "before": "INCOLLA COME TESTO",
      "after": "CONVERTITO"
    }
  },
  "table-to-grid": {
    "caption": "Una tabella con barre è solo testo finché non viene convertita in vere celle di foglio di calcolo.",
    "notes": [
      "Incollare la tabella grezza finisce per mettere tutti i valori in una sola colonna.",
      "Convertire in XLSX o CSV mantiene intatte righe e colonne."
    ],
    "labels": {
      "before": "MARKDOWN",
      "after": "FOGLIO DI CALCOLO",
      "region": "Regione"
    }
  },
  "transcript-to-doc": {
    "caption": "Una trascrizione di chat copiata, ristrutturata in un documento con i parlanti indicati.",
    "notes": [
      "I turni dei parlanti diventano titoli, così l'esportazione resta leggibile fuori dalla finestra di chat."
    ],
    "labels": {
      "before": "TRASCRIZIONE COPIATA",
      "after": "DOCUMENTO",
      "title": "Esportazione conversazione",
      "you": "Tu",
      "assistant": "Assistente",
      "ask": "Riassumi questo rapporto",
      "reply": "Ecco un riepilogo conciso…",
      "followUp": "Aggiungi i numeri"
    }
  },
  "smart-quotes-code": {
    "caption": "Le virgolette curve sono caratteri diversi dalle virgolette dritte che i parser si aspettano.",
    "notes": [],
    "labels": {
      "before": "INCOLLA DALLA CHAT",
      "after": "DOPO LA NORMALIZZAZIONE"
    }
  },
  "dash-ruler": {
    "caption": "Trattino, trattino medio e trattino lungo alla stessa dimensione, con i loro usi standard.",
    "notes": [],
    "labels": {
      "hyphenName": "Trattino",
      "hyphenUse": "Parole composte: well-known",
      "enName": "Trattino medio",
      "enUse": "Intervalli: 2020–2024",
      "emName": "Trattino lungo",
      "emUse": "Pause in una frase"
    }
  },
  "token-chunks": {
    "caption": "I token sono frammenti di parole, quindi il conteggio dei caratteri e quello dei token raramente coincidono.",
    "notes": [
      "37 caratteri · 7 token · circa 5,3 caratteri per token",
      "Una regola pratica per l'inglese: 1 token ≈ 4 caratteri ≈ 0,75 parole.",
      "Codice, alfabeti non latini e parole rare usano più token per carattere."
    ],
    "labels": {
      "eyebrow": "UNA FRASE, SETTE TOKEN"
    }
  }
};
