import type { FigureCopy } from "@/lib/i18n/types";

export const figures: FigureCopy = {
  "dash-widths": {
    "caption": "AIの下書きに典型的な長いダッシュの使い方と、カンマで書き直した同じ文。",
    "notes": [],
    "labels": {
      "before": "AIの下書き",
      "after": "整理後"
    }
  },
  "ai-tells-panel": {
    "caption": "AIチャットからのコピー＆ペーストで残りやすい4つの機械的なパターン。",
    "notes": [],
    "labels": {
      "eyebrow": "よくある特徴"
    }
  },
  "hidden-characters": {
    "caption": "ゼロ幅スペースは画面上では見えませんが、実際のテキストには存在しています。",
    "notes": [],
    "labels": {
      "before": "画面上の見え方",
      "after": "実際のデータ"
    }
  },
  "markdown-in-word": {
    "caption": "同じ回答を生のMarkdownとして貼った場合と、構造を保つよう変換した場合。",
    "notes": [
      "WordにはMarkdownパーサーがないため、記号は普通の文字として扱われます。",
      "先に変換すれば、本物の見出し、太字、リスト項目になります。"
    ],
    "labels": {
      "before": "テキストで貼付",
      "after": "変換後"
    }
  },
  "table-to-grid": {
    "caption": "パイプ表は、本物のスプレッドシートのセルに解析されるまではプレーンテキストです。",
    "notes": [
      "生の表を貼ると、すべての値が1つの列に入ってしまいます。",
      "XLSXやCSVに変換すれば、行と列がそのまま保たれます。"
    ],
    "labels": {
      "before": "Markdown",
      "after": "スプレッドシート",
      "region": "地域"
    }
  },
  "transcript-to-doc": {
    "caption": "コピーしたチャット記録を、話者ラベル付きの文書に再構成した例。",
    "notes": [
      "発言ごとに見出しが付くため、チャット画面の外でも読みやすい書き出しになります。"
    ],
    "labels": {
      "before": "コピーした記録",
      "after": "文書",
      "title": "会話の書き出し",
      "you": "あなた",
      "assistant": "アシスタント",
      "ask": "このレポートを要約して",
      "reply": "簡潔な要約です…",
      "followUp": "数値も追加して"
    }
  },
  "smart-quotes-code": {
    "caption": "曲線引用符は、パーサーが想定する直線引用符とは別の文字です。",
    "notes": [],
    "labels": {
      "before": "チャットから貼付",
      "after": "正規化後"
    }
  },
  "dash-ruler": {
    "caption": "同じ文字サイズのハイフン、短いダッシュ、長いダッシュと、それぞれの標準的な使い方。",
    "notes": [],
    "labels": {
      "hyphenName": "ハイフン",
      "hyphenUse": "複合語: well-known",
      "enName": "短いダッシュ",
      "enUse": "範囲: 2020–2024",
      "emName": "長いダッシュ",
      "emUse": "文中の区切り"
    }
  },
  "token-chunks": {
    "caption": "トークンは単語より小さい断片のため、文字数とトークン数は一致しません。",
    "notes": [
      "36文字 · 7トークン · 1トークンあたり約5.1文字",
      "英語の目安: 1トークン ≈ 4文字 ≈ 0.75単語。",
      "コード、英語以外の文字、まれな単語は、1文字あたりのトークン数が多くなります。"
    ],
    "labels": {
      "eyebrow": "1文、7トークン"
    }
  }
};
