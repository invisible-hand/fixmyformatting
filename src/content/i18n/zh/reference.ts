import type { ReferenceCopy } from "@/lib/i18n/types";

export const reference: ReferenceCopy = {
  guideLead: "指南",
  pages: {
    "remove-invisible-characters": {
      heading: "扫描器处理的全部不可见字符",
      answer:
        "不可见字符扫描器会删除 {count} 个不可见的 Unicode 字符：零宽空格和零宽连接符、软连字符、方向标记等双向控制字符、单词连接符、不可见数学运算符以及字节顺序标记。普通空格、制表符、不换行空格和换行符都会保留。",
      note: "在此列出，方便你不运行工具也能阅读。U+2065 在 Unicode 中尚未分配，同样会被删除。制表符、不换行空格以及行分隔符和段落分隔符会保留，因为删除它们会让单词或行连在一起。",
    },
    "show-invisible-characters": {
      heading: "查看器标注的全部字符",
      answer:
        "不可见字符查看器会在原位置用 [ZWSP]、[NBSP] 等标记标出 {count} 个字符，不会删除任何内容。它会标出零宽字符、软连字符、方向标记、字节顺序标记、制表符、不换行空格以及行分隔符和段落分隔符。",
      note: "在此列出，方便你不运行工具也能阅读。“扫描器”一列显示不可见字符扫描器对同一字符的处理方式。没有标记的字符不会被查看器标出。",
    },
    "remove-smart-quotes": {
      heading: "哪些引号会被替换",
      answer:
        "智能引号转直引号工具会把四种弯引号字符替换为 ASCII 直引号：两种弯双引号都变成 \"，两种弯单引号（包括弯撇号）都变成 '。文本中的其他内容不会改变。",
      note: "其他引号，如 „ ‚ « » ‹ ›，不会被改动。",
    },
    "remove-em-dashes": {
      heading: "哪些破折号会被替换",
      answer:
        "长破折号移除工具只替换长破折号（—，U+2014）：默认替换为逗号，也可以替换为分号、连字符或直接删除。短破折号、减号和连字符保持不变。",
      note: "替换后，破折号前的空格会被去掉，不会留下多余空格。如果完全删除破折号，连续的空格会合并为一个。",
    },
  },
  headers: {
    character: "字符",
    codePoint: "码点",
    name: "Unicode 名称",
    type: "类型",
    scanner: "扫描器",
    viewer: "查看器标记",
    becomes: "变为",
    output: "工具输出",
  },
  invisibleTypes: {
    softHyphen: "仅在换行处显示的隐藏连字符",
    zeroWidth: "零宽空格或连接符",
    directionMark: "文本方向标记",
    bidiEmbedding: "双向嵌入或覆盖",
    wordJoiner: "单词连接符（阻止换行）",
    mathOperator: "不可见数学运算符",
    isolate: "双向隔离",
    deprecated: "已弃用的格式控制字符",
    bom: "字节顺序标记",
    whitespace: "制表符或不换行空格",
    separator: "行分隔符或段落分隔符",
  },
  removed: "删除",
  kept: "保留",
  notLabelled: "无标记",
  unchanged: "不变",
  defaultLabel: "默认",
};
