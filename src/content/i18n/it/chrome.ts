import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = {
  "about": {
    "metaTitle": "Informazioni su Fix My Formatting",
    "description": "Perché Fix My Formatting crea strumenti di testo gratuiti, privati e basati sul browser.",
    "h1": "Informazioni su Fix My Formatting",
    "dek": "Strumenti gratuiti e privati per colmare il divario tra le chat IA e il resto del tuo lavoro.",
    "sections": [
      {
        "body": [
          "Fix My Formatting fa sparire i piccoli problemi fastidiosi che si frappongono tra le chat IA e il resto del tuo lavoro. Ogni strumento è gratuito, si apre all’istante ed elabora il testo nel tuo browser.",
          "Non ci sono account, paywall né caricamenti durante la conversione normale. Se scegli di creare un link condiviso, quell’azione salva esplicitamente il testo affinché il link possa funzionare."
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "Privacy | Fix My Formatting",
    "description": "Dettagli sulla privacy per gli strumenti browser di Fix My Formatting e i link condivisi opzionali.",
    "h1": "Privacy",
    "dek": "In breve: il testo inserito resta nel tuo browser, a meno che tu non crei un link condiviso.",
    "sections": [
      {
        "heading": "Elaborazione nel browser",
        "body": [
          "Le conversioni e le analisi vengono eseguite localmente sul tuo dispositivo. Il testo inserito negli strumenti non viene inviato ai nostri server."
        ]
      },
      {
        heading: "Lo strumento De-slop",
        body: ["De-slop è l'unica eccezione all'elaborazione esclusivamente nel browser: quando premi De-slop, il testo nell'editor viene inviato all'API di OpenAI per una singola modifica e il risultato torna al tuo browser. Non memorizziamo né l'input né l'output. OpenAI elabora le richieste API secondo i propri termini sull'uso dei dati per le API. Nessun altro strumento invia testo altrove."],
      },
      {
        "heading": "Link condivisi",
        "body": [
          "Quando selezioni «Copia link al risultato», il testo, lo strumento selezionato e le impostazioni vengono salvati affinché il link possa essere aperto. Non condividere informazioni sensibili o personali. I risultati condivisi scadono dopo 180 giorni per impostazione predefinita."
        ]
      },
      {
        "heading": "Analisi",
        "body": [
          "Raccogliamo conteggi aggregati di pagine e interazioni per capire quali strumenti sono utili. Usiamo Vercel Analytics, che funziona senza cookie, e Google Analytics, che installa cookie per misurare visite e sessioni. Non vendiamo informazioni personali."
        ]
      }
    ]
  },
  "notFound": {
    "h1": "Pagina non trovata",
    "dek": "Prova invece uno di questi strumenti gratuiti di formattazione."
  },
  "guidesIndex": {
    "metaTitle": "Guide — Correggere la formattazione dei testi IA",
    "description": "Guide in linguaggio semplice su trattini lunghi, caratteri invisibili, simboli Markdown e le altre stranezze di formattazione dei testi generati dall’IA.",
    "h1": "Guide",
    "dek": "Perché i testi IA arrivano rovinati e come sistemarli. Ogni guida termina con uno strumento che fa il lavoro in un clic.",
    "clusters": {
      "ai-tells": "Riconoscere i testi IA",
      "how-to": "Correggere l’output IA",
      "reference": "Riferimenti"
    }
  }
};

export const workspace: WorkspaceMessages = {
  "printPdf": "Stampa / Salva PDF",
  "downloaded": "Scaricato",
  "excelDownloaded": "File Excel scaricato",
  "reportImageDownloaded": "Immagine del rapporto scaricata",
  "pasteFirst": "Incolla prima del testo",
  "creatingLink": "Creazione del link…",
  "couldNotCreateLink": "Impossibile creare il link",
  "shareUnavailable": "Condivisione non disponibile",
  "reportNote": "Conta solo gli artefatti meccanici. Non è un rilevamento di testi IA.",
  "conversionOptions": "Opzioni di conversione",
  "editorView": "Vista editor",
  "caseLabel": "Maiuscole",
  "caseTitle": "Title Case",
  "caseSentence": "Sentence case",
  "caseUpper": "MAIUSCOLO",
  "caseLower": "minuscolo",
  "dashLabel": "Sostituisci i trattini lunghi con",
  "dashComma": "Virgola",
  "dashSemicolon": "Punto e virgola",
  "dashHyphen": "Trattino",
  "dashRemove": "Niente",
  "listLabel": "Converti in",
  "listToParagraph": "Paragrafo",
  "listToBullets": "Elenco puntato",
  "loadExample": "Carica un esempio",
  "exampleLoaded": "Esempio caricato",
  "keepUrls": "Mantieni URL dei link",
  "listMarkersLabel": "Marcatori di elenco",
  "listMarkersKeep": "Mantieni come elenchi puntati e numerati",
  "listMarkersRemove": "Rimuovi",
  "keepCode": "Mantieni i blocchi di codice come scritti",
  "tidySpacing": "Sistema anche la spaziatura",
  "showChanges": "Mostra cosa è cambiato",
  "stripMarkdown": "Rimuovi anche i simboli Markdown",
  "deslop": "De-slop questo testo",
  "deslopping": "De-slop in corso…",
  "deslopFailed": "Impossibile applicare De-slop al testo. Riprova tra poco.",
  "deslopLimit": "Limite raggiunto. Questo strumento ha un costo per ogni esecuzione, quindi ne consente solo alcune all'ora. Riprova più tardi.",
  "privateRemote": "Questo strumento invia il tuo testo a OpenAI per la modifica e non lo memorizza. Tutti gli altri strumenti funzionano nel tuo browser.",
  "unchanged": "Nessun tic dell'IA trovato. Il testo è stato restituito invariato.",
  "remoteEmpty": "Incolla il testo e premi De-slop. La modifica richiede qualche secondo.",
};

export const guideChrome: GuideChrome = {
  "navLabel": "Guide",
  "onThisPage": "In questa pagina",
  "toolsMentioned": "Strumenti citati in questa guida",
  "relatedGuides": "Guide correlate",
  "home": "Home"
};
