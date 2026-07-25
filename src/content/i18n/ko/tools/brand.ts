import type { BrandCopy } from "@/lib/i18n/types";

export const brand: BrandCopy = {
  actionName: {
    "to-word": "{brand}를 Word로 변환",
    "to-pdf": "{brand}를 PDF로 변환",
    "to-google-docs": "{brand}를 Google Docs로 변환",
    "table-to-excel": "{brand} 표를 Excel로 변환",
    "remove-formatting": "{brand} 서식 제거",
  },
  actionTitle: {
    "to-word": "{brand}를 Word로 변환 — 무료",
    "to-pdf": "{brand}를 PDF로 변환 — 무료",
    "to-google-docs": "{brand}를 Google Docs로 변환",
    "table-to-excel": "{brand} 표를 Excel로 변환",
    "remove-formatting": "{brand} 서식 제거 — 무료",
  },
  actionDescription: {
    "to-word": "{brand} 답변을 제목, 목록, 코드, 표가 그대로 유지된 편집 가능한 Word 문서로 변환합니다.",
    "to-pdf": "텍스트를 업로드하지 않고 {brand} 답변을 깔끔한 인쇄용 PDF 파일로 변환합니다.",
    "to-google-docs": "{brand} 결과물을 제목, 목록, 링크, 강조, 표를 유지한 채 Google Docs로 옮깁니다.",
    "table-to-excel": "{brand} Markdown 표를 정렬과 편집이 가능한 실제 Excel 행과 열로 변환합니다.",
    "remove-formatting": "읽기 쉬운 글자는 그대로 두고 {brand} 답변의 Markdown 서식을 제거합니다.",
  },
  actionGuidance: {
    "to-word": "{brand} 답변을 보고서, 브리프, 과제 등 다른 사람이 Word에서 편집할 수 있는 문서로 만들어야 할 때 사용하세요.",
    "to-pdf": "브라우저에서 PDF로 저장을 선택하기 전에, 실시간 미리보기로 {brand} 답변이 인쇄됐을 때의 모습을 확인할 수 있습니다.",
    "to-google-docs": "{brand}에서 일반 붙여넣기를 하면 Markdown 기호가 그대로 보일 때, 서식이 적용된 결과를 복사해 Google Docs에 붙여넣으세요.",
    "table-to-excel": "채팅에서 {brand}가 표시하는 파이프와 대시 표 문법을 고쳐 실제 .xlsx 스프레드시트로 다운로드합니다.",
    "remove-formatting": "{brand}의 별표와 제목 기호가 그대로 노출되는 이메일, 양식, 메신저, 편집기에서 깔끔한 텍스트를 사용하세요.",
  },
  reasons: {
    "chatgpt": "ChatGPT는 유용한 구조를 Markdown으로 반환하는 경우가 많아, 오피스 프로그램에 붙여넣으면 별표, 해시, 파이프 표가 그대로 노출됩니다.",
    "claude": "Claude는 길고 정교하게 구조화된 답변을 자주 작성하는데, 제목과 표가 일반 문서처럼 동작하려면 변환이 필요합니다.",
    "gemini": "Gemini의 표는 채팅 출력이 스프레드시트 셀이 아닌 Markdown을 사용하기 때문에 파이프와 구분 대시가 그대로 붙여넣어질 수 있습니다.",
    "copilot": "Copilot 답변은 본문, 목록, 코드 중심의 Markdown이 섞여 있어 직접 붙여넣으면 시각적 계층 구조가 유지되지 않을 수 있습니다.",
    "perplexity": "Perplexity 답변은 Markdown 구조와 출처 링크가 함께 포함되는 경우가 많아, 조사 내용을 재활용할 때 깔끔한 변환이 중요합니다.",
    "deepseek": "DeepSeek는 기술적인 답변을 Markdown으로 형식화하는 경우가 많으며, 코드 블록과 수식이 일반 붙여넣기로는 그대로 노출됩니다.",
  },
  faqs: [
    { question: "{name}은 어떻게 사용하나요?", answer: "{brand}에서 필요한 내용을 복사해 위 편집기에 붙여넣으면 실시간 결과를 바로 사용할 수 있습니다." },
    { question: "{brand} 대화 내용이 업로드되나요?", answer: "아니요. 변환은 브라우저에서 이루어집니다. 공유 링크를 직접 만들 때만 텍스트가 저장됩니다." },
    { question: "변환된 {brand} 결과를 편집할 수 있나요?", answer: "네. 편집 가능한 형식으로 복사하거나 다운로드하면 결과를 그대로 편집할 수 있습니다." },
  ],
};
