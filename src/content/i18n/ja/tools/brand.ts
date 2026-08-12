import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
    "to-word": "{brand}をWordに変換",
    "to-pdf": "{brand}をPDFに変換",
    "to-google-docs": "{brand}をGoogleドキュメントに変換",
    "table-to-excel": "{brand}の表をExcelに変換",
    "remove-formatting": "{brand}の書式を削除",
  },
  actionTitle: {
    "to-word": "{brand}をWordに変換【無料】",
    "to-pdf": "{brand}をPDFに変換【無料】",
    "to-google-docs": "{brand}をGoogleドキュメントへ",
    "table-to-excel": "{brand}の表をExcel化【無料】",
    "remove-formatting": "{brand}の書式を削除【無料】",
  },
  actionDescription: {
    "to-word": "{brand}の回答を、見出し、リスト、コード、表を保ったまま編集可能なWord文書に変換します。",
    "to-pdf": "{brand}の回答を、文章をアップロードせずに、きれいで印刷に適したPDFファイルに変換します。",
    "to-google-docs": "見出し、リスト、リンク、強調、表を保ったまま、{brand}の出力をGoogleドキュメントへ移せます。",
    "table-to-excel": "{brand}のMarkdown表を、並べ替えや編集ができる本物のExcelの行と列に変換します。",
    "remove-formatting": "読みやすい本文を残したまま、{brand}の回答からMarkdown書式を取り除きます。",
  },
  actionGuidance: {
    "to-word": "{brand}の回答を、レポート、資料、課題など、他の人がWordで編集できる文書にしたいときに使います。",
    "to-pdf": "ブラウザで「PDFとして保存」を選ぶ前に、{brand}の回答がどう印刷されるかをリアルタイムプレビューで確認できます。",
    "to-google-docs": "{brand}から普通に貼り付けるとMarkdown記号が残ってしまうときは、書式付きの結果をコピーしてGoogleドキュメントに貼り付けてください。",
    "table-to-excel": "チャット内で{brand}が表示するパイプとダッシュの表記法を修正し、本物の.xlsxスプレッドシートをダウンロードします。",
    "remove-formatting": "メール、フォーム、メッセージアプリ、{brand}のアスタリスクや見出し記号がそのまま表示されるエディタで、きれいなテキストを使えます。",
  },
  reasons: {
    "chatgpt": "ChatGPTは便利な構造をMarkdownで返すことが多く、オフィスソフトに貼り付けるとアスタリスクやシャープ、パイプ表がそのまま表示されてしまいます。",
    "claude": "Claudeは長く丁寧に構造化された回答をよく書きますが、その見出しや表は、通常の文書として扱う前に変換が必要です。",
    "gemini": "Geminiの表は、チャット出力がスプレッドシートのセルではなくMarkdownを使うため、パイプや区切りのダッシュが見えたまま貼り付けられることがあります。",
    "copilot": "Copilotの回答は、文章、リスト、コード向けのMarkdownが混在しているため、そのまま貼り付けると視覚的な階層が保たれない場合があります。",
    "perplexity": "Perplexityの回答はMarkdown構造と引用リンクが組み合わさっていることが多く、調査結果を再利用する際にはきれいな変換が重要です。",
    "deepseek": "DeepSeekは技術的な回答をMarkdownで整形することが多く、コードフェンスや数式がそのまま貼り付けでは露出したままになります。",
    "grok": "GrokはMarkdownで回答を構成するため、見出しや箇条書き、パイプ表をオフィスソフトに貼り付けると、書式ではなく記号がそのまま表示されてしまいます。",
  },
  faqs: [
    { question: "{name}の使い方は？", answer: "{brand}から必要な内容をコピーし、上のエディターに貼り付けるだけで、結果をすぐに利用できます。" },
    { question: "{brand}の会話はアップロードされますか？", answer: "いいえ。変換はブラウザ内で行われます。共有リンクを明示的に作成した場合のみ文章が保存されます。" },
    { question: "変換した{brand}の結果は編集できますか？", answer: "はい。編集可能な形式でコピーまたはダウンロードした場合、結果はそのまま編集できます。" },
  ],
};
