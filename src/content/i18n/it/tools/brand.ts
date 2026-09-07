import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
    "to-word": "Da {brand} a Word",
    "to-pdf": "Da {brand} a PDF",
    "to-google-docs": "Da {brand} a Google Docs",
    "table-to-excel": "Tabella {brand} in Excel",
    "remove-formatting": "Rimuovere formattazione {brand}",
  },
  actionTitle: {
    "to-word": "Convertire {brand} in Word gratis",
    "to-pdf": "Convertire {brand} in PDF online gratis",
    "to-google-docs": "Convertire {brand} in Google Docs online",
    "table-to-excel": "Convertire tabella {brand} in Excel gratis",
    "remove-formatting": "Rimuovere formattazione Markdown da {brand}",
  },
  actionDescription: {
    "to-word": "Trasforma una risposta di {brand} in un vero file .docx con stili Word, tabelle ed elenchi annidati, link e codice, creato nel browser.",
    "to-pdf": "Trasforma una risposta di {brand} in un PDF pronto per la stampa partendo dall’anteprima nel browser. Nulla viene caricato, nessuna filigrana.",
    "to-google-docs": "Incolla una risposta di {brand}, copia il risultato formattato e portalo in Google Docs con titoli, elenchi, link, enfasi e tabelle intatti.",
    "table-to-excel": "Incolla la tabella di {brand} finita in un’unica colonna Excel e scarica un vero .xlsx con un valore per cella e numeri che restano numeri.",
    "remove-formatting": "Elimina asterischi, cancelletti e link Markdown da {brand} senza cambiare una parola. Mantieni URL, elenchi o codice, e vedi cosa cambia.",
  },
  actionGuidance: {
    "to-word": "Usa questa opzione quando una risposta di {brand} deve diventare un rapporto, un brief, un compito o un documento che altri possono modificare in Word.",
    "to-pdf": "L’anteprima live mostra come verrà stampata la risposta di {brand} prima che tu scelga Salva come PDF nel browser.",
    "to-google-docs": "Copia il risultato formattato e incollalo in Google Docs quando un normale incolla da {brand} lascia visibili i simboli Markdown.",
    "table-to-excel": "Usa questa opzione quando una tabella di {brand} si incolla nella colonna A con le barre ancora visibili: l’anteprima mostra le celle e il download è un vero file .xlsx.",
    "remove-formatting": "Usa il testo pulito in email, moduli, app di messaggistica o editor che mostrano letteralmente gli asterischi e i segni dei titoli di {brand}; gli interruttori sopra l’editor mantengono URL, marcatori di elenco o codice.",
  },
  reasons: {
    "chatgpt": "ChatGPT spesso restituisce strutture utili in Markdown, che mostrano asterischi, cancelletti e tabelle con barre quando vengono incollate nei programmi da ufficio.",
    "claude": "Claude scrive spesso risposte lunghe e ben strutturate, i cui titoli e tabelle vanno convertiti prima di comportarsi come un documento normale.",
    "gemini": "Le tabelle di Gemini possono apparire come barre visibili e trattini separatori, perché l’output della chat usa Markdown invece di celle di foglio di calcolo.",
    "copilot": "Le risposte di Copilot mescolano prosa, elenchi e Markdown tecnico, quindi un incolla diretto potrebbe non conservare la gerarchia visiva.",
    "perplexity": "Le risposte di Perplexity spesso combinano struttura Markdown e link di citazione, rendendo importante una conversione pulita quando si riutilizza la ricerca.",
    "deepseek": "DeepSeek formatta comunemente le risposte tecniche in Markdown, inclusi blocchi di codice e formule che un incolla semplice lascia esposti.",
    "grok": "Grok struttura le risposte in Markdown, quindi titoli, elenchi e tabelle a pipe si incollano nei programmi da ufficio come simboli grezzi anziché come formattazione.",
  },
  faqs: [
    { question: "Come si usa {name}?", answer: "Copia il contenuto che ti interessa da {brand}, incollalo nell’editor qui sopra e usa subito il risultato live." },
    { question: "La mia conversazione con {brand} viene caricata?", answer: "No. La conversione avviene nel browser. Il testo viene salvato solo se crei esplicitamente un link condiviso." },
    { question: "Posso modificare il risultato convertito da {brand}?", answer: "Sì. Il risultato resta modificabile quando lo copi o lo scarichi in un formato modificabile." },
  ],
};
