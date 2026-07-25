import type { FigureCopy } from "@/lib/i18n/types";

export const figures: FigureCopy = {
  "dash-widths": {
    "caption": "Un patrón de rayas largas típico de los borradores de IA, y la misma frase reescrita con comas.",
    "notes": [],
    "labels": {
      "before": "BORRADOR DE IA",
      "after": "TRAS LA LIMPIEZA"
    }
  },
  "ai-tells-panel": {
    "caption": "Cuatro patrones mecánicos que suelen sobrevivir al copiar y pegar desde un chat de IA.",
    "notes": [],
    "labels": {
      "eyebrow": "SEÑALES COMUNES"
    }
  },
  "hidden-characters": {
    "caption": "Un espacio de ancho cero es invisible en pantalla, pero sigue presente en el texto subyacente.",
    "notes": [],
    "labels": {
      "before": "LO QUE VES",
      "after": "LO QUE SE GUARDA"
    }
  },
  "markdown-in-word": {
    "caption": "La misma respuesta pegada como Markdown sin formato, y convertida para que la estructura se conserve.",
    "notes": [
      "Word no tiene un analizador de Markdown, así que los símbolos se tratan como caracteres normales.",
      "Convertir primero los transforma en títulos, negritas y listas de verdad."
    ],
    "labels": {
      "before": "PEGADO COMO TEXTO PLANO",
      "after": "CONVERTIDO"
    }
  },
  "table-to-grid": {
    "caption": "Una tabla con barras verticales es texto plano hasta que se convierte en celdas de hoja de cálculo reales.",
    "notes": [
      "Al pegar la tabla sin convertir, todos los valores caen en una sola columna.",
      "Convertir a XLSX o CSV mantiene intactas las filas y las columnas."
    ],
    "labels": {
      "before": "MARKDOWN",
      "after": "HOJA DE CÁLCULO",
      "region": "Región"
    }
  },
  "transcript-to-doc": {
    "caption": "Una transcripción de chat copiada, reestructurada en un documento con los interlocutores identificados.",
    "notes": [
      "Los turnos de cada interlocutor se convierten en títulos, así que la exportación sigue siendo legible fuera del chat."
    ],
    "labels": {
      "before": "TRANSCRIPCIÓN COPIADA",
      "after": "DOCUMENTO",
      "title": "Exportación de conversación",
      "you": "Tú",
      "assistant": "Asistente",
      "ask": "Resume este informe",
      "reply": "Aquí tienes un resumen conciso…",
      "followUp": "Añade las cifras"
    }
  },
  "smart-quotes-code": {
    "caption": "Las comillas tipográficas son caracteres distintos de las comillas rectas que esperan los analizadores.",
    "notes": [],
    "labels": {
      "before": "PEGADO DESDE EL CHAT",
      "after": "TRAS NORMALIZAR"
    }
  },
  "dash-ruler": {
    "caption": "Guión, raya media y raya larga al mismo tamaño de letra, con sus usos habituales.",
    "notes": [],
    "labels": {
      "hyphenName": "Guión",
      "hyphenUse": "Palabras compuestas: well-known",
      "enName": "Raya media",
      "enUse": "Rangos: 2020–2024",
      "emName": "Raya larga",
      "emUse": "Pausas en una frase"
    }
  },
  "token-chunks": {
    "caption": "Los tokens son fragmentos de palabra, así que el número de caracteres y el de tokens rara vez coinciden.",
    "notes": [
      "37 caracteres · 7 tokens · unos 5,3 caracteres por token",
      "Una regla aproximada para el inglés: 1 token ≈ 4 caracteres ≈ 0,75 palabras.",
      "El código, los alfabetos no latinos y las palabras poco comunes usan más tokens por carácter."
    ],
    "labels": {
      "eyebrow": "UNA FRASE, SIETE TOKENS"
    }
  }
};
