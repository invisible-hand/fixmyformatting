import type { ReferenceCopy } from "@/lib/i18n/types";

export const reference: ReferenceCopy = {
  guideLead: "가이드",
  pages: {
    "remove-invisible-characters": {
      heading: "스캐너가 처리하는 모든 보이지 않는 문자",
      answer:
        "보이지 않는 문자 스캐너는 보이지 않는 유니코드 문자 {count}개를 제거합니다. 너비가 없는 공백과 결합자, 소프트 하이픈, 방향 표시와 기타 양방향 제어 문자, 단어 결합자, 보이지 않는 수학 연산자, 바이트 순서 표시(BOM)가 해당합니다. 일반 공백, 탭, 줄바꿈 없는 공백, 줄바꿈은 그대로 유지됩니다.",
      note: "도구를 실행하지 않고도 읽을 수 있도록 여기에 모두 적어 두었습니다. U+2065는 유니코드에서 지정되지 않은 코드 포인트이지만 이것도 제거됩니다. 탭, 줄바꿈 없는 공백, 줄 구분자와 문단 구분자는 지우면 단어나 줄이 붙어 버리므로 유지합니다.",
    },
    "show-invisible-characters": {
      heading: "뷰어가 표시하는 모든 문자",
      answer:
        "보이지 않는 문자 뷰어는 문자 {count}개를 제자리에서 [ZWSP], [NBSP] 같은 표시로 보여 주며 아무것도 삭제하지 않습니다. 너비가 없는 문자, 소프트 하이픈, 방향 표시, 바이트 순서 표시, 탭, 줄바꿈 없는 공백, 줄 구분자와 문단 구분자를 표시합니다.",
      note: "도구를 실행하지 않고도 읽을 수 있도록 여기에 모두 적어 두었습니다. 스캐너 열은 보이지 않는 문자 스캐너가 같은 문자를 어떻게 처리하는지 보여 줍니다. 표시가 없는 문자는 뷰어가 표시하지 않습니다.",
    },
    "remove-smart-quotes": {
      heading: "바뀌는 따옴표",
      answer:
        "스마트 따옴표를 곧은 따옴표로 바꾸는 도구는 굽은 따옴표 문자 네 개를 곧은 ASCII 따옴표로 바꿉니다. 굽은 큰따옴표 두 개는 모두 \" 로, 굽은 작은따옴표와 굽은 아포스트로피는 모두 ' 로 바뀝니다. 그 밖의 텍스트는 바뀌지 않습니다.",
      note: "„ ‚ « » ‹ › 같은 다른 따옴표는 바뀌지 않습니다.",
    },
    "remove-em-dashes": {
      heading: "바뀌는 대시",
      answer:
        "긴 대시 제거 도구는 긴 대시(—, U+2014)만 바꿉니다. 기본값은 쉼표이고, 세미콜론, 하이픈 또는 아무것도 없음으로 바꿀 수도 있습니다. 짧은 대시, 마이너스 기호, 하이픈은 그대로 둡니다.",
      note: "바꾼 뒤에는 대시 앞의 공백을 제거해 불필요한 공백이 남지 않습니다. 대시를 완전히 삭제하면 연속된 공백은 하나로 줄어듭니다.",
    },
  },
  headers: {
    character: "문자",
    codePoint: "코드 포인트",
    name: "유니코드 이름",
    type: "종류",
    scanner: "스캐너",
    viewer: "뷰어 표시",
    becomes: "변환 결과",
    output: "도구 출력",
  },
  invisibleTypes: {
    softHyphen: "줄이 바뀔 때만 보이는 숨은 하이픈",
    zeroWidth: "너비가 없는 공백 또는 결합자",
    directionMark: "텍스트 방향 표시",
    bidiEmbedding: "양방향 임베딩 또는 재정의",
    wordJoiner: "단어 결합자(줄바꿈 방지)",
    mathOperator: "보이지 않는 수학 연산자",
    isolate: "양방향 격리",
    deprecated: "사용 중단된 서식 제어 문자",
    bom: "바이트 순서 표시",
    whitespace: "탭 또는 줄바꿈 없는 공백",
    separator: "줄 구분자 또는 문단 구분자",
  },
  removed: "제거",
  kept: "유지",
  notLabelled: "표시 없음",
  unchanged: "변경 없음",
  defaultLabel: "기본값",
};
