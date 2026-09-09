import type { ToolCopy } from "@/lib/i18n/types";

export const deSlop: ToolCopy = {
  name: "De-slop: ripulisci il testo dai tic dell'IA",
  title: "De-slop: rimuovi i tic di scrittura IA",
  description: "Rimuovi i tic dell'IA dal testo: lineette, “approfondire”, “non solo X ma anche Y”, triadi forzate, chiusure da chatbot. Significato e fatti intatti.",
  intro:
    "Lo slop è la scrittura che tradisce un modello linguistico: la lineetta come pausa di default, \"approfondire\", \"tessuto\" e \"testimonianza\", \"non solo X ma anche Y\", ogni elenco allungato fino a tre voci, frasi che si chiudono con \"sottolineandone l'importanza\", una conclusione che ripete il paragrafo. De-slop invia il tuo testo a un modello linguistico con istruzioni di editing costruite sulla pagina Signs of AI writing di Wikipedia e restituisce lo stesso testo senza quei tic. È una correzione, non una riscrittura: ogni fatto, numero, nome, citazione e URL resta come scritto, la lingua del testo originale è mantenuta, la lunghezza resta entro circa il quindici percento, e codice e Markdown con una struttura reale non vengono toccati. La formattazione decorativa sparisce: elenchi puntati con emoji, grassetto casuale, titoli su una nota breve, linee orizzontali. Attiva Mostra cosa è cambiato per vedere un confronto parola per parola della modifica. Poiché ogni esecuzione ha un costo, il testo è limitato a 8.000 caratteri e un visitatore ha a disposizione poche esecuzioni all'ora; gli strumenti meccanici di questo sito restano senza limiti.",
  placeholder:
    "Incolla qui un testo scritto dall'IA, poi premi De-slop. Lineette, \"approfondire\", \"non solo X ma anche Y\" e gli altri tic vengono rimossi; significato e fatti restano invariati.",
  faqs: [
    {
      question: "Cosa conta come slop e cosa cambia De-slop?",
      answer:
        "Sono i tic che i redattori usano per riconoscere un testo scritto da una macchina, catalogati nella pagina Signs of AI writing di Wikipedia: parole tipiche dell'IA come approfondire, tessuto, testimonianza, cruciale, solido e fluido; parallelismi negativi come \"non solo X ma anche Y\"; elenchi allungati fino a esattamente tre voci; \"funge da\" e \"vanta\" al posto di \"è\" e \"ha\"; attribuzioni vaghe come \"gli esperti concordano\"; frasi finali come \"sottolineandone l'importanza\"; affermazioni di importanza vuote; la lineetta come pausa di default; elenchi puntati con emoji, grassetto casuale e titoli su testi brevi; aperture e chiusure da chatbot. Ognuno viene sostituito con l'affermazione semplice oppure eliminato.",
    },
    {
      question: "Il mio testo viene caricato?",
      answer:
        "Sì, solo per questo strumento. Il testo viene inviato all'API di OpenAI (GPT-5.6 Terra) per la singola modifica e il risultato torna al tuo browser. Fix My Formatting non memorizza né l'input né l'output, e OpenAI gestisce le richieste API secondo i propri termini sull'uso dei dati per le API, diversi dai termini di ChatGPT consumer. Tutti gli altri strumenti di questo sito funzionano interamente nel browser.",
    },
    {
      question: "Perché c'è un limite?",
      answer:
        "Ogni esecuzione ha un costo reale per la chiamata al modello, quindi lo strumento accetta fino a 8.000 caratteri per volta e consente un numero limitato di esecuzioni all'ora per visitatore, con un tetto giornaliero per l'intero sito. Lo strumento è gratuito e non richiede un account; quando il limite viene raggiunto, un messaggio chiaro te lo segnala e puoi riprovare più tardi.",
    },
  ],
};
