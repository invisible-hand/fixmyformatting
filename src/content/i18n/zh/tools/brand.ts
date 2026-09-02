import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
    "to-word": "{brand} 转 Word",
    "to-pdf": "{brand} 转 PDF",
    "to-google-docs": "{brand} 转 Google Docs",
    "table-to-excel": "{brand} 表格转 Excel",
    "remove-formatting": "删除 {brand} 格式",
  },
  actionTitle: {
    "to-word": "{brand} 转 Word — 免费转换",
    "to-pdf": "{brand} 转 PDF — 免费转换",
    "to-google-docs": "{brand} 转 Google Docs",
    "table-to-excel": "{brand} 表格转 Excel",
    "remove-formatting": "删除 {brand} Markdown 格式",
  },
  actionDescription: {
    "to-word": "将 {brand} 的回答转换为真正的 Word .docx 文件，标题、列表、表格、链接和代码都会保留为格式，而不是原始的 Markdown 符号。转换在浏览器中完成，无需上传。",
    "to-pdf": "在浏览器的格式化预览中把 {brand} 的回答变成干净、可直接打印的 PDF。文本不会上传，也不会添加水印，无需注册即可使用。",
    "to-google-docs": "粘贴 {brand} 的回答，复制富文本结果，再粘贴到 Google Docs，标题、列表、链接、强调和表格都会保持原样。转换在浏览器中完成，无需上传。",
    "table-to-excel": "把 {brand} 在对话中输出的竖线加横线表格转换为真正的 .xlsx 文件，每个值单独占一个单元格，可直接在 Excel 中排序和编辑，无需上传。",
    "remove-formatting": "删除 {brand} 回答中的星号、井号和链接语法，保留可读的正文，适用于会把 Markdown 原样显示的邮件、表单和应用。处理在浏览器中完成，无需上传。",
  },
  actionGuidance: {
    "to-word": "当 {brand} 的回答需要变成报告、简报、作业或可供他人在 Word 中编辑的文档时，使用本工具。",
    "to-pdf": "实时预览会显示 {brand} 回答打印出来的效果，确认后再在浏览器中选择“另存为 PDF”。",
    "to-google-docs": "当直接从 {brand} 粘贴会留下可见的 Markdown 符号时，复制这里的富文本结果并粘贴到 Google Docs。",
    "table-to-excel": "本工具可以修复 {brand} 在对话中显示的竖线加横线表格语法，并下载为真正的 .xlsx 电子表格。",
    "remove-formatting": "清理后的文本可用于邮件、表单、聊天应用或会把 {brand} 的星号和标题符号原样显示的编辑器。",
  },
  reasons: {
    "chatgpt": "ChatGPT 经常以 Markdown 形式返回有用的结构，粘贴到办公软件时会露出星号、井号和竖线表格。",
    "claude": "Claude 经常输出篇幅较长、结构严谨的回答，其中的标题和表格需要转换后才能像普通文档一样使用。",
    "gemini": "Gemini 的表格粘贴后可能显示为可见的竖线和分隔横线，因为对话输出使用 Markdown 而不是电子表格单元格。",
    "copilot": "Copilot 的回答混合了正文、列表和面向代码的 Markdown，直接粘贴可能无法保留原有的视觉层次。",
    "perplexity": "Perplexity 的回答常将 Markdown 结构与引用链接结合在一起，复用研究结果时干净的转换尤为重要。",
    "deepseek": "DeepSeek 通常用 Markdown 排版技术性回答，包括代码块和公式，直接粘贴会让这些符号暴露在外。",
    "grok": "Grok 的回答以 Markdown 组织，因此标题、项目符号列表和管道表格粘贴到办公软件时会显示为原始符号而不是格式。",
  },
  faqs: [
    { question: "如何使用{name}？", answer: "从 {brand} 复制相关内容，粘贴到上方编辑器中，即可立即使用实时生成的结果。" },
    { question: "这会 up传我的 {brand} 对话吗？", answer: "不会。转换在浏览器中完成。只有主动创建分享链接时才会保存文本。" },
    { question: "转换后的 {brand} 结果可以编辑吗？", answer: "可以。以可复制或可下载的格式导出时，结果仍然可以编辑。" },
  ],
};
