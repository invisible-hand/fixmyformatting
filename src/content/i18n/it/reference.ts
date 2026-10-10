import type { ReferenceCopy } from "@/lib/i18n/types";

export const reference: ReferenceCopy = {
  guideLead: "Guida",
  pages: {
    "remove-invisible-characters": {
      heading: "Tutti i caratteri invisibili gestiti dallo scanner",
      answer:
        "Lo scanner di caratteri invisibili rimuove {count} caratteri Unicode invisibili: spazi e giunzioni a larghezza zero, trattini morbidi, indicatori di direzione e altri controlli bidirezionali, il congiuntore di parole, gli operatori matematici invisibili e il byte order mark. Spazi normali, tabulazioni, spazi non separabili e a capo vengono mantenuti.",
      note: "Riportato qui per poterlo leggere senza usare lo strumento. U+2065 non è assegnato in Unicode e viene rimosso anch’esso. Tabulazioni, spazi non separabili e separatori di riga o di paragrafo vengono mantenuti, perché eliminarli unirebbe parole o righe.",
    },
    "show-invisible-characters": {
      heading: "Tutti i caratteri che il visualizzatore etichetta",
      answer:
        "Il visualizzatore di caratteri invisibili etichetta {count} caratteri direttamente nel testo con indicatori come [ZWSP] e [NBSP] e non elimina nulla. Segnala i caratteri a larghezza zero, i trattini morbidi, gli indicatori di direzione, il byte order mark, le tabulazioni, gli spazi non separabili e i separatori di riga e di paragrafo.",
      note: "Riportato qui per poterlo leggere senza usare lo strumento. La colonna dello scanner mostra cosa fa lo scanner di caratteri invisibili con lo stesso carattere. I caratteri senza etichetta non vengono segnalati dal visualizzatore.",
    },
    "remove-smart-quotes": {
      heading: "Quali virgolette vengono sostituite",
      answer:
        "Lo strumento da virgolette tipografiche a virgolette dritte sostituisce i quattro caratteri di virgolette curve con virgolette ASCII dritte: entrambe le virgolette doppie curve diventano \" ed entrambe le virgolette singole curve, compreso l’apostrofo curvo, diventano '. Nient’altro nel testo viene modificato.",
      note: "Le altre virgolette, come „ ‚ « » ‹ ›, non vengono modificate.",
    },
    "remove-em-dashes": {
      heading: "Quali trattini vengono sostituiti",
      answer:
        "Il rimuovitore di trattini lunghi sostituisce solo il trattino lungo (—, U+2014): per impostazione predefinita con una virgola, oppure con un punto e virgola, un trattino o niente. I trattini medi, i segni meno e i trattini restano come sono.",
      note: "Dopo la sostituzione viene tolto lo spazio prima del trattino, così non resta nessuno spazio di troppo. Se il trattino viene eliminato del tutto, le sequenze di spazi si riducono a uno.",
    },
  },
  headers: {
    character: "Carattere",
    codePoint: "Punto di codice",
    name: "Nome Unicode",
    type: "Che cos’è",
    scanner: "Scanner",
    viewer: "Etichetta del visualizzatore",
    becomes: "Diventa",
    output: "Risultato dello strumento",
  },
  invisibleTypes: {
    softHyphen: "Trattino nascosto visibile solo a fine riga",
    zeroWidth: "Spazio o giunzione a larghezza zero",
    directionMark: "Indicatore di direzione del testo",
    bidiEmbedding: "Incorporamento o sovrascrittura bidirezionale",
    wordJoiner: "Congiuntore di parole (impedisce l’a capo)",
    mathOperator: "Operatore matematico invisibile",
    isolate: "Isolamento bidirezionale",
    deprecated: "Controllo di formato obsoleto",
    bom: "Byte order mark",
    whitespace: "Tabulazione o spazio non separabile",
    separator: "Separatore di riga o di paragrafo",
  },
  removed: "Rimosso",
  kept: "Mantenuto",
  notLabelled: "Senza etichetta",
  unchanged: "Invariato",
  defaultLabel: "predefinito",
};
