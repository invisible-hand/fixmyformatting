import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = {
  "about": {
    "metaTitle": "Sobre o Fix My Formatting",
    "description": "Por que o Fix My Formatting cria ferramentas de texto gratuitas e privadas no navegador.",
    "h1": "Sobre o Fix My Formatting",
    "dek": "Ferramentas gratuitas e privadas para o espaço entre o chat de IA e o resto do seu trabalho.",
    "sections": [
      {
        "body": [
          "O Fix My Formatting resolve aqueles problemas pequenos e irritantes que surgem entre o chat de IA e o resto do seu trabalho. Todas as ferramentas são gratuitas, abrem na hora e processam o texto no seu navegador.",
          "Não há contas, paywalls ou uploads durante a conversão normal. Se você criar um link compartilhado, essa ação armazena o texto explicitamente para que o link funcione."
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "Privacidade | Fix My Formatting",
    "description": "Detalhes de privacidade das ferramentas do Fix My Formatting no navegador e dos links compartilhados opcionais.",
    "h1": "Privacidade",
    "dek": "Resumo: o que você digita fica no seu navegador, a menos que você crie um link compartilhado.",
    "sections": [
      {
        "heading": "Processamento no navegador",
        "body": [
          "As conversões e análises acontecem localmente no seu dispositivo. O texto digitado nas ferramentas não é enviado aos nossos servidores."
        ]
      },
      {
        heading: "A ferramenta De-slop",
        body: ["O De-slop é a única exceção ao processamento só no navegador: ao clicar em De-slop, o texto do editor é enviado à API da OpenAI para uma única edição, e o resultado volta para o seu navegador. Não armazenamos o texto de entrada nem o de saída. A OpenAI trata as chamadas de API sob seus termos de uso de dados da API. Nenhuma outra ferramenta envia texto para lugar nenhum."],
      },
      {
        "heading": "Links compartilhados",
        "body": [
          "Ao escolher “Copiar link do resultado”, o texto, a ferramenta selecionada e as configurações são armazenados para que o link possa ser aberto. Não compartilhe informações sensíveis ou pessoais. Os resultados compartilhados expiram após 180 dias por padrão."
        ]
      },
      {
        "heading": "Análise de uso",
        "body": [
          "Coletamos contagens agregadas de páginas e interações para entender quais ferramentas são úteis. Usamos o Vercel Analytics, que não utiliza cookies, e o Google Analytics, que instala cookies para medir visitas e sessões. Não vendemos informações pessoais."
        ]
      }
    ]
  },
  "notFound": {
    "h1": "Página não encontrada",
    "dek": "Experimente uma destas ferramentas de formatação gratuitas."
  },
  "guidesIndex": {
    "metaTitle": "Guias — Corrigindo a formatação de textos de IA",
    "description": "Guias em linguagem simples sobre travessões, caracteres invisíveis, símbolos Markdown e outras peculiaridades da formatação de textos gerados por IA.",
    "h1": "Guias",
    "dek": "Por que o texto de IA chega quebrado e como corrigir. Cada guia termina com uma ferramenta que resolve tudo em um clique.",
    "clusters": {
      "ai-tells": "Reconhecendo texto de IA",
      "how-to": "Corrigindo resultados de IA",
      "reference": "Referência"
    }
  }
};

export const workspace: WorkspaceMessages = {
  "printPdf": "Imprimir / Salvar PDF",
  "downloaded": "Baixado",
  "excelDownloaded": "Arquivo Excel baixado",
  "reportImageDownloaded": "Imagem do relatório baixada",
  "pasteFirst": "Cole um texto primeiro",
  "creatingLink": "Criando link…",
  "couldNotCreateLink": "Não foi possível criar o link",
  "shareUnavailable": "Compartilhamento indisponível",
  "reportNote": "Conta apenas artefatos mecânicos. Não é detecção de IA.",
  "conversionOptions": "Opções de conversão",
  "editorView": "Visualização do editor",
  "caseLabel": "Maiúsculas e minúsculas",
  "caseTitle": "Formato de Título",
  "caseSentence": "Formato de frase",
  "caseUpper": "MAIÚSCULAS",
  "caseLower": "minúsculas",
  "dashLabel": "Substituir travessões por",
  "dashComma": "Vírgula",
  "dashSemicolon": "Ponto e vírgula",
  "dashHyphen": "Hífen",
  "dashRemove": "Nada",
  "listLabel": "Converter em",
  "listToParagraph": "Parágrafo",
  "listToBullets": "Marcadores",
  "loadExample": "Carregar um exemplo",
  "exampleLoaded": "Exemplo carregado",
  "keepUrls": "Manter URLs dos links",
  "listMarkersLabel": "Marcadores de lista",
  "listMarkersKeep": "Manter como marcadores e números",
  "listMarkersRemove": "Remover",
  "keepCode": "Manter blocos de código como estão",
  "tidySpacing": "Também arrumar espaçamento",
  "showChanges": "Ver o que mudou",
  "stripMarkdown": "Também remover símbolos Markdown",
  "deslop": "Fazer De-slop no texto",
  "deslopping": "Fazendo De-slop…",
  "deslopFailed": "Não foi possível fazer o De-slop do texto. Tente novamente em instantes.",
  "deslopLimit": "Limite atingido. Esta ferramenta tem custo por execução, por isso permite poucas execuções por hora. Tente novamente mais tarde.",
  "privateRemote": "Esta ferramenta envia seu texto à OpenAI para a edição e não o armazena. Todas as outras ferramentas rodam no seu navegador.",
  "unchanged": "Nenhum padrão de IA encontrado. O texto foi devolvido sem alterações.",
};

export const guideChrome: GuideChrome = {
  "navLabel": "Guias",
  "onThisPage": "Nesta página",
  "toolsMentioned": "Ferramentas mencionadas neste guia",
  "relatedGuides": "Guias relacionados",
  "home": "Início"
};
