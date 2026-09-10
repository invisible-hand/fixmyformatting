import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = {
  "about": {
    "metaTitle": "Acerca de Fix My Formatting",
    "description": "Por qué Fix My Formatting crea herramientas de texto gratuitas y privadas que funcionan en el navegador.",
    "h1": "Acerca de Fix My Formatting",
    "dek": "Herramientas gratuitas y privadas para el espacio entre el chat de IA y el resto de tu trabajo.",
    "sections": [
      {
        "body": [
          "Fix My Formatting hace desaparecer los pequeños problemas molestos que surgen entre el chat de IA y el resto de tu trabajo. Todas las herramientas son gratuitas, se abren al instante y procesan el texto en tu navegador.",
          "No hay cuentas, muros de pago ni subidas durante la conversión normal. Si decides crear un enlace compartido, esa acción guarda explícitamente el texto para que el enlace funcione."
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "Privacidad | Fix My Formatting",
    "description": "Detalles de privacidad de las herramientas de navegador de Fix My Formatting y los enlaces compartidos opcionales.",
    "h1": "Privacidad",
    "dek": "Versión corta: el texto que introduces se queda en tu navegador salvo que crees un enlace compartido.",
    "sections": [
      {
        "heading": "Procesamiento en el navegador",
        "body": [
          "Las conversiones y los análisis se ejecutan localmente en tu dispositivo. El texto que introduces en las herramientas no se envía a nuestros servidores."
        ]
      },
      {
        heading: "La herramienta De-slop",
        body: ["De-slop es la única excepción al procesamiento exclusivo en el navegador: al pulsar De-slop, el texto del editor se envía a la API de OpenAI para una única edición y el resultado se devuelve a tu navegador. No guardamos ni el texto original ni el resultado. OpenAI procesa las solicitudes de la API según sus condiciones de uso de datos de la API. Ninguna otra herramienta envía texto a ningún sitio."],
      },
      {
        "heading": "Enlaces compartidos",
        "body": [
          "Cuando seleccionas «Copiar enlace al resultado», el texto, la herramienta elegida y la configuración se guardan para que el enlace pueda abrirse. No compartas información sensible ni personal. Los resultados compartidos caducan a los 180 días por defecto."
        ]
      },
      {
        "heading": "Analítica",
        "body": [
          "Recopilamos recuentos agregados de páginas e interacciones para saber qué herramientas resultan útiles. Usamos Vercel Analytics, que no utiliza cookies, y Google Analytics, que instala cookies para medir visitas y sesiones. No vendemos información personal."
        ]
      }
    ]
  },
  "notFound": {
    "h1": "Página no encontrada",
    "dek": "Prueba una de estas herramientas de formato gratuitas en su lugar."
  },
  "guidesIndex": {
    "metaTitle": "Guías — Corregir el formato del texto de IA",
    "description": "Guías en lenguaje sencillo sobre rayas largas, caracteres invisibles, símbolos Markdown y otras peculiaridades del formato del texto generado por IA.",
    "h1": "Guías",
    "dek": "Por qué el texto de la IA llega roto y cómo arreglarlo. Cada guía termina con una herramienta que hace el trabajo en un clic.",
    "clusters": {
      "ai-tells": "Detectar texto de IA",
      "how-to": "Corregir el resultado de la IA",
      "reference": "Referencia"
    }
  }
};

export const workspace: WorkspaceMessages = {
  "printPdf": "Imprimir / Guardar PDF",
  "downloaded": "Descargado",
  "excelDownloaded": "Archivo Excel descargado",
  "reportImageDownloaded": "Imagen del informe descargada",
  "pasteFirst": "Pega primero algo de texto",
  "creatingLink": "Creando enlace…",
  "couldNotCreateLink": "No se pudo crear el enlace",
  "shareUnavailable": "Compartir no disponible",
  "reportNote": "Cuenta solo artefactos mecánicos. No es detección de IA.",
  "conversionOptions": "Opciones de conversión",
  "editorView": "Vista del editor",
  "caseLabel": "Mayúsculas",
  "caseTitle": "Tipo título",
  "caseSentence": "Tipo oración",
  "caseUpper": "MAYÚSCULAS",
  "caseLower": "minúsculas",
  "dashLabel": "Sustituir rayas largas por",
  "dashComma": "Coma",
  "dashSemicolon": "Punto y coma",
  "dashHyphen": "Guión",
  "dashRemove": "Nada",
  "listLabel": "Convertir a",
  "listToParagraph": "Párrafo",
  "listToBullets": "Viñetas",
  "loadExample": "Cargar ejemplo",
  "exampleLoaded": "Ejemplo cargado",
  "keepUrls": "Conservar URLs de enlaces",
  "listMarkersLabel": "Marcadores de lista",
  "listMarkersKeep": "Mantener como viñetas y números",
  "listMarkersRemove": "Quitar",
  "keepCode": "Mantener bloques de código tal cual",
  "tidySpacing": "Ajustar también el espaciado",
  "showChanges": "Mostrar cambios",
  "stripMarkdown": "Eliminar también símbolos Markdown",
  "deslop": "Aplicar De-slop",
  "deslopping": "Aplicando De-slop…",
  "deslopFailed": "No se pudo aplicar De-slop al texto. Inténtalo de nuevo en un momento.",
  "deslopLimit": "Límite alcanzado. Esta herramienta cuesta dinero por ejecución, así que permite unas pocas por hora. Vuelve a intentarlo más tarde.",
  "privateRemote": "Esta herramienta envía tu texto a OpenAI para hacer la edición y no lo guarda. El resto de las herramientas funciona en tu navegador.",
  "unchanged": "No se encontraron patrones de IA. El texto se devuelve sin cambios.",
  "remoteEmpty": "Pega el texto y pulsa De-slop. La edición tarda unos segundos.",
};

export const guideChrome: GuideChrome = {
  "navLabel": "Guías",
  "onThisPage": "En esta página",
  "toolsMentioned": "Herramientas mencionadas en esta guía",
  "relatedGuides": "Guías relacionadas",
  "home": "Inicio"
};
