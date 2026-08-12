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
  "dashRemove": "Nada"
};

export const guideChrome: GuideChrome = {
  "navLabel": "Guías",
  "onThisPage": "En esta página",
  "toolsMentioned": "Herramientas mencionadas en esta guía",
  "relatedGuides": "Guías relacionadas",
  "home": "Inicio"
};
