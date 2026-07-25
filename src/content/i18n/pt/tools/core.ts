import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "Converter Markdown para Word", description: "Converta Markdown em um documento Word bem formatado, grátis e com privacidade." },
  "markdown-to-pdf": { name: "Converter Markdown para PDF", description: "Converta Markdown em um PDF limpo diretamente no navegador." },
  "markdown-to-google-docs": { name: "Converter Markdown para Google Docs", description: "Leve Markdown ao Google Docs preservando títulos, listas, links e tabelas." },
  "remove-markdown-formatting": { name: "Remover formatação Markdown", description: "Remova asteriscos, cerquilhas e outros símbolos Markdown sem perder o texto." },
  "markdown-table-to-excel": { name: "Converter tabela Markdown para Excel", description: "Transforme tabelas com barras verticais em linhas e colunas do Excel." },
  "markdown-table-to-csv": { name: "Converter tabela Markdown para CSV", description: "Converta uma tabela Markdown em CSV limpo e compatível." },
  "markdown-viewer": { name: "Visualizador de Markdown online", description: "Visualize Markdown formatado em tempo real sem enviar arquivos." },
  "markdown-to-html": { name: "Converter Markdown para HTML", description: "Gere HTML semântico e limpo a partir de Markdown instantaneamente." },
  "word-to-markdown": { name: "Converter Word para Markdown", description: "Cole texto rico do Word ou Google Docs e converta para Markdown." },
  "remove-em-dashes": { name: "Remover travessões do texto", description: "Encontre e substitua travessões por pontuação mais simples." },
  "clean-ai-text": { name: "Limpar texto do ChatGPT e IA", description: "Limpe travessões, aspas curvas, emojis e caracteres ocultos do texto de IA." },
  "remove-invisible-characters": { name: "Remover caracteres invisíveis", description: "Detecte e remova espaços de largura zero, hífens suaves e marcas direcionais." },
};
