import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "Markdown 转 Word", description: "免费、私密地将 Markdown 转换为格式规范的 Word 文档。" },
  "markdown-to-pdf": { name: "Markdown 转 PDF", description: "直接在浏览器中将 Markdown 转换为清晰的 PDF。" },
  "markdown-to-google-docs": { name: "Markdown 转 Google 文档", description: "将 Markdown 复制到 Google 文档并保留标题、列表、链接和表格。" },
  "remove-markdown-formatting": { name: "删除 Markdown 格式", description: "保留正文，同时删除星号、井号等 Markdown 符号。" },
  "markdown-table-to-excel": { name: "Markdown 表格转 Excel", description: "将 Markdown 竖线表格转换为 Excel 的行和列。" },
  "markdown-table-to-csv": { name: "Markdown 表格转 CSV", description: "将 Markdown 表格转换为干净、兼容的 CSV 文件。" },
  "markdown-viewer": { name: "在线 Markdown 查看器", description: "无需上传文件，实时查看格式化后的 Markdown。" },
  "markdown-to-html": { name: "Markdown 转 HTML", description: "立即从 Markdown 生成干净、语义化的 HTML。" },
  "word-to-markdown": { name: "Word 转 Markdown", description: "粘贴 Word 或 Google 文档的富文本并转换为 Markdown。" },
  "remove-em-dashes": { name: "删除文本中的长破折号", description: "查找长破折号并替换为更常用的标点。" },
  "clean-ai-text": { name: "清理 ChatGPT 和 AI 文本", description: "清理 AI 文本中的破折号、弯引号、表情符号和隐藏字符。" },
  "remove-invisible-characters": { name: "删除不可见字符", description: "检测并删除零宽空格、软连字符和方向控制标记。" },
};
