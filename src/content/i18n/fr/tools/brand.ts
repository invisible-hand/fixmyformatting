import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
    "to-word": "{brand} en Word",
    "to-pdf": "{brand} en PDF",
    "to-google-docs": "{brand} en Google Docs",
    "table-to-excel": "Tableau {brand} en Excel",
    "remove-formatting": "{brand} sans formatage",
  },
  actionTitle: {
    "to-word": "{brand} en Word — Gratuit et instantané",
    "to-pdf": "{brand} en PDF — Conversion gratuite en ligne",
    "to-google-docs": "{brand} en Google Docs — Conversion gratuite",
    "table-to-excel": "Tableau {brand} en Excel — Gratuit",
    "remove-formatting": "{brand} sans formatage Markdown — Gratuit",
  },
  actionDescription: {
    "to-word": "Convertissez les réponses de {brand} en documents Word modifiables, avec titres, listes, code et tableaux conservés.",
    "to-pdf": "Convertissez les réponses de {brand} en fichiers PDF propres et prêts à imprimer, sans envoyer votre texte.",
    "to-google-docs": "Transférez le contenu de {brand} dans Google Docs en conservant titres, listes, liens, emphases et tableaux.",
    "table-to-excel": "Convertissez les tableaux Markdown de {brand} en véritables lignes et colonnes Excel, prêtes à trier et à modifier.",
    "remove-formatting": "Supprimez le formatage Markdown des réponses de {brand} tout en conservant le texte lisible intact.",
  },
  actionGuidance: {
    "to-word": "Utilisez cet outil quand une réponse de {brand} doit devenir un rapport, une note de synthèse, un devoir ou un document que d'autres personnes peuvent modifier dans Word.",
    "to-pdf": "L'aperçu en direct montre comment la réponse de {brand} s'imprimera avant que vous choisissiez Enregistrer au format PDF dans votre navigateur.",
    "to-google-docs": "Copiez le résultat en texte enrichi et collez-le dans Google Docs quand un collage classique depuis {brand} laisse apparaître des symboles Markdown.",
    "table-to-excel": "Cet outil corrige la syntaxe des tableaux en barres et tirets affichés par {brand} et télécharge un véritable classeur .xlsx.",
    "remove-formatting": "Utilisez le texte nettoyé dans les e-mails, les formulaires, les messageries ou les éditeurs qui affichent littéralement les astérisques et les marques de titres de {brand}.",
  },
  reasons: {
    "chatgpt": "ChatGPT renvoie souvent une structure utile en Markdown, ce qui fait apparaître des astérisques, des dièses et des tableaux à barres verticales lors du collage dans un logiciel de bureautique.",
    "claude": "Claude rédige fréquemment des réponses longues et soigneusement structurées, dont les titres et les tableaux doivent être convertis avant de se comporter comme un document normal.",
    "gemini": "Les tableaux de Gemini peuvent se coller sous forme de barres verticales et de tirets de séparation visibles, car le contenu du chat utilise Markdown plutôt que des cellules de tableur.",
    "copilot": "Les réponses de Copilot mélangent prose, listes et Markdown orienté code ; un collage direct risque donc de ne pas préserver la hiérarchie visuelle.",
    "perplexity": "Les réponses de Perplexity combinent souvent une structure Markdown et des liens de citation, ce qui rend une conversion propre importante pour réutiliser une recherche.",
    "deepseek": "DeepSeek formate fréquemment ses réponses techniques en Markdown, y compris le code délimité et les formules qu'un collage simple laisse apparaître.",
    "grok": "Grok structure ses réponses en Markdown : titres, listes et tableaux à pipes se collent dans les suites bureautiques comme des symboles bruts plutôt que comme de la mise en forme.",
  },
  faqs: [
    { question: "Comment utiliser {name} ?", answer: "Copiez le contenu concerné depuis {brand}, collez-le dans l'éditeur ci-dessus et utilisez immédiatement le résultat en direct." },
    { question: "Ma conversation {brand} est-elle envoyée ?", answer: "Non. La conversion s'effectue dans votre navigateur. Le texte n'est stocké que si vous créez explicitement un lien de partage." },
    { question: "Puis-je modifier le résultat {brand} converti ?", answer: "Oui. Le résultat reste modifiable lorsqu'il est copié ou téléchargé dans un format modifiable." },
  ],
};
