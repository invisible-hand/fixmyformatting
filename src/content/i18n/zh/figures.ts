import type { FigureCopy } from "@/lib/i18n/types";

export const figures: FigureCopy = {
  "dash-widths": {
    "caption": "AI 草稿中典型的长破折号用法，以及用逗号改写后的同一句子。",
    "notes": [],
    "labels": {
      "before": "AI 草稿",
      "after": "清理后"
    }
  },
  "ai-tells-panel": {
    "caption": "从 AI 对话复制粘贴后常见的四种机械性格式痕迹。",
    "notes": [],
    "labels": {
      "eyebrow": "常见痕迹"
    }
  },
  "hidden-characters": {
    "caption": "零宽空格在屏幕上不可见，但仍存在于底层文本中。",
    "notes": [],
    "labels": {
      "before": "你看到的内容",
      "after": "实际存储的内容"
    }
  },
  "markdown-in-word": {
    "caption": "同一段回复：以原始 Markdown 粘贴，以及转换后保留结构的效果。",
    "notes": [
      "Word 没有 Markdown 解析器，因此这些符号会被当作普通字符。",
      "先转换可以将它们变成真正的标题、加粗文本和列表项。"
    ],
    "labels": {
      "before": "以纯文本粘贴",
      "after": "转换后"
    }
  },
  "table-to-grid": {
    "caption": "竖线表格只是纯文本，只有解析后才会成为真正的电子表格单元格。",
    "notes": [
      "直接粘贴原始表格会把所有值塞进同一列。",
      "转换为 XLSX 或 CSV 可以保持行和列的完整结构。"
    ],
    "labels": {
      "before": "Markdown",
      "after": "电子表格",
      "region": "地区"
    }
  },
  "transcript-to-doc": {
    "caption": "将复制的对话记录重组为带有说话人标注的文档。",
    "notes": [
      "每轮发言会变成标题，使导出的文档在聊天窗口之外也清晰易读。"
    ],
    "labels": {
      "before": "复制的对话记录",
      "after": "文档",
      "title": "对话导出",
      "you": "你",
      "assistant": "助手",
      "ask": "总结这份报告",
      "reply": "以下是简要总结…",
      "followUp": "补充数据"
    }
  },
  "smart-quotes-code": {
    "caption": "弯引号与解析器期望的直引号是不同的字符。",
    "notes": [],
    "labels": {
      "before": "从对话粘贴",
      "after": "规范化后"
    }
  },
  "dash-ruler": {
    "caption": "同一字号下的连字符、短破折号和长破折号，及其标准用法。",
    "notes": [],
    "labels": {
      "hyphenName": "连字符",
      "hyphenUse": "复合词：well-known",
      "enName": "短破折号",
      "enUse": "范围：2020–2024",
      "emName": "长破折号",
      "emUse": "句中停顿"
    }
  },
  "token-chunks": {
    "caption": "Token 是词语的片段，因此字符数和 token 数很少一致。",
    "notes": [
      "37 个字符 · 7 个 token · 平均每个 token 约 5.3 个字符",
      "英语经验法则：1 个 token ≈ 4 个字符 ≈ 0.75 个单词。",
      "代码、非英语文字和生僻词每个字符会占用更多 token。"
    ],
    "labels": {
      "eyebrow": "一句话，七个 TOKEN"
    }
  }
};
