import type { FigureCopy } from "@/lib/i18n/types";

export const figures: FigureCopy = {
  "dash-widths": {
    "caption": "AI 초고에서 흔히 볼 수 있는 긴 대시 사용 패턴과, 같은 문장을 쉼표로 다시 쓴 모습입니다.",
    "notes": [],
    "labels": {
      "before": "AI 초고",
      "after": "정리 후"
    }
  },
  "ai-tells-panel": {
    "caption": "AI 채팅에서 복사-붙여넣기 후에도 흔히 남아 있는 네 가지 기계적인 패턴입니다.",
    "notes": [],
    "labels": {
      "eyebrow": "흔한 흔적"
    }
  },
  "hidden-characters": {
    "caption": "폭이 0인 공백은 화면에 보이지 않지만 실제 텍스트에는 그대로 남아 있습니다.",
    "notes": [],
    "labels": {
      "before": "보이는 모습",
      "after": "실제 저장된 내용"
    }
  },
  "markdown-in-word": {
    "caption": "같은 답변을 Markdown 그대로 붙여넣은 경우와, 구조가 유지되도록 변환한 경우입니다.",
    "notes": [
      "Word에는 Markdown 파서가 없어서 기호들이 일반 문자로 취급됩니다.",
      "먼저 변환하면 실제 제목, 굵은 글씨, 목록 항목으로 바뀝니다."
    ],
    "labels": {
      "before": "일반 텍스트로 붙여넣기",
      "after": "변환 후"
    }
  },
  "table-to-grid": {
    "caption": "파이프 표는 실제 스프레드시트 셀로 파싱되기 전까지는 그저 일반 텍스트입니다.",
    "notes": [
      "표를 그대로 붙여넣으면 모든 값이 하나의 열에 몰립니다.",
      "XLSX나 CSV로 변환하면 행과 열이 그대로 유지됩니다."
    ],
    "labels": {
      "before": "MARKDOWN",
      "after": "스프레드시트",
      "region": "지역"
    }
  },
  "transcript-to-doc": {
    "caption": "복사한 채팅 대화록이 화자 구분이 명확한 문서로 재구성된 모습입니다.",
    "notes": [
      "화자의 발화가 제목으로 바뀌어 채팅 창 밖에서도 읽기 쉽게 내보낼 수 있습니다."
    ],
    "labels": {
      "before": "복사한 대화록",
      "after": "문서",
      "title": "대화 내보내기",
      "you": "사용자",
      "assistant": "어시스턴트",
      "ask": "이 보고서를 요약해줘",
      "reply": "간결한 요약입니다…",
      "followUp": "수치도 추가해줘"
    }
  },
  "smart-quotes-code": {
    "caption": "곡선 따옴표는 파서가 기대하는 직선 따옴표와는 서로 다른 문자입니다.",
    "notes": [],
    "labels": {
      "before": "채팅에서 붙여넣기",
      "after": "정규화 후"
    }
  },
  "dash-ruler": {
    "caption": "같은 글자 크기로 비교한 하이픈, 중간 대시, 긴 대시와 각각의 표준 용도입니다.",
    "notes": [],
    "labels": {
      "hyphenName": "하이픈",
      "hyphenUse": "복합어: well-known",
      "enName": "중간 대시",
      "enUse": "범위: 2020–2024",
      "emName": "긴 대시",
      "emUse": "문장 중간의 끊김"
    }
  },
  "token-chunks": {
    "caption": "토큰은 단어보다 작은 조각이므로 글자 수와 토큰 수가 일치하는 경우는 드뭅니다.",
    "notes": [
      "글자 36자 · 토큰 7개 · 토큰당 약 5.1자",
      "영어 기준 대략적인 규칙: 토큰 1개 ≈ 글자 4자 ≈ 단어 0.75개.",
      "코드, 영어 외 문자, 희귀한 단어는 글자당 더 많은 토큰을 사용합니다."
    ],
    "labels": {
      "eyebrow": "한 문장, 토큰 일곱 개"
    }
  }
};
