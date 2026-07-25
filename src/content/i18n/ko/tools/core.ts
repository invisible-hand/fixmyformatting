import type { ToolCopy } from "@/lib/i18n/types";

export const tools: Partial<Record<string, ToolCopy>> = {
  "markdown-to-word": { name: "Markdown을 Word로 변환", description: "Markdown을 올바르게 서식화된 Word 문서로 무료로 변환합니다." },
  "markdown-to-pdf": { name: "Markdown을 PDF로 변환", description: "Markdown을 브라우저에서 깔끔한 PDF로 변환합니다." },
  "markdown-to-google-docs": { name: "Markdown을 Google Docs로 변환", description: "제목, 목록, 링크와 표를 유지해 Google Docs로 옮깁니다." },
  "remove-markdown-formatting": { name: "Markdown 서식 제거", description: "본문은 유지하면서 별표, 해시 등 Markdown 기호를 제거합니다." },
  "markdown-table-to-excel": { name: "Markdown 표를 Excel로 변환", description: "Markdown 파이프 표를 Excel 행과 열로 변환합니다." },
  "markdown-table-to-csv": { name: "Markdown 표를 CSV로 변환", description: "Markdown 표를 호환 가능한 깔끔한 CSV로 변환합니다." },
  "markdown-viewer": { name: "온라인 Markdown 뷰어", description: "파일을 업로드하지 않고 서식이 적용된 Markdown을 실시간으로 확인합니다." },
  "markdown-to-html": { name: "Markdown을 HTML로 변환", description: "Markdown에서 깔끔하고 의미 있는 HTML을 즉시 생성합니다." },
  "word-to-markdown": { name: "Word를 Markdown으로 변환", description: "Word나 Google Docs의 서식 있는 텍스트를 Markdown으로 변환합니다." },
  "remove-em-dashes": { name: "텍스트에서 긴 대시 제거", description: "긴 대시를 찾아 더 일반적인 문장 부호로 바꿉니다." },
  "clean-ai-text": { name: "ChatGPT 및 AI 텍스트 정리", description: "AI 텍스트의 대시, 곡선 따옴표, 이모지와 숨은 문자를 정리합니다." },
  "remove-invisible-characters": { name: "보이지 않는 문자 제거", description: "폭이 0인 공백, 소프트 하이픈과 방향 표시를 찾아 제거합니다." },
};
