import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = {
  "about": {
    "metaTitle": "À propos de Fix My Formatting",
    "description": "Pourquoi Fix My Formatting crée des outils de texte gratuits et privés, directement dans le navigateur.",
    "h1": "À propos de Fix My Formatting",
    "dek": "Des outils gratuits et privés pour combler le fossé entre les conversations IA et le reste de votre travail.",
    "sections": [
      {
        "body": [
          "Fix My Formatting fait disparaître les petits problèmes agaçants qui surviennent entre les conversations IA et le reste de votre travail. Chaque outil est gratuit, s’ouvre instantanément et traite le texte dans votre navigateur.",
          "Il n’y a ni compte, ni paywall, ni envoi de fichier pendant une conversion normale. Si vous choisissez de créer un lien de partage, cette action stocke explicitement le texte pour que le lien fonctionne."
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "Confidentialité | Fix My Formatting",
    "description": "Détails sur la confidentialité des outils Fix My Formatting et des liens de partage optionnels.",
    "h1": "Confidentialité",
    "dek": "En bref : le texte saisi reste dans votre navigateur, sauf si vous créez un lien de partage.",
    "sections": [
      {
        "heading": "Traitement dans le navigateur",
        "body": [
          "Les conversions et analyses s’exécutent localement sur votre appareil. Le texte saisi dans les outils n’est pas envoyé à nos serveurs."
        ]
      },
      {
        "heading": "Liens de partage",
        "body": [
          "Lorsque vous sélectionnez « Copier le lien du résultat », le texte saisi, l’outil choisi et les réglages sont stockés pour que le lien puisse être ouvert. Ne partagez pas d’informations sensibles ou personnelles. Les résultats partagés expirent après 180 jours par défaut."
        ]
      },
      {
        "heading": "Statistiques",
        "body": [
          "Nous recueillons des comptages agrégés de pages et d’interactions pour comprendre quels outils sont utiles. Nous ne vendons pas d’informations personnelles."
        ]
      }
    ]
  },
  "notFound": {
    "h1": "Page introuvable",
    "dek": "Essayez plutôt l’un de ces outils de mise en forme gratuits."
  },
  "guidesIndex": {
    "metaTitle": "Guides — Corriger la mise en forme des textes IA",
    "description": "Des guides clairs sur les tirets cadratins, les caractères invisibles, les symboles Markdown et les autres bizarreries des textes générés par IA.",
    "h1": "Guides",
    "dek": "Pourquoi les textes IA arrivent mal formatés, et comment les corriger. Chaque guide se termine par un outil qui fait le travail en un clic.",
    "clusters": {
      "ai-tells": "Repérer les textes IA",
      "how-to": "Corriger les textes IA",
      "reference": "Référence"
    }
  }
};

export const workspace: WorkspaceMessages = {
  "printPdf": "Imprimer / Enregistrer en PDF",
  "downloaded": "Téléchargé",
  "excelDownloaded": "Fichier Excel téléchargé",
  "reportImageDownloaded": "Image du rapport téléchargée",
  "pasteFirst": "Collez d’abord du texte",
  "creatingLink": "Création du lien…",
  "couldNotCreateLink": "Impossible de créer le lien",
  "shareUnavailable": "Partage indisponible",
  "reportNote": "Compte uniquement les artefacts mécaniques. Ce n’est pas une détection d’IA.",
  "conversionOptions": "Options de conversion",
  "editorView": "Vue de l’éditeur",
  "caseLabel": "Casse",
  "caseTitle": "Casse de titre",
  "caseSentence": "Casse de phrase",
  "caseUpper": "MAJUSCULES",
  "caseLower": "minuscules",
  "dashLabel": "Remplacer les tirets cadratins par",
  "dashComma": "Virgule",
  "dashSemicolon": "Point-virgule",
  "dashHyphen": "Tiret",
  "dashRemove": "Rien"
};

export const guideChrome: GuideChrome = {
  "navLabel": "Guides",
  "onThisPage": "Sur cette page",
  "toolsMentioned": "Outils mentionnés dans ce guide",
  "relatedGuides": "Guides associés",
  "home": "Accueil"
};
