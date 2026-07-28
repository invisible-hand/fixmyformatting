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
        "heading": "Link condivisi",
        "body": [
          "Quando selezioni «Copia link al risultato», il testo, lo strumento selezionato e le impostazioni vengono salvati affinché il link possa essere aperto. Non condividere informazioni sensibili o personali. I risultati condivisi scadono dopo 180 giorni per impostazione predefinita."
        ]
      },
      {
        "heading": "Analisi",
        "body": [
          "Raccogliamo conteggi aggregati di pagine e interazioni per capire quali strumenti sono utili. Usiamo Vercel Analytics e Google Analytics in una modalità senza cookie, che non installa cookie né conserva alcun identificatore che ti riguardi. Non vendiamo informazioni personali."
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
  "dashRemove": "Niente"
};

export const guideChrome: GuideChrome = {
  "navLabel": "Guide",
  "onThisPage": "In questa pagina",
  "toolsMentioned": "Strumenti citati in questa guida",
  "relatedGuides": "Guide correlate",
  "home": "Home"
};
