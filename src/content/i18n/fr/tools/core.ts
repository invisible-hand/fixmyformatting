import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "Convertir Markdown en Word", description: "Convertissez gratuitement et en privé du Markdown en document Word bien structuré." },
  "markdown-to-pdf": { name: "Convertir Markdown en PDF", description: "Transformez du Markdown en PDF propre directement dans votre navigateur." },
  "markdown-to-google-docs": { name: "Convertir Markdown en Google Docs", description: "Copiez du Markdown dans Google Docs en conservant titres, listes, liens et tableaux." },
  "remove-markdown-formatting": { name: "Supprimer le formatage Markdown", description: "Retirez astérisques, dièses et autres symboles Markdown sans perdre le texte." },
  "markdown-table-to-excel": { name: "Convertir un tableau Markdown en Excel", description: "Transformez les tableaux Markdown en véritables lignes et colonnes Excel." },
  "markdown-table-to-csv": { name: "Convertir un tableau Markdown en CSV", description: "Convertissez un tableau Markdown en fichier CSV propre et compatible." },
  "markdown-viewer": { name: "Visionneuse Markdown en ligne", description: "Affichez le Markdown mis en forme en temps réel, sans envoyer de fichier." },
  "markdown-to-html": { name: "Convertir Markdown en HTML", description: "Générez instantanément un HTML propre et sémantique depuis du Markdown." },
  "word-to-markdown": { name: "Convertir Word en Markdown", description: "Collez du texte enrichi de Word ou Google Docs et convertissez-le en Markdown." },
  "remove-em-dashes": { name: "Supprimer les tirets cadratins", description: "Repérez et remplacez les tirets cadratins par une ponctuation plus simple." },
  "clean-ai-text": { name: "Nettoyer les textes ChatGPT et IA", description: "Nettoyez tirets, guillemets courbes, emojis et caractères cachés des textes IA." },
  "remove-invisible-characters": { name: "Supprimer les caractères invisibles", description: "Détectez et supprimez espaces sans chasse, césures et marques directionnelles." },
};
