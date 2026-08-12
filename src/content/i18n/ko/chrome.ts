import type { GuideChrome, PageCopy, WorkspaceMessages } from "@/lib/i18n/types";

export const pages: PageCopy = {
  "about": {
    "metaTitle": "Fix My Formatting 소개",
    "description": "Fix My Formatting이 무료이고 사생활 보호가 되는 브라우저 기반 텍스트 도구를 만드는 이유.",
    "h1": "Fix My Formatting 소개",
    "dek": "AI 채팅과 나머지 작업 사이의 틈을 메워주는 무료 개인정보 보호 도구.",
    "sections": [
      {
        "body": [
          "Fix My Formatting은 AI 채팅과 나머지 작업 사이에서 생기는 작고 성가신 문제들을 없애 줍니다. 모든 도구는 무료이며 즉시 열리고, 텍스트는 브라우저에서 처리됩니다.",
          "일반적인 변환 과정에서 계정, 유료 장벽, 업로드는 없습니다. 공유 링크를 만들기로 선택한 경우에만 링크가 작동하도록 텍스트가 명시적으로 저장됩니다."
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "개인정보 처리방침 | Fix My Formatting",
    "description": "Fix My Formatting 브라우저 도구와 선택적 공유 링크에 대한 개인정보 보호 내용.",
    "h1": "개인정보 처리방침",
    "dek": "요약: 공유 링크를 만들지 않는 한 도구 입력 내용은 브라우저에 남습니다.",
    "sections": [
      {
        "heading": "브라우저 처리",
        "body": [
          "변환과 분석은 기기에서 로컬로 실행됩니다. 일반적인 도구 입력 내용은 서버로 전송되지 않습니다."
        ]
      },
      {
        "heading": "공유 링크",
        "body": [
          "“결과 링크 복사”를 선택하면 링크를 열 수 있도록 입력 내용, 선택한 도구, 설정이 저장됩니다. 민감하거나 개인적인 정보는 공유하지 마세요. 공유된 결과는 기본적으로 180일 후에 만료됩니다."
        ]
      },
      {
        "heading": "분석",
        "body": [
          "어떤 도구가 유용한지 파악하기 위해 집계된 페이지 및 상호작용 횟수를 수집합니다. 이를 위해 쿠키를 사용하지 않는 Vercel Analytics와, 방문 및 세션 측정을 위해 쿠키를 저장하는 Google Analytics를 사용합니다. 개인 정보는 판매하지 않습니다."
        ]
      }
    ]
  },
  "notFound": {
    "h1": "페이지를 찾을 수 없습니다",
    "dek": "대신 아래 무료 서식 도구 중 하나를 사용해 보세요."
  },
  "guidesIndex": {
    "metaTitle": "가이드 — AI 텍스트 서식 고치기",
    "description": "긴 대시, 보이지 않는 문자, Markdown 기호 등 AI 생성 텍스트의 서식 문제를 다루는 쉬운 가이드.",
    "h1": "가이드",
    "dek": "AI 텍스트가 왜 깨진 상태로 오는지, 그리고 어떻게 고치는지 알려드립니다. 모든 가이드는 클릭 한 번으로 해결해 주는 도구로 끝납니다.",
    "clusters": {
      "ai-tells": "AI 텍스트 알아보기",
      "how-to": "AI 결과물 고치기",
      "reference": "참고 자료"
    }
  }
};

export const workspace: WorkspaceMessages = {
  "printPdf": "인쇄 / PDF 저장",
  "downloaded": "다운로드됨",
  "excelDownloaded": "Excel 파일 다운로드됨",
  "reportImageDownloaded": "보고서 이미지 다운로드됨",
  "pasteFirst": "먼저 텍스트를 붙여넣으세요",
  "creatingLink": "링크 만드는 중…",
  "couldNotCreateLink": "링크를 만들 수 없습니다",
  "shareUnavailable": "공유할 수 없습니다",
  "reportNote": "기계적인 서식 흔적의 개수만 셉니다. AI 탐지가 아닙니다.",
  "conversionOptions": "변환 옵션",
  "editorView": "편집기 보기",
  "caseLabel": "대소문자",
  "caseTitle": "Title Case",
  "caseSentence": "Sentence case",
  "caseUpper": "대문자",
  "caseLower": "소문자",
  "dashLabel": "긴 대시를 다음으로 바꾸기",
  "dashComma": "쉼표",
  "dashSemicolon": "세미콜론",
  "dashHyphen": "하이픈",
  "dashRemove": "없음"
};

export const guideChrome: GuideChrome = {
  "navLabel": "가이드",
  "onThisPage": "이 페이지의 내용",
  "toolsMentioned": "이 가이드에 소개된 도구",
  "relatedGuides": "관련 가이드",
  "home": "홈"
};
