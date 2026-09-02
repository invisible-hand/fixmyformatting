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
    "to-word": "Converti le risposte di {brand} in un vero file Word .docx, con titoli, elenchi, tabelle, link e codice conservati come formattazione.",
    "to-pdf": "Trasforma una risposta di {brand} in un PDF pronto per la stampa partendo dall’anteprima nel browser. Nulla viene caricato, nessuna filigrana.",
    "to-google-docs": "Incolla una risposta di {brand}, copia il risultato formattato e portalo in Google Docs con titoli, elenchi, link, enfasi e tabelle intatti.",
    "table-to-excel": "Trasforma le tabelle con barre e trattini che {brand} mostra in chat in un vero file .xlsx con un valore per cella, pronto da ordinare in Excel.",
    "remove-formatting": "Elimina asterischi, cancelletti e sintassi dei link da una risposta di {brand}, conservando il testo leggibile per email, moduli e app.",
  },
  actionGuidance: {
    "to-word": "Usa questa opzione quando una risposta di {brand} deve diventare un rapporto, un brief, un compito o un documento che altri possono modificare in Word.",
    "to-pdf": "L’anteprima live mostra come verrà stampata la risposta di {brand} prima che tu scelga Salva come PDF nel browser.",
    "to-google-docs": "Copia il risultato formattato e incollalo in Google Docs quando un normale incolla da {brand} lascia visibili i simboli Markdown.",
    "table-to-excel": "Questo strumento sistema la sintassi delle tabelle con barre e trattini che {brand} mostra in chat e scarica un vero foglio di calcolo .xlsx.",
    "remove-formatting": "Usa il testo pulito in email, moduli, app di messaggistica o editor che mostrano letteralmente gli asterischi e i cancelletti di {brand}.",
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
