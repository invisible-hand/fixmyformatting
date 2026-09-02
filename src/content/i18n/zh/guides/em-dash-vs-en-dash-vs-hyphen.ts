import type { GuideTranslation } from "@/lib/i18n";

export const guide: GuideTranslation = {
  title: "长破折号、连接号与连字符的区别",
  description: "连字符、连接号和长破折号是三个不同的 Unicode 字符：各自的正确用法、在 macOS、Windows 和 Word 中的输入方法，以及混用时搜索和正则匹配为什么会出问题。",
  h1: "长破折号、连接号与连字符的区别",
  dek: "三个外形相似、却不可互换的 Unicode 字符。",
  answer: "连字符（-）用于合成词：well-known。连接号（–）表示范围和连接：第 20–24 页。长破折号（—）在句中分隔插入语，作用类似一个语气更强的逗号。它们是三个宽度递增、各自独立的 Unicode 字符，解析器、搜索和排版系统对它们的处理方式都不同。",
  sections: {
    "the-three-characters": {
      heading: "三个字符一览",
      body: "名称源自传统铅字排版：连接号（en dash）的宽度等于大写字母 N，长破折号（em dash）的宽度等于大写字母 M。\n\n| 符号 | 名称 | 码位 | 宽度 | 主要用途 |\n| --- | --- | --- | --- | --- |\n| - | 连字符-减号 | U+002D | 最短 | 合成词 |\n| – | 连接号（En dash） | U+2013 | 中等 | 范围与连接 |\n| — | 长破折号（Em dash） | U+2014 | 最长 | 句中停顿与分隔 |\n\n第一个字符就在键盘上，另外两个则不是——这正是大多数混淆的实际根源：人们在该用连接号或长破折号的地方打了连字符，因为它是唯一不需要快捷键就能输入的符号。",
    },
    "the-hyphen": {
      heading: "连字符",
      body: "连字符把多个部分连成一个整体。\n\n- **名词前的复合修饰语**：a *well-known* author、a *twelve-year-old* dog、a *state-of-the-art* facility。注意，当这个短语移到名词之后时，连字符会消失：the author is *well known*。\n- **某些前缀**，尤其是为了避免字母碰撞或歧义时：*re-elect*、*co-owner*、*re-cover* a chair（区别于 *recover* from illness）。\n- **两端对齐排版中行尾的单词断行**。\n- **复合数字**：*twenty-three*。\n\n严格来说，键盘上这个字符叫*连字符-减号*（hyphen-minus）——一个码位同时充当连字符、减号和命令行参数标志，这是从打字机和早期 ASCII 继承下来的。Unicode 确实有专用的连字符（U+2010）和减号（U+2212），但几乎没有地方使用它们，你也不要开始用：`-` 才是解析器、shell 和 URL 所期望的字符。",
    },
    "the-en-dash": {
      heading: "连接号",
      body: "连接号表示*到*、*至*或*之间*。它是连接，而不是合并。\n\n- **数字范围**：第 *20–24* 页、*2020–2024*、*9am–5pm*。文体规范建议不要与文字混用：应写 *from 2020 to 2024*，而不是 *from 2020–2024*。\n- **独立实体之间的连接或对立**：*Paris–Dakar* 拉力赛、*doctor–patient* 关系、*east–west* 轴线。这里与连字符的区别很重要——用连字符的 *Franco-German* 暗示一个融合的整体，而用连接号的 *France–Germany* 表示相互关联的两方。\n- **其中一部分本身已是多词短语的复合修饰语**：a *post–World War II* settlement。如果用连字符，它只会连接到 \"World\"。\n- **比分和投票结果**：*3–1* 获胜。\n\n连接号是三者中使用最少、也最常被连字符替代的符号。在行文中，这种替代只是细微的排版不精确，很少有读者会注意到。但在数据中就不细微了：用连接号书写的日期范围无法匹配查找连字符的正则表达式。",
    },
    "the-em-dash": {
      heading: "长破折号",
      body: "长破折号用于分隔短语，造成的停顿比逗号更强，又比句号更弱。\n\n- **成对使用，包住插入语**：*The results — which nobody expected — were clear.*\n- **单独使用，引出结论或转折**：*She checked everything twice — and still missed it.*\n- **在对话中表示被打断的话**。\n\n**是否加空格**是唯一真正存在分歧的文体问题，而且分歧是三方的。Chicago、APA 和 MLA 让长破折号紧贴文字：*word—word*。AP Stylebook 则在两侧各加一个空格：*word — word*。遵循 New Hart's Rules 的英国出版规范改用两侧带空格的连接号：*word – word*。三种写法都正确，关键是同一篇文档内保持一致。AI 输出通常使用带空格的长破折号，那其实就是 AP 的写法，而不是什么混合体——只有把 Chicago 当作美国唯一惯例的编辑才会觉得它不对劲。\n\n长破折号还成了 AI 生成文本的一种非官方标志，因为模型使用它的频率远比人类稳定。这一点在 [为什么 ChatGPT 用这么多长破折号](/guides/why-chatgpt-uses-em-dashes) 中有详细讨论。",
    },
    "typing-them": {
      heading: "如何输入每个符号",
      body: "| 平台 | 连接号（–） | 长破折号（—） |\n| --- | --- | --- |\n| macOS | <kbd>Option</kbd> + <kbd>-</kbd> | <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd> |\n| Windows | <kbd>Alt</kbd> + <kbd>0150</kbd> | <kbd>Alt</kbd> + <kbd>0151</kbd> |\n| Linux | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>u</kbd>，2013 | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>u</kbd>，2014 |\n| Microsoft Word | 输入 `word - word`（连字符两侧带空格）后再敲一个空格会自动更正 | 输入 `word--word` 后再敲一个空格会自动更正 |\n| Google Docs | 插入 &rarr; 特殊字符 | 默认不做任何转换；使用插入 &rarr; 特殊字符，或自行添加 `--` 替换规则 |\n| HTML | `&ndash;` | `&mdash;` |\n| iOS / Android | 长按连字符键 | 长按连字符键 |\n\nWindows 的 Alt 代码需要数字小键盘，这就是为什么很多笔记本用户干脆从来不输入这些字符。",
    },
    "when-it-breaks-things": {
      heading: "什么时候混用真的会出问题",
      body: "在行文中，该用连接号的地方用了连字符只是排版上的小瑕疵。但在行文之外，这是三个不同的码位，区别是功能性的：\n\n- **搜索和查找替换**按精确字符匹配。搜索 `2020-2024` 找不到 `2020–2024`。\n- **Shell 命令**需要 U+002D。从文档里粘贴的 `--force` 如果被自动更正变成了长破折号，就不再是有效的参数标志，而报错信息里不会提到破折号。\n- **CSV 和 JSON** 把连接号和长破折号当作普通文本，通常没问题——直到某个本该与键名匹配的值匹配不上。\n- **URL 和 slug** 只接受 ASCII 连字符。\n- **排序和去重**把三者视为不同字符，看起来完全相同的条目不会被归为一组。\n\n如果需要统一整篇文档中的破折号，[删除文本中的长破折号](/remove-em-dashes) 可以将它们替换为你选择的替代符号，并报告替换数量，让你能核对数量是否符合预期，而不是盲目信任一次静默替换。引号方面的类似陷阱在 [为什么弯引号会破坏代码](/guides/smart-quotes-break-code) 中有介绍。",
    },
  },
  faqs: [
    { question: "长破折号和连接号有什么区别？", answer: "连接号（–，U+2013）表示\"到\"或\"至\"，用于标记范围，如 2020–2024。长破折号（—，U+2014）在句中分隔短语，作用类似一个语气更强的逗号。长破折号的宽度大约是连接号的两倍，两者是独立的 Unicode 字符。" },
    { question: "什么时候应该用连字符而不是破折号？", answer: "要把多个词合成一个整体时用连字符：well-known、twenty-three、re-elect。如果你要表达的是范围、两方之间的连接，或句中的停顿，就应该用连接号或长破折号。" },
    { question: "长破折号两侧要加空格吗？", answer: "取决于所遵循的文体规范。Chicago、APA 和 MLA 让它紧贴文字（word—word）。AP Stylebook 在两侧各加一个空格（word — word）。遵循 New Hart's Rules 的英国出版规范则改用两侧带空格的连接号（word – word）。三种写法都正确，关键是同一篇文档内保持一致。" },
    { question: "如何输入长破折号？", answer: "在 macOS 上按 Option + Shift + 连字符键。在 Windows 上按住 Alt 并在数字小键盘上输入 0151。在 Word 中，在单词之间输入两个连字符会自动转换；Google Docs 既没有内置快捷键，默认也不会自动转换，需要使用插入 > 特殊字符，或自行添加替换规则。在手机上，长按连字符键。" },
    { question: "用连字符代替连接号要紧吗？", answer: "在行文中，这只是大多数读者注意不到的小瑕疵。但在数据、代码、URL 或任何会被搜索和解析的内容中，影响很大——因为三者是不同的字符，精确匹配会失败。" },
  ],
};
