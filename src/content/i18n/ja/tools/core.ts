import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "MarkdownをWordに変換", description: "Markdownを整ったWord文書に無料で安全に変換します。" },
  "markdown-to-pdf": { name: "MarkdownをPDFに変換", description: "Markdownをブラウザから読みやすいPDFに変換します。" },
  "markdown-to-google-docs": { name: "MarkdownをGoogleドキュメントに変換", description: "見出し、リスト、リンク、表を保ったままGoogleドキュメントへ移せます。" },
  "remove-markdown-formatting": { name: "Markdown書式を削除", description: "本文を残したまま、アスタリスクやシャープなどのMarkdown記号を削除します。" },
  "markdown-table-to-excel": { name: "Markdown表をExcelに変換", description: "Markdownのパイプ表をExcelの行と列に変換します。" },
  "markdown-table-to-csv": { name: "Markdown表をCSVに変換", description: "Markdown表を互換性の高いCSVファイルに変換します。" },
  "markdown-viewer": { name: "オンラインMarkdownビューア", description: "ファイルを送信せず、Markdownの書式をリアルタイムで確認できます。" },
  "markdown-to-html": { name: "MarkdownをHTMLに変換", description: "Markdownからクリーンで意味的なHTMLをすぐに生成します。" },
  "word-to-markdown": { name: "WordをMarkdownに変換", description: "WordやGoogleドキュメントのリッチテキストをMarkdownに変換します。" },
  "remove-em-dashes": { name: "文章から長いダッシュを削除", description: "長いダッシュを見つけて、より一般的な句読点に置換します。" },
  "clean-ai-text": { name: "ChatGPT・AI文章クリーナー", description: "AI文章のダッシュ、曲線引用符、絵文字、隠し文字を整理します。" },
  "remove-invisible-characters": { name: "不可視文字を削除", description: "ゼロ幅スペース、ソフトハイフン、方向制御文字を検出して削除します。" },
};
