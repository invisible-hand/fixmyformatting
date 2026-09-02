import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
    "to-word": "{brand} a Word",
    "to-pdf": "{brand} a PDF",
    "to-google-docs": "{brand} a Google Docs",
    "table-to-excel": "Tabla de {brand} a Excel",
    "remove-formatting": "Eliminar formato de {brand}",
  },
  actionTitle: {
    "to-word": "Convertir {brand} a Word gratis",
    "to-pdf": "Convertir {brand} a PDF gratis",
    "to-google-docs": "Convertir {brand} a Google Docs",
    "table-to-excel": "Tablas de {brand} a Excel gratis",
    "remove-formatting": "Eliminar formato de {brand}",
  },
  actionDescription: {
    "to-word": "Convierte las respuestas de {brand} en un .docx real, con títulos, listas, tablas, enlaces y código como formato y no como Markdown a la vista.",
    "to-pdf": "Convierte una respuesta de {brand} en un PDF limpio listo para imprimir desde la vista previa del navegador, sin subir nada y sin marca de agua.",
    "to-google-docs": "Pega una respuesta de {brand}, copia el resultado con formato y llévalo a Google Docs con títulos, listas, enlaces, énfasis y tablas intactos.",
    "table-to-excel": "Convierte las tablas con barras verticales que {brand} muestra en el chat en un .xlsx real con un valor por celda, listo para editar en Excel.",
    "remove-formatting": "Quita asteriscos, almohadillas y sintaxis de enlaces de una respuesta de {brand} y conserva el texto legible para correos, formularios y apps.",
  },
  actionGuidance: {
    "to-word": "Usa esta opción cuando una respuesta de {brand} deba convertirse en un informe, un resumen, una tarea o un documento que otras personas puedan editar en Word.",
    "to-pdf": "La vista previa en vivo muestra cómo se imprimirá la respuesta de {brand} antes de elegir Guardar como PDF en tu navegador.",
    "to-google-docs": "Copia el resultado con formato y pégalo en Google Docs cuando un pegado normal desde {brand} deja símbolos Markdown visibles.",
    "table-to-excel": "Esto corrige la sintaxis de tabla con barras verticales y guiones que {brand} muestra en el chat y descarga una hoja de cálculo .xlsx de verdad.",
    "remove-formatting": "Usa el texto limpio en correos, formularios, aplicaciones de mensajería o editores que muestran literalmente los asteriscos y almohadillas de {brand}.",
  },
  reasons: {
    "chatgpt": "ChatGPT suele devolver estructuras útiles en Markdown, lo que deja visibles asteriscos, almohadillas y tablas con barras verticales al pegar en programas de oficina.",
    "claude": "Claude escribe con frecuencia respuestas largas y muy estructuradas, cuyos títulos y tablas necesitan conversión antes de comportarse como un documento normal.",
    "gemini": "Las tablas de Gemini pueden pegarse como barras verticales y guiones separadores visibles, porque el chat usa Markdown en lugar de celdas de hoja de cálculo.",
    "copilot": "Las respuestas de Copilot mezclan prosa, listas y Markdown orientado a código, por lo que un pegado directo puede no conservar la jerarquía visual.",
    "perplexity": "Las respuestas de Perplexity suelen combinar estructura Markdown con enlaces de citas, por lo que una conversión limpia es importante al reutilizar investigaciones.",
    "deepseek": "DeepSeek suele formatear las respuestas técnicas en Markdown, incluidos bloques de código y fórmulas que un pegado simple deja al descubierto.",
    "grok": "Grok estructura sus respuestas como Markdown, por lo que títulos, listas y tablas de pipes se pegan en las suites de oficina como símbolos sin formato.",
  },
  faqs: [
    { question: "¿Cómo uso {name}?", answer: "Copia el contenido relevante de {brand}, pégalo en el editor de arriba y usa el resultado en vivo de inmediato." },
    { question: "¿Se sube mi conversación de {brand}?", answer: "No. La conversión ocurre en tu navegador. El texto solo se guarda si creas explícitamente un enlace compartido." },
    { question: "¿Puedo editar el resultado convertido de {brand}?", answer: "Sí. El resultado sigue siendo editable al copiarlo o descargarlo en un formato editable." },
  ],
};
