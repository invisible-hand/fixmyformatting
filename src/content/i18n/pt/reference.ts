import type { ReferenceCopy } from "@/lib/i18n/types";

export const reference: ReferenceCopy = {
  guideLead: "Guia",
  pages: {
    "remove-invisible-characters": {
      heading: "Todos os caracteres invisíveis que o verificador trata",
      answer:
        "O verificador de caracteres invisíveis remove {count} caracteres Unicode invisíveis: espaços e junções de largura zero, hífenes condicionais, marcas de direção e outros controles bidirecionais, o unidor de palavras, os operadores matemáticos invisíveis e a marca de ordem de bytes. Espaços comuns, tabulações, espaços sem quebra e quebras de linha são mantidos.",
      note: "Mostrado aqui para que você possa ler sem executar a ferramenta. U+2065 não está atribuído no Unicode e também é removido. Tabulações, espaços sem quebra e separadores de linha ou de parágrafo são mantidos, porque apagá-los juntaria palavras ou linhas.",
    },
    "show-invisible-characters": {
      heading: "Todos os caracteres que o visualizador marca",
      answer:
        "O visualizador de caracteres invisíveis marca {count} caracteres no próprio lugar com rótulos como [ZWSP] e [NBSP] e não apaga nada. Ele sinaliza caracteres de largura zero, hífenes condicionais, marcas de direção, a marca de ordem de bytes, tabulações, espaços sem quebra e separadores de linha e de parágrafo.",
      note: "Mostrado aqui para que você possa ler sem executar a ferramenta. A coluna do verificador mostra o que o verificador de caracteres invisíveis faz com o mesmo caractere. Caracteres sem rótulo não são marcados pelo visualizador.",
    },
    "remove-smart-quotes": {
      heading: "Quais aspas são substituídas",
      answer:
        "A ferramenta de aspas curvas para aspas retas substitui os quatro caracteres de aspas curvas por aspas ASCII retas: as duas aspas duplas curvas viram \" e as duas aspas simples curvas, incluindo o apóstrofo curvo, viram '. Nada mais no texto é alterado.",
      note: "Outras aspas, como „ ‚ « » ‹ ›, não são alteradas.",
    },
    "remove-em-dashes": {
      heading: "Quais travessões são substituídos",
      answer:
        "O removedor de travessões substitui apenas o travessão longo (—, U+2014): por vírgula, por padrão, ou por ponto e vírgula, hífen ou nada. Travessões médios, sinais de menos e hífenes ficam como estão.",
      note: "Depois da substituição, o espaço antes do travessão é removido, para não sobrar espaço solto. Quando o travessão é removido por completo, sequências de espaços viram um só.",
    },
  },
  headers: {
    character: "Caractere",
    codePoint: "Ponto de código",
    name: "Nome Unicode",
    type: "O que é",
    scanner: "Verificador",
    viewer: "Rótulo do visualizador",
    becomes: "Vira",
    output: "Saída da ferramenta",
  },
  invisibleTypes: {
    softHyphen: "Hífen oculto que só aparece na quebra de linha",
    zeroWidth: "Espaço ou junção de largura zero",
    directionMark: "Marca de direção do texto",
    bidiEmbedding: "Incorporação ou substituição bidirecional",
    wordJoiner: "Unidor de palavras (impede quebra de linha)",
    mathOperator: "Operador matemático invisível",
    isolate: "Isolamento bidirecional",
    deprecated: "Controle de formato obsoleto",
    bom: "Marca de ordem de bytes",
    whitespace: "Tabulação ou espaço sem quebra",
    separator: "Separador de linha ou de parágrafo",
  },
  removed: "Removido",
  kept: "Mantido",
  notLabelled: "Sem rótulo",
  unchanged: "Inalterado",
  defaultLabel: "padrão",
};
