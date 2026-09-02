import type { FigureCopy } from "@/lib/i18n/types";

export const figures: FigureCopy = {
  "dash-widths": {
    "caption": "Um padrão de travessões típico de rascunhos de IA, e a mesma frase reescrita com vírgulas.",
    "notes": [],
    "labels": {
      "before": "RASCUNHO DE IA",
      "after": "APÓS A LIMPEZA"
    }
  },
  "ai-tells-panel": {
    "caption": "Quatro padrões mecânicos que costumam sobreviver a um copiar e colar de um chat de IA.",
    "notes": [],
    "labels": {
      "eyebrow": "SINAIS COMUNS"
    }
  },
  "hidden-characters": {
    "caption": "Um espaço de largura zero é invisível na tela, mas continua presente no texto subjacente.",
    "notes": [],
    "labels": {
      "before": "O QUE VOCÊ VÊ",
      "after": "O QUE FICA ARMAZENADO"
    }
  },
  "markdown-in-word": {
    "caption": "A mesma resposta colada como Markdown puro, e convertida para que a estrutura seja preservada.",
    "notes": [
      "O Word não tem um interpretador de Markdown, então os símbolos são tratados como caracteres comuns.",
      "Converter antes os transforma em títulos, trechos em negrito e itens de lista de verdade."
    ],
    "labels": {
      "before": "COLADO COMO TEXTO SIMPLES",
      "after": "CONVERTIDO"
    }
  },
  "table-to-grid": {
    "caption": "Uma tabela com barras verticais é texto simples até ser interpretada em células de planilha de verdade.",
    "notes": [
      "Colar a tabela bruta joga todos os valores em uma única coluna.",
      "Converter para XLSX ou CSV mantém as linhas e colunas intactas."
    ],
    "labels": {
      "before": "MARKDOWN",
      "after": "PLANILHA",
      "region": "Região"
    }
  },
  "transcript-to-doc": {
    "caption": "Uma transcrição de chat copiada, reestruturada em um documento com falantes identificados.",
    "notes": [
      "As falas viram títulos, então a exportação continua legível fora da janela do chat."
    ],
    "labels": {
      "before": "TRANSCRIÇÃO COPIADA",
      "after": "DOCUMENTO",
      "title": "Exportação de conversa",
      "you": "Você",
      "assistant": "Assistente",
      "ask": "Resuma este relatório",
      "reply": "Aqui está um resumo conciso…",
      "followUp": "Adicione os números"
    }
  },
  "smart-quotes-code": {
    "caption": "Aspas curvas são caracteres diferentes das aspas retas que os analisadores esperam.",
    "notes": [],
    "labels": {
      "before": "COLADO DO CHAT",
      "after": "APÓS NORMALIZAR"
    }
  },
  "dash-ruler": {
    "caption": "Hífen, travessão médio e travessão no mesmo tamanho de fonte, com seus usos padrão.",
    "notes": [],
    "labels": {
      "hyphenName": "Hífen",
      "hyphenUse": "Palavras compostas: well-known",
      "enName": "Travessão médio",
      "enUse": "Intervalos: 2020–2024",
      "emName": "Travessão",
      "emUse": "Pausas na frase"
    }
  },
  "token-chunks": {
    "caption": "Tokens são fragmentos menores que palavras, então a contagem de caracteres e de tokens raramente coincide.",
    "notes": [
      "36 caracteres · 7 tokens · cerca de 5,1 caracteres por token",
      "Uma regra prática para o inglês: 1 token ≈ 4 caracteres ≈ 0,75 palavras.",
      "Código, alfabetos não latinos e palavras raras usam mais tokens por caractere."
    ],
    "labels": {
      "eyebrow": "UMA FRASE, SETE TOKENS"
    }
  }
};
