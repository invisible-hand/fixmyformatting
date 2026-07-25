import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "تحويل Markdown إلى Word", description: "حوّل Markdown إلى مستند Word منسّق مجانًا وبخصوصية." },
  "markdown-to-pdf": { name: "تحويل Markdown إلى PDF", description: "حوّل Markdown إلى ملف PDF واضح مباشرة في المتصفح." },
  "markdown-to-google-docs": { name: "تحويل Markdown إلى Google Docs", description: "انقل Markdown إلى Google Docs مع الحفاظ على العناوين والقوائم والروابط والجداول." },
  "remove-markdown-formatting": { name: "إزالة تنسيق Markdown", description: "احذف النجوم وعلامات الشباك ورموز Markdown الأخرى مع إبقاء النص." },
  "markdown-table-to-excel": { name: "تحويل جدول Markdown إلى Excel", description: "حوّل جداول Markdown إلى صفوف وأعمدة حقيقية في Excel." },
  "markdown-table-to-csv": { name: "تحويل جدول Markdown إلى CSV", description: "حوّل جدول Markdown إلى ملف CSV نظيف ومتوافق." },
  "markdown-viewer": { name: "عارض Markdown على الإنترنت", description: "اعرض Markdown منسقًا لحظيًا من دون رفع الملفات." },
  "markdown-to-html": { name: "تحويل Markdown إلى HTML", description: "أنشئ HTML نظيفًا ودلاليًا من Markdown فورًا." },
  "word-to-markdown": { name: "تحويل Word إلى Markdown", description: "الصق نصًا منسقًا من Word أو Google Docs وحوّله إلى Markdown." },
  "remove-em-dashes": { name: "إزالة الشرطات الطويلة", description: "اعثر على الشرطات الطويلة واستبدلها بعلامات ترقيم أبسط." },
  "clean-ai-text": { name: "تنظيف نص ChatGPT والذكاء الاصطناعي", description: "نظّف الشرطات والاقتباسات المنحنية والرموز التعبيرية والمحارف المخفية." },
  "remove-invisible-characters": { name: "إزالة المحارف غير المرئية", description: "اكتشف واحذف المسافات الصفرية والواصلات الناعمة وعلامات الاتجاه." },
};
