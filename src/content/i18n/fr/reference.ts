import type { ReferenceCopy } from "@/lib/i18n/types";

export const reference: ReferenceCopy = {
  guideLead: "Guide",
  pages: {
    "remove-invisible-characters": {
      heading: "Tous les caractères invisibles traités par le scanner",
      answer:
        "Le scanner de caractères invisibles supprime {count} caractères Unicode invisibles : espaces et liants de largeur nulle, traits d’union conditionnels, marques de direction et autres contrôles bidirectionnels, le lieur de mots, les opérateurs mathématiques invisibles et la marque d’ordre des octets. Les espaces ordinaires, les tabulations, les espaces insécables et les sauts de ligne sont conservés.",
      note: "Affiché ici pour que vous puissiez le lire sans lancer l’outil. U+2065 n’est pas attribué en Unicode et est également supprimé. Les tabulations, les espaces insécables et les séparateurs de ligne ou de paragraphe sont conservés, car les supprimer collerait des mots ou des lignes.",
    },
    "show-invisible-characters": {
      heading: "Tous les caractères que l’afficheur repère",
      answer:
        "L’afficheur de caractères invisibles repère {count} caractères sur place avec des étiquettes comme [ZWSP] et [NBSP] et ne supprime rien. Il signale les caractères de largeur nulle, les traits d’union conditionnels, les marques de direction, la marque d’ordre des octets, les tabulations, les espaces insécables et les séparateurs de ligne et de paragraphe.",
      note: "Affiché ici pour que vous puissiez le lire sans lancer l’outil. La colonne du scanner indique ce que le scanner de caractères invisibles fait du même caractère. L’afficheur ne repère pas les caractères sans étiquette.",
    },
    "remove-smart-quotes": {
      heading: "Quels guillemets sont remplacés",
      answer:
        "L’outil de guillemets typographiques en guillemets droits remplace les quatre caractères de guillemets courbes par des guillemets ASCII droits : les deux guillemets doubles courbes deviennent \" et les deux guillemets simples courbes, y compris l’apostrophe courbe, deviennent '. Rien d’autre n’est modifié dans le texte.",
      note: "Les autres guillemets, comme „ ‚ « » ‹ ›, ne sont pas modifiés.",
    },
    "remove-em-dashes": {
      heading: "Quels tirets sont remplacés",
      answer:
        "Le suppresseur de tirets cadratins remplace uniquement le tiret cadratin (—, U+2014) : par une virgule par défaut, ou par un point-virgule, un trait d’union ou rien. Les tirets demi-cadratins, les signes moins et les traits d’union restent tels quels.",
      note: "Après le remplacement, l’espace avant le tiret est supprimé pour ne laisser aucune espace parasite. Si le tiret est supprimé entièrement, les suites d’espaces sont réduites à une seule.",
    },
  },
  headers: {
    character: "Caractère",
    codePoint: "Point de code",
    name: "Nom Unicode",
    type: "De quoi il s’agit",
    scanner: "Scanner",
    viewer: "Étiquette de l’afficheur",
    becomes: "Devient",
    output: "Résultat de l’outil",
  },
  invisibleTypes: {
    softHyphen: "Trait d’union caché, visible seulement en fin de ligne",
    zeroWidth: "Espace ou liant de largeur nulle",
    directionMark: "Marque de direction du texte",
    bidiEmbedding: "Imbrication ou forçage bidirectionnel",
    wordJoiner: "Lieur de mots (empêche un saut de ligne)",
    mathOperator: "Opérateur mathématique invisible",
    isolate: "Isolat bidirectionnel",
    deprecated: "Contrôle de format obsolète",
    bom: "Marque d’ordre des octets",
    whitespace: "Tabulation ou espace insécable",
    separator: "Séparateur de ligne ou de paragraphe",
  },
  removed: "Supprimé",
  kept: "Conservé",
  notLabelled: "Sans étiquette",
  unchanged: "Inchangé",
  defaultLabel: "par défaut",
};
