import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "Convertir Markdown a Word", description: "Convierte Markdown en un documento Word bien formateado, gratis y de forma privada." },
  "markdown-to-pdf": { name: "Convertir Markdown a PDF", description: "Convierte Markdown en un PDF limpio directamente desde tu navegador." },
  "markdown-to-google-docs": { name: "Convertir Markdown a Google Docs", description: "Copia Markdown a Google Docs conservando títulos, listas, enlaces y tablas." },
  "remove-markdown-formatting": { name: "Eliminar formato Markdown", description: "Elimina asteriscos, almohadillas y otros símbolos Markdown sin perder el texto." },
  "markdown-table-to-excel": { name: "Convertir tabla Markdown a Excel", description: "Convierte tablas con barras verticales en filas y columnas de Excel." },
  "markdown-table-to-csv": { name: "Convertir tabla Markdown a CSV", description: "Convierte una tabla Markdown en un archivo CSV limpio y compatible." },
  "markdown-viewer": { name: "Visor de Markdown online", description: "Visualiza Markdown con formato en tiempo real y sin subir archivos." },
  "markdown-to-html": { name: "Convertir Markdown a HTML", description: "Genera HTML semántico y limpio a partir de Markdown al instante." },
  "word-to-markdown": { name: "Convertir Word a Markdown", description: "Pega texto enriquecido de Word o Google Docs y conviértelo a Markdown." },
  "remove-em-dashes": { name: "Eliminar rayas largas del texto", description: "Busca y sustituye rayas largas por puntuación más sencilla." },
  "clean-ai-text": { name: "Limpiar texto de ChatGPT e IA", description: "Limpia rayas, comillas tipográficas, emojis y caracteres ocultos del texto de IA." },
  "remove-invisible-characters": { name: "Eliminar caracteres invisibles", description: "Detecta y elimina espacios de ancho cero, guiones suaves y marcas direccionales." },
};
