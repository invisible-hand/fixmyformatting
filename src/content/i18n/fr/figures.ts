import type { FigureCopy } from "@/lib/i18n/types";

export const figures: FigureCopy = {
  "dash-widths": {
    "caption": "Un schéma typique de tirets cadratins dans un brouillon d’IA, et la même phrase réécrite avec des virgules.",
    "notes": [],
    "labels": {
      "before": "BROUILLON IA",
      "after": "APRÈS NETTOYAGE"
    }
  },
  "ai-tells-panel": {
    "caption": "Quatre schémas mécaniques qui survivent souvent à un copier-coller depuis une conversation avec une IA.",
    "notes": [],
    "labels": {
      "eyebrow": "SIGNES FRÉQUENTS"
    }
  },
  "hidden-characters": {
    "caption": "Une espace sans chasse est invisible à l’écran mais bien présente dans le texte sous-jacent.",
    "notes": [],
    "labels": {
      "before": "CE QUE VOUS VOYEZ",
      "after": "CE QUI EST RÉELLEMENT STOCKÉ"
    }
  },
  "markdown-in-word": {
    "caption": "La même réponse collée en Markdown brut, puis convertie pour que la structure soit conservée.",
    "notes": [
      "Word n’a pas d’analyseur Markdown : les symboles sont donc traités comme de simples caractères.",
      "Convertir d’abord les transforme en vrais titres, passages en gras et éléments de liste."
    ],
    "labels": {
      "before": "COLLÉ EN TEXTE BRUT",
      "after": "CONVERTI"
    }
  },
  "table-to-grid": {
    "caption": "Un tableau à barres verticales reste du texte brut tant qu’il n’est pas analysé en véritables cellules de tableur.",
    "notes": [
      "Coller le tableau brut place toutes les valeurs dans une seule colonne.",
      "La conversion en XLSX ou CSV conserve les lignes et les colonnes intactes."
    ],
    "labels": {
      "before": "MARKDOWN",
      "after": "TABLEUR",
      "region": "Région"
    }
  },
  "transcript-to-doc": {
    "caption": "Une transcription de conversation copiée, restructurée en document avec des interlocuteurs identifiés.",
    "notes": [
      "Les tours de parole deviennent des titres : l’export reste lisible en dehors de la fenêtre de conversation."
    ],
    "labels": {
      "before": "TRANSCRIPTION COPIÉE",
      "after": "DOCUMENT",
      "title": "Export de conversation",
      "you": "Vous",
      "assistant": "Assistant",
      "ask": "Résume ce rapport",
      "reply": "Voici un résumé concis…",
      "followUp": "Ajoute les chiffres"
    }
  },
  "smart-quotes-code": {
    "caption": "Les guillemets courbes sont des caractères différents des guillemets droits attendus par les analyseurs.",
    "notes": [],
    "labels": {
      "before": "COLLÉ DEPUIS LE CHAT",
      "after": "APRÈS NORMALISATION"
    }
  },
  "dash-ruler": {
    "caption": "Trait d’union, tiret demi-cadratin et tiret cadratin à la même taille, avec leurs usages habituels.",
    "notes": [],
    "labels": {
      "hyphenName": "Trait d’union",
      "hyphenUse": "Mots composés : well-known",
      "enName": "Tiret demi-cadratin",
      "enUse": "Plages : 2020–2024",
      "emName": "Tiret cadratin",
      "emUse": "Incises dans une phrase"
    }
  },
  "token-chunks": {
    "caption": "Les tokens sont des fragments de mots : le nombre de caractères et le nombre de tokens correspondent rarement.",
    "notes": [
      "36 caractères · 7 tokens · environ 5,1 caractères par token",
      "Règle approximative en anglais : 1 token ≈ 4 caractères ≈ 0,75 mot.",
      "Le code, les écritures non anglaises et les mots rares consomment plus de tokens par caractère."
    ],
    "labels": {
      "eyebrow": "UNE PHRASE, SEPT TOKENS"
    }
  }
};
