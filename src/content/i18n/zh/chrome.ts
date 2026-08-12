import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = {
  "about": {
    "metaTitle": "关于 Fix My Formatting",
    "description": "了解 Fix My Formatting 为什么打造免费、私密的浏览器端文本工具。",
    "h1": "关于 Fix My Formatting",
    "dek": "免费、私密的工具，弥合 AI 对话与日常工作之间的缝隙。",
    "sections": [
      {
        "body": [
          "Fix My Formatting 帮你消除 AI 对话与日常工作之间那些细小又恼人的格式问题。每个工具都免费开放、即时可用，所有文本处理都在浏览器中完成。",
          "没有账户、付费墙，正常转换也不会上传文本。如果你主动创建分享链接，该操作会明确保存文本，以便链接可以正常打开。"
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "隐私 | Fix My Formatting",
    "description": "Fix My Formatting 浏览器工具和可选分享链接的隐私说明。",
    "h1": "隐私",
    "dek": "简而言之：除非你创建分享链接，否则工具输入的内容始终留在你的浏览器中。",
    "sections": [
      {
        "heading": "浏览器内处理",
        "body": [
          "转换和分析都在你的设备上本地运行，常规的工具输入不会发送到我们的服务器。"
        ]
      },
      {
        "heading": "分享链接",
        "body": [
          "当你选择“复制分享链接”时，输入内容、所选工具和设置会被保存，以便链接能够正常打开。请勿分享敏感或个人信息。分享的结果默认在 180 天后过期。"
        ]
      },
      {
        "heading": "统计分析",
        "body": [
          "我们会收集汇总的页面访问和互动数据，用于了解哪些工具最有用。我们使用不写入 Cookie 的 Vercel Analytics，以及会写入 Cookie 以统计访问和会话的 Google Analytics。我们不会出售个人信息。"
        ]
      }
    ]
  },
  "notFound": {
    "h1": "页面不存在",
    "dek": "不妨试试以下这些免费的格式工具。"
  },
  "guidesIndex": {
    "metaTitle": "指南 — 修复 AI 文本格式",
    "description": "用通俗的语言讲解长破折号、不可见字符、Markdown 符号等 AI 生成文本中的常见格式问题。",
    "h1": "指南",
    "dek": "为什么 AI 文本的格式总是出问题，以及如何修复。每篇指南都会附上一个一键解决问题的工具。",
    "clusters": {
      "ai-tells": "识别 AI 文本",
      "how-to": "修复 AI 输出",
      "reference": "参考资料"
    }
  }
};

export const workspace: WorkspaceMessages = {
  "printPdf": "打印 / 保存 PDF",
  "downloaded": "已下载",
  "excelDownloaded": "Excel 文件已下载",
  "reportImageDownloaded": "报告图片已下载",
  "pasteFirst": "请先粘贴文本",
  "creatingLink": "正在创建链接…",
  "couldNotCreateLink": "无法创建链接",
  "shareUnavailable": "分享功能不可用",
  "reportNote": "仅统计机械性格式痕迹，并非 AI 检测。",
  "conversionOptions": "转换选项",
  "editorView": "编辑器视图",
  "caseLabel": "大小写",
  "caseTitle": "首字母大写",
  "caseSentence": "句首大写",
  "caseUpper": "大写",
  "caseLower": "小写",
  "dashLabel": "将长破折号替换为",
  "dashComma": "逗号",
  "dashSemicolon": "分号",
  "dashHyphen": "连字符",
  "dashRemove": "不替换"
};

export const guideChrome: GuideChrome = {
  "navLabel": "指南",
  "onThisPage": "本页内容",
  "toolsMentioned": "本指南提到的工具",
  "relatedGuides": "相关指南",
  "home": "首页"
};
