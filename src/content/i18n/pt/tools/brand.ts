import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
    "to-word": "{brand} para Word",
    "to-pdf": "{brand} para PDF",
    "to-google-docs": "{brand} para Google Docs",
    "table-to-excel": "Tabela do {brand} para Excel",
    "remove-formatting": "Remover formatação do {brand}",
  },
  actionTitle: {
    "to-word": "Converter {brand} para Word Grátis",
    "to-pdf": "Converter {brand} para PDF Grátis",
    "to-google-docs": "Converter {brand} para Google Docs",
    "table-to-excel": "Tabela do {brand} para Excel Grátis",
    "remove-formatting": "Remover Formatação Markdown do {brand}",
  },
  actionDescription: {
    "to-word": "Converta respostas do {brand} em um arquivo .docx de verdade, com títulos, listas, tabelas, links e código preservados como formatação real.",
    "to-pdf": "Transforme uma resposta do {brand} em um PDF limpo e pronto para impressão a partir da prévia no navegador, sem upload e sem marca d'água.",
    "to-google-docs": "Cole uma resposta do {brand}, copie o resultado em texto rico e leve ao Google Docs com títulos, listas, links, ênfases e tabelas intactos.",
    "table-to-excel": "Converta as tabelas de barras e traços que o {brand} mostra no chat em um .xlsx de verdade, com um valor por célula, pronto para ordenar.",
    "remove-formatting": "Tire asteriscos, cerquilhas e sintaxe de links de uma resposta do {brand} e fique com o texto legível para e-mail, formulários e apps.",
  },
  actionGuidance: {
    "to-word": "Use quando uma resposta do {brand} precisar virar um relatório, resumo, trabalho ou documento que outras pessoas possam editar no Word.",
    "to-pdf": "A prévia ao vivo mostra como a resposta do {brand} será impressa antes de você escolher Salvar como PDF no navegador.",
    "to-google-docs": "Copie o resultado em texto rico e cole no Google Docs quando uma colagem comum do {brand} deixar símbolos Markdown visíveis.",
    "table-to-excel": "Isso corrige a sintaxe de tabela com barras e traços que o {brand} exibe no chat e baixa uma planilha .xlsx de verdade.",
    "remove-formatting": "Use o texto limpo em e-mails, formulários, aplicativos de mensagem ou editores que mostram os asteriscos e as cerquilhas do {brand} literalmente.",
  },
  reasons: {
    "chatgpt": "O ChatGPT costuma retornar estruturas úteis em Markdown, o que expõe asteriscos, cerquilhas e tabelas com barras ao colar em programas de escritório.",
    "claude": "O Claude frequentemente escreve respostas longas e bem estruturadas, cujos títulos e tabelas precisam de conversão antes de se comportar como um documento normal.",
    "gemini": "As tabelas do Gemini podem colar como barras e traços separadores visíveis, porque a saída do chat usa Markdown em vez de células de planilha.",
    "copilot": "As respostas do Copilot misturam texto, listas e Markdown voltado a código, então uma colagem direta pode não preservar a hierarquia visual.",
    "perplexity": "As respostas do Perplexity costumam combinar estrutura Markdown com links de citação, o que torna a conversão limpa importante ao reutilizar pesquisas.",
    "deepseek": "O DeepSeek geralmente formata respostas técnicas em Markdown, incluindo blocos de código e fórmulas que uma colagem simples deixa expostas.",
    "grok": "O Grok estrutura as respostas em Markdown, então títulos, listas e tabelas de pipes são colados nos programas de escritório como símbolos brutos em vez de formatação.",
  },
  faqs: [
    { question: "Como usar {name}?", answer: "Copie o conteúdo relevante do {brand}, cole no editor acima e use o resultado ao vivo imediatamente." },
    { question: "Minha conversa do {brand} é enviada?", answer: "Não. A conversão acontece no navegador. O texto só é armazenado se você criar um link compartilhado." },
    { question: "Posso editar o resultado convertido do {brand}?", answer: "Sim. O resultado continua editável quando copiado ou baixado em um formato editável." },
  ],
};
