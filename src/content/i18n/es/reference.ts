import type { ReferenceCopy } from "@/lib/i18n/types";

export const reference: ReferenceCopy = {
  guideLead: "Guía",
  pages: {
    "remove-invisible-characters": {
      heading: "Todos los caracteres invisibles que gestiona el escáner",
      answer:
        "El escáner de caracteres invisibles elimina {count} caracteres Unicode invisibles: espacios y uniones de ancho cero, guiones suaves, marcas de dirección y otros controles bidireccionales, el unidor de palabras, los operadores matemáticos invisibles y la marca de orden de bytes. Los espacios normales, las tabulaciones, los espacios de no separación y los saltos de línea se conservan.",
      note: "Se muestra aquí para que puedas leerlo sin usar la herramienta. U+2065 no está asignado en Unicode y también se elimina. Las tabulaciones, los espacios de no separación y los separadores de línea o de párrafo se conservan, porque borrarlos uniría palabras o líneas.",
    },
    "show-invisible-characters": {
      heading: "Todos los caracteres que marca el visor",
      answer:
        "El visor de caracteres invisibles marca {count} caracteres en su sitio con etiquetas como [ZWSP] y [NBSP] y no borra nada. Señala los caracteres de ancho cero, los guiones suaves, las marcas de dirección, la marca de orden de bytes, las tabulaciones, los espacios de no separación y los separadores de línea y de párrafo.",
      note: "Se muestra aquí para que puedas leerlo sin usar la herramienta. La columna del escáner indica qué hace el escáner de caracteres invisibles con el mismo carácter. El visor no marca los caracteres sin etiqueta.",
    },
    "remove-smart-quotes": {
      heading: "Qué comillas se sustituyen",
      answer:
        "La herramienta de comillas tipográficas a comillas rectas sustituye los cuatro caracteres de comillas curvas por comillas ASCII rectas: las dos comillas dobles curvas pasan a ser \" y las dos comillas simples curvas, incluido el apóstrofo curvo, pasan a ser '. El resto del texto no cambia.",
      note: "Las demás comillas, como „ ‚ « » ‹ ›, no se modifican.",
    },
    "remove-em-dashes": {
      heading: "Qué rayas se sustituyen",
      answer:
        "El eliminador de rayas largas sustituye solo la raya larga (—, U+2014): por una coma de forma predeterminada, o por un punto y coma, un guion o nada. Las rayas medias, los signos menos y los guiones se dejan como están.",
      note: "Tras la sustitución se elimina el espacio anterior a la raya, para que no quede ningún espacio suelto. Si la raya se elimina por completo, las series de espacios se reducen a uno.",
    },
  },
  headers: {
    character: "Carácter",
    codePoint: "Punto de código",
    name: "Nombre Unicode",
    type: "Qué es",
    scanner: "Escáner",
    viewer: "Etiqueta del visor",
    becomes: "Resultado",
    output: "Resultado de la herramienta",
  },
  invisibleTypes: {
    softHyphen: "Guion oculto que solo se ve al cortar la línea",
    zeroWidth: "Espacio o unión de ancho cero",
    directionMark: "Marca de dirección del texto",
    bidiEmbedding: "Incrustación o anulación bidireccional",
    wordJoiner: "Unidor de palabras (evita un salto de línea)",
    mathOperator: "Operador matemático invisible",
    isolate: "Aislamiento bidireccional",
    deprecated: "Control de formato obsoleto",
    bom: "Marca de orden de bytes",
    whitespace: "Tabulación o espacio de no separación",
    separator: "Separador de línea o de párrafo",
  },
  removed: "Se elimina",
  kept: "Se conserva",
  notLabelled: "Sin etiqueta",
  unchanged: "Sin cambios",
  defaultLabel: "predeterminado",
};
