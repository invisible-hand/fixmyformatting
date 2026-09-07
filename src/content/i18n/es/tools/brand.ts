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
    "to-word": "Convierte una respuesta de {brand} en un .docx real: títulos de Word, tablas editables, listas anidadas, enlaces y código. Todo en tu navegador.",
    "to-pdf": "Convierte una respuesta de {brand} en un PDF limpio listo para imprimir desde la vista previa del navegador, sin subir nada y sin marca de agua.",
    "to-google-docs": "Pega una respuesta de {brand}, copia el resultado con formato y llévalo a Google Docs con títulos, listas, enlaces, énfasis y tablas intactos.",
    "table-to-excel": "Pega la tabla de {brand} que cayó en una sola columna de Excel y descarga un .xlsx real con un valor por celda y los números como números.",
    "remove-formatting": "Quita asteriscos, almohadillas y enlaces de una respuesta de {brand} sin cambiar una palabra. Conserva URLs, listas o código y mira qué cambió.",
  },
  actionGuidance: {
    "to-word": "Usa esta opción cuando una respuesta de {brand} deba convertirse en un informe, un resumen, una tarea o un documento que otras personas puedan editar en Word.",
    "to-pdf": "La vista previa en vivo muestra cómo se imprimirá la respuesta de {brand} antes de elegir Guardar como PDF en tu navegador.",
    "to-google-docs": "Copia el resultado con formato y pégalo en Google Docs cuando un pegado normal desde {brand} deja símbolos Markdown visibles.",
    "table-to-excel": "Úsalo cuando una tabla de {brand} se pegue en la columna A con las barras aún visibles: la vista previa muestra las celdas y la descarga es un .xlsx genuino.",
    "remove-formatting": "Usa el texto limpio en correos, formularios o apps de mensajería, o en editores que muestran literalmente los asteriscos y las almohadillas de {brand}; los interruptores sobre el editor conservan las URLs, los marcadores de lista o el código.",
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
