import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = {
  "about": {
    "metaTitle": "Fix My Formattingについて",
    "description": "Fix My Formattingが無料でプライバシーに配慮したブラウザ内テキストツールを作る理由。",
    "h1": "Fix My Formattingについて",
    "dek": "AIチャットと日常業務の隙間を埋める、無料でプライベートなツール。",
    "sections": [
      {
        "body": [
          "Fix My Formattingは、AIチャットと日常業務の間にある小さくて面倒な問題を解消します。すべてのツールは無料で、すぐに開き、ブラウザ内で文章を処理します。",
          "通常の変換では、アカウントも課金もアップロードもありません。共有リンクの作成を選んだ場合のみ、リンクが機能するよう文章が明示的に保存されます。"
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "プライバシー｜Fix My Formatting",
    "description": "Fix My Formattingのブラウザツールとオプションの共有リンクに関するプライバシー情報。",
    "h1": "プライバシー",
    "dek": "要点：共有リンクを作成しない限り、入力内容はブラウザ内にとどまります。",
    "sections": [
      {
        "heading": "ブラウザ内での処理",
        "body": [
          "変換や分析はお使いのデバイス上でローカルに実行されます。通常のツールへの入力がサーバーに送信されることはありません。"
        ]
      },
      {
        "heading": "共有リンク",
        "body": [
          "「結果へのリンクをコピー」を選択すると、リンクを開けるよう入力内容、選択したツール、設定が保存されます。機密情報や個人情報は共有しないでください。共有された結果はデフォルトで180日後に期限切れになります。"
        ]
      },
      {
        "heading": "アクセス解析",
        "body": [
          "どのツールが役立っているかを把握するため、ページと操作の集計データを収集しています。計測には Cookie を使用しない Vercel Analytics と、訪問数とセッションの計測のために Cookie を保存する Google Analytics を利用しています。個人情報を販売することはありません。"
        ]
      }
    ]
  },
  "notFound": {
    "h1": "ページが見つかりません",
    "dek": "代わりに以下の無料書式ツールをお試しください。"
  },
  "guidesIndex": {
    "metaTitle": "ガイド — AI文章の書式を修正する",
    "description": "長いダッシュ、不可視文字、Markdown記号など、AI生成文章の書式のクセをわかりやすく解説するガイド。",
    "h1": "ガイド",
    "dek": "AI文章がなぜ崩れた状態で届くのか、そしてその直し方を解説します。各ガイドの最後には、ワンクリックで処理できるツールを用意しています。",
    "clusters": {
      "ai-tells": "AI文章の見分け方",
      "how-to": "AI出力の修正方法",
      "reference": "リファレンス"
    }
  }
};

export const workspace: WorkspaceMessages = {
  "printPdf": "印刷 / PDF保存",
  "downloaded": "ダウンロードしました",
  "excelDownloaded": "Excelファイルをダウンロードしました",
  "reportImageDownloaded": "レポート画像をダウンロードしました",
  "pasteFirst": "先に文章を貼り付けてください",
  "creatingLink": "リンクを作成中…",
  "couldNotCreateLink": "リンクを作成できませんでした",
  "shareUnavailable": "共有は利用できません",
  "reportNote": "機械的な痕跡のみを集計します。AI判定ではありません。",
  "conversionOptions": "変換オプション",
  "editorView": "エディター表示",
  "caseLabel": "大文字・小文字",
  "caseTitle": "Title Case",
  "caseSentence": "Sentence case",
  "caseUpper": "UPPERCASE",
  "caseLower": "lowercase",
  "dashLabel": "長いダッシュの置換先",
  "dashComma": "カンマ",
  "dashSemicolon": "セミコロン",
  "dashHyphen": "ハイフン",
  "dashRemove": "削除",
  "listLabel": "変換先",
  "listToParagraph": "段落",
  "listToBullets": "箇条書き"
};

export const guideChrome: GuideChrome = {
  "navLabel": "ガイド",
  "onThisPage": "このページの内容",
  "toolsMentioned": "このガイドで紹介しているツール",
  "relatedGuides": "関連ガイド",
  "home": "ホーム"
};
