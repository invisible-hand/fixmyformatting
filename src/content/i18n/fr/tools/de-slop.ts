import type { ToolCopy } from "@/lib/i18n/types";

export const deSlop: ToolCopy = {
  name: "De-slop : nettoyer les tics d'IA",
  title: "De-slop : nettoyer les tics d'écriture IA",
  description:
    "Tirets cadratins, « delve », « non seulement X mais Y », triades forcées, formules de clôture des chatbots : De-slop les retire. Sens et faits intacts.",
  intro:
    "Le slop, c'est ce qui trahit un texte écrit par une IA : le tiret cadratin comme pause par défaut, « delve », « tapestry » et « testament », les tournures « non seulement X mais aussi Y », chaque liste gonflée à exactement trois éléments, des phrases qui se terminent sur « soulignant ainsi son importance », une conclusion qui reformule le paragraphe. De-slop envoie votre texte à un modèle de langage avec une consigne d'édition construite à partir de la liste des signes d'écriture IA de Wikipédia, et vous rend le même texte débarrassé de ces tics. C'est une édition, pas une réécriture : chaque fait, chiffre, nom, citation et URL reste tel quel, la langue du texte d'origine est conservée, la longueur varie de quinze pour cent au plus, et le code ou le Markdown porteurs d'une vraie structure ne sont pas touchés. La mise en forme décorative disparaît : puces en emoji, gras aléatoire, titres sur une note courte, lignes horizontales. Cochez Voir ce qui a changé pour un diff mot à mot de l'édition. Comme chaque passage coûte de l'argent, le texte est limité à 8 000 caractères et un visiteur dispose de quelques passages par heure ; les outils mécaniques du site restent illimités.",
  placeholder:
    "Collez ici un texte écrit par une IA, puis appuyez sur De-slop. Tirets cadratins, « delve », « non seulement X mais Y » et le reste des tics sont corrigés ; sens et faits restent intacts.",
  faqs: [
    {
      question: "Qu'est-ce que le slop, et que change De-slop ?",
      answer:
        "Les tics que les relecteurs utilisent pour repérer un texte écrit par une machine, tels que recensés sur la page des signes d'écriture IA de Wikipédia : un vocabulaire caractéristique comme delve, tapestry, testament, pivotal, robust ou seamless ; des parallélismes négatifs du type « non seulement X mais aussi Y » ; des listes gonflées à exactement trois éléments ; « serves as » ou « boasts » à la place de « is » ou « has » ; des attributions vagues comme « les experts s'accordent » ; des clauses finales du type « soulignant ainsi son importance » ; des affirmations d'importance sans contenu ; le tiret cadratin comme pause par défaut ; puces en emoji, gras aléatoire et titres sur un texte court ; formules d'ouverture et de clôture de chatbot. Chacun est remplacé par une formulation simple, ou supprimé.",
    },
    {
      question: "Mon texte est-il envoyé quelque part ?",
      answer:
        "Oui, pour cet outil uniquement. Le texte est envoyé à l'API d'OpenAI (GPT-5.6 Terra) pour cette édition unique, et le résultat est renvoyé à votre navigateur. Fix My Formatting ne conserve ni le texte d'entrée ni le résultat. Tous les autres outils du site continuent de fonctionner entièrement dans votre navigateur.",
    },
    {
      question: "Pourquoi y a-t-il une limite ?",
      answer:
        "Chaque passage a un coût réel, celui de l'appel au modèle : l'outil accepte jusqu'à 8 000 caractères par passage et autorise quelques passages par heure et par visiteur, avec un plafond quotidien pour l'ensemble du site. Le service est gratuit et ne demande aucun compte.",
    },
  ],
};
