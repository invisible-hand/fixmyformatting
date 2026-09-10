import type { ToolCopy } from "@/lib/i18n/types";

export const deSlop: ToolCopy = {
  name: "De-slop: quitar el sello de la IA",
  title: "De-slop: eliminar marcas de escritura de IA",
  description:
    "Quita las marcas de la IA: rayas largas, «profundizar», «no solo X sino Y», tríadas rellenadas, despedidas de chatbot. El sentido y los datos no cambian.",
  intro:
    "El slop es la escritura que delata a un modelo de lenguaje: la raya larga como pausa por defecto, «profundizar», «tapiz» y «testimonio», «no solo X sino también Y», toda lista rellenada hasta tres elementos, frases que terminan en «lo que subraya su importancia», un cierre que resume el párrafo. De-slop envía tu texto a un modelo de lenguaje con instrucciones de edición basadas en la lista de Signos de escritura de IA de Wikipedia y te devuelve el mismo texto sin esas marcas. Es una edición, no una reescritura: cada dato, número, nombre, cita y URL se mantiene tal cual, se conserva el idioma del texto original, la extensión varía como mucho un quince por ciento y el código o el Markdown con estructura real quedan intactos. El formato decorativo desaparece: viñetas con emojis, negrita al azar, títulos en una nota corta, líneas horizontales. Activa Mostrar cambios para ver un diff palabra por palabra de la edición. Como cada ejecución cuesta dinero, el texto se limita a 8000 caracteres y cada visitante dispone de unas pocas ejecuciones por hora; las herramientas mecánicas de este sitio siguen sin límite.",
  placeholder:
    "Pega aquí texto escrito por IA y pulsa De-slop. Se editan las rayas largas, «profundizar», «no solo X sino también Y» y el resto de las marcas; el sentido y los datos se mantienen.",
  faqs: [
    {
      question: "¿Qué es el 'slop' y qué cambia De-slop?",
      answer:
        "Las marcas que delatan un texto escrito por una máquina, según la lista de Signos de escritura de IA de Wikipedia: vocabulario típico de IA como profundizar, tapiz, testimonio, fundamental, robusto y fluido; paralelismos negativos como «no solo X sino también Y»; listas rellenadas hasta exactamente tres elementos; «sirve como» y «cuenta con» en lugar de «es» y «tiene»; atribuciones vagas como «los expertos coinciden»; cláusulas finales como «lo que subraya su importancia»; afirmaciones de importancia vacías; la raya larga como pausa por defecto; viñetas con emojis, negrita al azar y títulos en textos cortos; aperturas y despedidas de chatbot. Cada una se sustituye por la afirmación llana o se elimina.",
    },
    {
      question: "¿Se sube mi texto?",
      answer:
        "Sí, solo para esta herramienta. El texto se envía a la API de OpenAI (GPT-5.6 Terra) para hacer esa única edición y el resultado se devuelve a tu navegador. Fix My Formatting no guarda ni el texto original ni el resultado, y OpenAI trata las solicitudes de la API según sus condiciones de uso de datos de la API, no las del ChatGPT de consumo. El resto de las herramientas de este sitio sigue funcionando por completo en tu navegador.",
    },
    {
      question: "¿Por qué hay un límite?",
      answer:
        "Cada ejecución cuesta dinero real por la llamada al modelo, así que la herramienta admite hasta 8000 caracteres por ejecución y permite unas pocas ejecuciones por hora por visitante, con un tope diario para todo el sitio. Si llegas al límite verás un mensaje claro y podrás volver más tarde. Es gratis, sin cuenta; las herramientas mecánicas de este sitio siguen sin límite.",
    },
  ],
};
