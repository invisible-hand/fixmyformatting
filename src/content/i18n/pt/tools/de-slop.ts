import type { ToolCopy } from "@/lib/i18n/types";

export const deSlop: ToolCopy = {
  name: "De-slop: remover lixo de texto de IA",
  title: "De-slop: remover padrões de escrita de IA online",
  description: "Cole texto de IA e receba sem os sinais: travessões, “aprofundar”, “não apenas X, mas Y”, tríades artificiais, despedidas de chatbot. Fatos ficam intactos.",
  intro: "Slop é a escrita que denuncia um modelo de linguagem: travessões como pausa padrão, \"aprofundar\", \"tapeçaria\" e \"testemunho\", \"não apenas X, mas Y\", toda lista esticada até três itens, frases que terminam em \"destacando sua importância\", um fechamento que repete o parágrafo. O De-slop envia seu texto a um modelo de linguagem com instruções de edição baseadas na lista Signs of AI writing da Wikipédia e devolve o mesmo texto sem esses padrões. É uma edição, não uma reescrita: cada fato, número, nome, citação e URL permanece como está, o idioma do texto original é mantido, o tamanho fica dentro de cerca de quinze por cento do original, e código e Markdown com estrutura real não são tocados. A formatação decorativa some: marcadores em emoji, negrito aleatório, títulos em uma nota curta, linhas horizontais. Marque Ver o que mudou para conferir um diff palavra por palavra da edição. Como cada execução custa dinheiro, o texto é limitado a 8.000 caracteres e cada visitante tem um punhado de execuções por hora; as ferramentas mecânicas deste site continuam sem limite.",
  placeholder: "Cole aqui um texto escrito por IA e clique em De-slop. Travessões, \"aprofundar\", \"não apenas X, mas Y\" e o resto dos sinais são removidos; o sentido e os fatos permanecem.",
  faqs: [
    {
      question: "O que conta como slop, e o que o De-slop muda?",
      answer:
        "São os padrões que editores usam para identificar texto escrito por máquina, catalogados na página Signs of AI writing da Wikipédia: vocabulário típico de IA como aprofundar, tapeçaria, testemunho, fundamental, robusto e perfeito; paralelismos negativos como \"não apenas X, mas Y\"; listas esticadas até exatamente três itens; \"serve como\" e \"conta com\" no lugar de \"é\" e \"tem\"; atribuições vagas como \"especialistas concordam\"; orações finais como \"destacando sua importância\"; afirmações vazias de importância; travessões como pausa padrão; marcadores em emoji, negrito aleatório e títulos em textos curtos; aberturas e despedidas de chatbot. Cada um é substituído por uma frase simples ou cortado.",
    },
    {
      question: "Meu texto é enviado?",
      answer:
        "Sim, só para esta ferramenta. O texto é enviado à API da OpenAI (GPT-5.6 Terra, com raciocínio desativado) para essa edição específica, e o resultado volta para o seu navegador. O Fix My Formatting não armazena o texto de entrada nem o de saída, e a OpenAI trata as chamadas de API sob os termos de uso de dados da API, não os termos do ChatGPT para consumidores. Todas as outras ferramentas deste site continuam rodando inteiramente no seu navegador.",
    },
    {
      question: "Por que existe um limite?",
      answer:
        "Cada execução tem um custo real de chamada ao modelo, então a ferramenta aceita até 8.000 caracteres por vez e permite um pequeno número de execuções por hora por visitante, com um teto diário para o site inteiro. Ao atingir o limite, você recebe uma mensagem clara e pode tentar de novo mais tarde. Não há conta nem pagamento; as ferramentas mecânicas deste site continuam sem limite.",
    },
  ],
};
