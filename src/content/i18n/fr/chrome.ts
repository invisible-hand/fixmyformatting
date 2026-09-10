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
        heading: "L'outil De-slop",
        body: ["De-slop est la seule exception au traitement 100 % navigateur : quand vous appuyez sur De-slop, le texte de l'éditeur est envoyé à l'API d'OpenAI pour une édition unique, et le résultat est renvoyé à votre navigateur. Nous ne conservons ni le texte d'entrée ni le résultat. OpenAI traite les requêtes API selon ses conditions d'utilisation des données de l'API. Aucun autre outil n'envoie de texte où que ce soit."],
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
          "Nous recueillons des comptages agrégés de pages et d’interactions pour comprendre quels outils sont utiles. Nous utilisons Vercel Analytics, qui fonctionne sans cookies, et Google Analytics, qui dépose des cookies pour mesurer les visites et les sessions. Nous ne vendons pas d’informations personnelles."
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
  "dashRemove": "Rien",
  "listLabel": "Convertir en",
  "listToParagraph": "Paragraphe",
  "listToBullets": "Liste à puces",
  "loadExample": "Charger l’exemple",
  "exampleLoaded": "Exemple chargé",
  "keepUrls": "Garder les URL des liens",
  "listMarkersLabel": "Marqueurs de liste",
  "listMarkersKeep": "Garder comme puces et numéros",
  "listMarkersRemove": "Supprimer",
  "keepCode": "Garder les blocs de code tels quels",
  "tidySpacing": "Aérer les espaces aussi",
  "showChanges": "Voir ce qui a changé",
  "stripMarkdown": "Aussi retirer les symboles Markdown",
  "deslop": "De-slop ce texte",
  "deslopping": "De-slop en cours…",
  "deslopFailed": "Impossible de de-slop le texte. Réessayez dans un instant.",
  "deslopLimit": "Limite atteinte. Cet outil coûte de l'argent à chaque passage, il autorise donc quelques passages par heure. Réessayez plus tard.",
  "privateRemote": "Cet outil envoie votre texte à OpenAI pour l'édition et ne le conserve pas. Tous les autres outils fonctionnent dans votre navigateur.",
  "unchanged": "Aucun tic d'IA détecté. Le texte est renvoyé inchangé.",
};

export const guideChrome: GuideChrome = {
  "navLabel": "Guides",
  "onThisPage": "Sur cette page",
  "toolsMentioned": "Outils mentionnés dans ce guide",
  "relatedGuides": "Guides associés",
  "home": "Accueil"
};
