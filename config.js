/* =====================================================================
 *  사이트 설정 파일 — 사이트에 보이는 모든 글과 항목은 여기서만 고치면 됩니다.
 *  · 따옴표("…") 안의 글자만 바꾸세요.
 *  · 항목을 늘리려면 { … } 한 덩어리를 복사해 붙여 넣고, 줄이려면 지우면 됩니다.
 *  · 저장 후 브라우저에서 새로고침(F5)하면 바로 반영됩니다.
 *  · 화면 순서: 첫 화면 → 통계 → 강의 소개 → 커리큘럼
 *               → 수강 안내 → 참여하기 → 내 강의실 → FAQ → 공지사항 → 교수자(푸터)
 * ===================================================================== */
window.SITE_CONFIG = {
  /* ── 기본 정보 ─────────────────────────────────────────── */
  site: {
    university: "고려대학교",
    department: "사범대학",
    courseTitle: "디지털 교육",
    logoImage: "images/logo.webp", // 로고 이미지 경로. 비워 두면 아래 이모지가 로고로 쓰입니다.
    logoEmoji: "🌸",
    // 첫 화면·브라우저 탭의 제목 옆에 붙는 소속 줄. 비워 두면 위의 "대학교 학과"가 표시됩니다.
    brandSub: "김민영(고려대학교 AI중심대학사업단)",
    // 헤더 왼쪽 위 제목의 윗줄. 비워 두면 위의 소속 줄(brandSub)이 표시됩니다.
    headerSub: "AI 기반 디지털 도구 활용 능력 배양",
    // 헤더 로고 옆 제목에 붙는 사이트 버전. 형식은 v.큰변경.기능추가.수정(두 자리) — 예) v.1.0.10 → v.1.0.11 → … → v.1.0.99
    // 내용을 고쳐 다시 올릴 때 숫자를 올리세요. 비워 두면 표시하지 않습니다.
    version: "v.1.0.10",
  },

  /* ── 헤더 메뉴 (id는 아래 각 섹션의 id와 같아야 합니다) ── */
  nav: [
    { id: "about", label: "강의 소개" },
    { id: "curriculum", label: "커리큘럼" },
    { id: "portfolio", label: "포트폴리오" },
    { id: "guide", label: "수강 안내" },
    { id: "participate", label: "참여하기" },
    { id: "classroom", label: "내 강의실" },
    { id: "faq", label: "FAQ" },
    { id: "instructor", label: "교수자" },
  ],

  /* ── 첫 화면 ───────────────────────────────────────────── */
  hero: {
    badge: "2026 2학기 사범대학 교과목",
    subtitle: "AI 기반 디지털 도구 활용 능력 배양",
    description:
      "생성형 AI와 다양한 디지털 도구로 수업 자료를 만들고, 학습 데이터를 분석하며, 디지털 수업을 설계·운영하는 능력을 기릅니다. 매주 실습으로 결과물을 쌓아, 학기 말에는 AI·디지털 도구를 활용한 수업 지도안과 모의수업을 완성합니다.",
    buttons: [
      // href가 "#"으로 시작하면 페이지 안 이동, 주소(https://…)면 새 창으로 열립니다.
      { label: "수강 신청", href: "#apply", primary: true },
      { label: "커리큘럼 보기", href: "#curriculum", primary: false },
    ],
    // 한눈에 보기
    quickInfo: [
      { icon: "🗓️", label: "일정", value: "2026. 9. 1 – 12. 8 (15주)" },
      { icon: "⏰", label: "시간", value: "매주 화요일 13:00 – 15:00" },
      { icon: "💻", label: "수업 방식", value: "이론 강의 + 실습 병행" },
      { icon: "👥", label: "수강 대상", value: "사범대학 학생" },
    ],
  },

  /* ── 공지사항 (자주 묻는 질문 아래. 카드를 누르면 내용이 펼쳐집니다) ──
   *   관리자 로그인 뒤 공지사항 섹션에서 추가·수정·삭제할 수 있습니다.
   *   pinned: true면 '중요' 표시와 함께 맨 위로. 그 밖에는 최근 날짜가 위로 옵니다. */
  notices: {
    id: "notices",
    eyebrow: "Notice",
    title: "공지사항",
    lead: "수업과 관련한 새 소식을 알려 드립니다.",
    items: [
      { title: "(예시) 8주차 중간 프로젝트 발표 안내", text: "예시 공지입니다. 실제 내용으로 바꾸거나 삭제해 주세요.\n발표 순서와 준비 사항을 이곳에 적습니다.", date: "2026-10-04", pinned: true },
      { title: "(예시) 실습용 계정 준비 안내", text: "예시 공지입니다. 실제 내용으로 바꾸거나 삭제해 주세요.", date: "2026-09-01", pinned: false },
    ],
  },

  /* ── 숫자로 보는 강의 ──────────────────────────────────── */
  stats: [
    { value: 15, suffix: "주", label: "집중 과정" },
    { value: 12, suffix: "개", label: "실습 AI·디지털 도구" },
    { value: 2, suffix: "회", label: "프로젝트 (중간·기말)" },
    { value: 12, suffix: "개", label: "최종 프로젝트 예시" },
  ],

  /* ── 강의 소개: 강의 내용 + 특징 슬라이드 + 학습 목표 ── */
  about: {
    id: "about",
    eyebrow: "About",
    title: "강의 소개",
    lead: "생성형 AI와 디지털 도구로 수업 자료 제작부터 수업 설계·운영까지 직접 해 보는 예비 교사 강의입니다.",
    // 강의 내용 (문단)
    intro: [
      "본 교과목은 사범대학 학생이 예비 교사로서 생성형 AI와 다양한 디지털 도구를 교육 현장에 맞게 활용하는 능력을 배양하는 것을 목적으로 합니다. ChatGPT, Claude, Gemini, NotebookLM 등의 생성형 AI의 원리와 한계를 이해하고, 프롬프트를 활용해 학습지·퀴즈·평가 문항 등 수업 자료를 직접 만들어 봅니다.",
      "수업에서는 Google Workspace와 Google Classroom, Canva, Padlet, Kahoot!, Mentimeter, Vrew 등 학교 현장에서 널리 쓰이는 디지털 도구를 실습하며, 협업 수업·참여형 수업·온라인 수업을 설계합니다. 또한 성적·설문 등 학습 데이터를 분석해 학생 맞춤형 피드백을 만드는 방법과, 학생 개인정보 보호·AI 윤리 등 교사가 꼭 알아야 할 디지털 시민성을 함께 다룹니다.",
      "수업은 이론 강의와 실습을 병행하며, 매주 AI·디지털 도구로 단계별 결과물을 제작합니다. 중간에는 디지털 수업 자료 꾸러미를 만들고, 학기 말에는 자신의 전공 교과 단원을 골라 디지털 기반 수업 지도안을 완성한 뒤 모의수업으로 시연합니다.",
    ],
    // 좌우로 넘겨 보는 슬라이드
    slidesTitle: "이 강의의 특징",
    slides: [
      { icon: "🧑‍🏫", title: "예비 교사를 위한 실습", text: "교과 수업에 바로 쓸 수 있는 자료와 활동을 매주 직접 만들어 봅니다." },
      { icon: "🤖", title: "생성형 AI 제대로 쓰기", text: "AI의 원리와 한계를 이해하고, 좋은 프롬프트로 수업 자료를 만들고 결과를 검증합니다." },
      { icon: "🧰", title: "현장의 디지털 도구", text: "Google Classroom, Canva, Padlet, Kahoot! 등 학교에서 많이 쓰는 도구를 익힙니다." },
      { icon: "📊", title: "데이터로 보는 수업", text: "성적·설문 데이터를 분석해 학생 이해도를 파악하고 맞춤형 피드백을 설계합니다." },
      { icon: "⚖️", title: "AI 윤리와 디지털 시민성", text: "개인정보 보호, 저작권, 알고리즘 편향 등 교실에서 AI를 책임 있게 쓰는 원칙을 세웁니다." },
      { icon: "🎤", title: "수업 설계와 모의수업", text: "전공 교과 단원으로 디지털 기반 수업 지도안을 만들고 모의수업으로 시연합니다." },
    ],
    // 학습 목표
    goalsTitle: "강의 목표",
    goalsLead: "생성형 AI와 디지털 도구의 원리를 이해하고, 이를 교과 수업에 맞게 선택·활용하여 디지털 수업을 설계·운영·평가할 수 있는 예비 교사의 역량을 배양합니다.",
    goals: [
      "디지털 대전환 시대 교육의 변화와 교사에게 필요한 디지털 역량을 설명할 수 있다.",
      "생성형 AI의 작동 원리와 한계를 이해하고, 프롬프트를 설계·개선할 수 있다.",
      "AI와 디지털 도구로 학습지·퀴즈·슬라이드·영상 등 수업 자료를 제작할 수 있다.",
      "클라우드 협업 도구와 LMS를 활용해 협업 수업과 온라인 수업을 운영할 수 있다.",
      "실시간 퀴즈·투표 등 참여형 디지털 활동을 수업에 적용할 수 있다.",
      "학습 데이터를 분석·시각화해 학생 맞춤형 피드백을 설계할 수 있다.",
      "학생 개인정보 보호, 저작권, AI 윤리를 고려해 디지털 도구를 책임 있게 사용할 수 있다.",
      "교과 목표에 맞는 디지털 도구를 선택해 수업 지도안을 설계하고 모의수업으로 시연할 수 있다.",
    ],

    /* 인포그래픽 (강의 소개 맨 아래). 통째로 지우면 표시되지 않습니다.
     *   inputs → outputs : 무엇을 활용해 무엇을 만드는지
     *   steps            : 제작 과정
     *   roadmap          : 학기 흐름. span은 그 단계의 주 수(막대 길이)
     *   toolGroups       : 단계별 도구 */
    infographic: {
      title: "한눈에 보는 디지털 교육",
      inputsTitle: "활용하는 것",
      inputs: [
        { icon: "🤖", title: "생성형 AI", text: "ChatGPT · Claude · Gemini · NotebookLM" },
        { icon: "🧰", title: "디지털 도구", text: "Google Workspace · Classroom · Canva · Padlet · Kahoot!" },
        { icon: "📊", title: "교육 데이터", text: "성적 · 설문 · 학습 기록 · 평가 결과" },
      ],
      outputsTitle: "만드는 것",
      outputs: [
        { icon: "📚", label: "수업 자료" },
        { icon: "🧑‍🏫", label: "디지털 수업" },
        { icon: "📈", label: "학습 데이터 리포트" },
      ],
      stepsTitle: "수업 설계 과정",
      steps: [
        { icon: "🔍", title: "분석", text: "교과 목표·학습자 분석" },
        { icon: "💬", title: "AI 활용", text: "프롬프트로 자료 초안 생성" },
        { icon: "🎨", title: "자료 제작", text: "디지털 도구로 콘텐츠 완성" },
        { icon: "🏫", title: "수업 운영", text: "참여형 활동·LMS 운영" },
        { icon: "📝", title: "평가·성찰", text: "데이터 기반 피드백" },
      ],
      roadmapTitle: "15주 학습 흐름",
      roadmap: [
        { weeks: "1–2주", span: 2, title: "이해", text: "디지털 교육의 변화와 교사의 디지털 역량" },
        { weeks: "3–7주", span: 5, title: "도구 활용", text: "생성형 AI, 수업 자료, 협업, 시각 자료, 영상" },
        { weeks: "8주", span: 1, title: "중간 프로젝트", text: "디지털 수업 자료 꾸러미" },
        { weeks: "9–13주", span: 5, title: "수업 적용", text: "참여형 수업, LMS, 데이터 분석, AI 평가, 윤리" },
        { weeks: "14주", span: 1, title: "수업 설계", text: "디지털 기반 수업 지도안" },
        { weeks: "15주", span: 1, title: "최종 발표", text: "모의수업과 성찰" },
      ],
      toolsTitle: "수업에 쓰는 AI·디지털 도구",
      toolGroups: [
        { title: "생성형 AI", items: ["ChatGPT", "Claude", "Gemini", "NotebookLM"] },
        { title: "자료 제작", items: ["Canva", "Gamma", "Vrew"] },
        { title: "협업·수업 운영", items: ["Google Workspace", "Google Classroom", "Padlet"] },
        { title: "참여·평가", items: ["Kahoot!", "Mentimeter"] },
      ],
    },
  },

  /* ── 커리큘럼 ──────────────────────────────────────────── */
  curriculum: {
    id: "curriculum",
    eyebrow: "Curriculum",
    title: "커리큘럼",
    lead: "주차를 누르면 날짜·장소·학습 내용·과제를 볼 수 있습니다. 일정은 학기 중 조정될 수 있습니다.",
    weeksTitle: "주차별 학습",
    calendarTitle: "월간 수업 달력",

    /* 수업 일정 기본값 — 날짜는 첫 수업일부터 매주 같은 요일로 자동 계산됩니다.
     *   firstClass : 1주차 수업일 (2026-09-01은 화요일)
     *   time       : 기본 수업 시간
     *   location   : 기본 수업 장소
     *   submitUrl  : 과제 제출 버튼이 열 주소. "#classroom"이면 이 사이트의 '내 강의실'로 이동합니다. */
    schedule: {
      firstClass: "2026-09-01",
      time: "13:00 – 15:00",
      location: "인문관 203호",
      submitUrl: "#classroom",
    },

    /* 주차별 내용
     *   topics     : 학습 내용 (여러 줄 가능)
     *   videos     : 참고 영상 링크. 예) [{ label: "영상 제목", url: "https://…" }]  없으면 [] 로 두세요.
     *   assignment : 과제가 있는 주에만 넣습니다. due는 "연-월-일T시:분" 형식.
     *                submitUrl을 따로 적으면 그 과제만 다른 주소로 연결됩니다.
     *   date/time/location : 휴강·보강 등으로 그 주만 다를 때 적습니다.
     *                (예) date: "2026-05-07", location: "△△관 101호" */
    weeks: [
      {
        week: 1, title: "디지털 교육 오리엔테이션", tag: "",
        topics: [
          "교과목의 목적과 전체 학습 과정 안내",
          "디지털 대전환과 학교 교육의 변화",
          "AI 디지털교과서와 디지털 수업 사례 살펴보기",
          "나의 디지털 도구 활용 수준 진단",
          "학기 프로젝트(수업 자료 꾸러미·수업 설계) 소개",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 2, title: "디지털 시대의 교사 역량", tag: "",
        topics: [
          "교사의 디지털 역량 프레임워크 (TPACK, DigCompEdu)",
          "에듀테크의 유형과 교육적 활용",
          "디지털 리터러시와 AI 리터러시",
          "디지털 기반 교육혁신 정책 이해",
          "교과별 디지털 수업 우수 사례 분석",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 3, title: "생성형 AI 이해와 프롬프트", tag: "실습",
        topics: [
          "생성형 AI의 작동 원리와 한계 (환각, 편향)",
          "ChatGPT·Claude·Gemini 비교 체험",
          "좋은 프롬프트의 구조 (역할·맥락·조건·형식)",
          "교사 업무에 쓰는 프롬프트 만들기",
          "AI 답변 검증과 출처 확인",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 4, title: "AI로 수업 자료 만들기", tag: "실습",
        topics: [
          "AI로 학습지·활동지 초안 만들기",
          "수준별 읽기 자료와 예시 문항 생성",
          "NotebookLM으로 교재·자료 요약하고 질문 만들기",
          "AI 생성 자료의 정확성·적절성 검토",
          "전공 교과 수업 자료 1종 제작",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 5, title: "디지털 협업과 클라우드", tag: "실습",
        topics: [
          "Google Workspace (문서·스프레드시트·드라이브) 공유와 권한",
          "실시간 공동 편집과 댓글 피드백",
          "Padlet으로 생각 모으기와 협업 게시판",
          "Canva 화이트보드로 모둠 활동 설계",
          "협업 수업 활동 시나리오 작성",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 6, title: "프레젠테이션과 시각 자료", tag: "실습",
        topics: [
          "시각 자료 디자인의 기본 원칙",
          "Canva·Google Slides로 수업 슬라이드 만들기",
          "Gamma로 AI 프레젠테이션 초안 만들기",
          "인포그래픽과 카드뉴스 제작",
          "이미지 저작권과 무료 자료 활용",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 7, title: "영상·멀티미디어 수업 콘텐츠", tag: "실습",
        topics: [
          "교육용 영상의 기획과 스토리보드",
          "Clipchamp로 짧은 수업 영상 편집",
          "Vrew로 AI 자막과 음성 넣기",
          "YouTube 영상을 수업에 활용하는 방법",
          "5분 이내 마이크로 러닝 영상 제작",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 8, title: "중간 프로젝트", tag: "중간평가",
        topics: [
          "1~7주차 학습 내용 정리",
          "디지털 수업 자료 꾸러미 제작",
          "결과물 발표와 동료 피드백",
        ],
        materials: [],
        videos: [],
        assignment: {
          title: "중간 프로젝트: 디지털 수업 자료 꾸러미",
          text: "전공 교과의 한 차시를 골라 AI와 디지털 도구로 학습지, 슬라이드, 영상 또는 협업 활동 자료를 만들어 하나의 꾸러미로 제출합니다. 결과물은 구글 드라이브 링크로 제출합니다.",
          due: "2026-10-20T23:59",
        },
      },
      {
        week: 9, title: "인터랙티브 수업과 게이미피케이션", tag: "실습",
        topics: [
          "학생 참여를 높이는 디지털 활동의 원리",
          "Kahoot!·Quizizz로 실시간 퀴즈 만들기",
          "Mentimeter로 실시간 투표와 워드클라우드",
          "게이미피케이션 요소(점수·배지·경쟁) 설계",
          "참여형 수업 도입·정리 활동 만들기",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 10, title: "학습관리시스템(LMS)과 온라인 수업", tag: "실습",
        topics: [
          "Google Classroom 수업 개설과 운영",
          "과제 배부·제출·채점 흐름 익히기",
          "블렌디드 러닝과 플립 러닝 설계",
          "실시간·비실시간 온라인 수업 운영 전략",
          "온라인 수업 한 차시 구성하기",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 11, title: "학습 데이터 분석과 시각화", tag: "실습",
        topics: [
          "교육 데이터의 종류 (성적·설문·학습 기록)",
          "Google Sheets로 성적·설문 데이터 정리",
          "차트와 대시보드로 학습 현황 보기",
          "AI로 데이터 분석하고 결과 검증하기",
          "데이터 기반 학생 이해와 수업 개선",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 12, title: "AI 기반 평가와 맞춤형 피드백", tag: "실습",
        topics: [
          "형성평가와 과정 중심 평가의 이해",
          "AI로 평가 문항과 루브릭 만들기",
          "Google Forms로 자동 채점 퀴즈 만들기",
          "AI를 활용한 서술형 피드백 초안 작성",
          "AI 평가 활용의 한계와 교사의 역할",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 13, title: "AI·데이터 윤리와 디지털 시민성", tag: "토론",
        topics: [
          "학생 개인정보 보호와 교육 데이터 관리",
          "저작권과 공정 이용, AI 생성물의 저작권",
          "알고리즘 편향과 AI의 공정성",
          "AI 시대의 표절·부정행위와 학습 윤리",
          "디지털 시민성 교육 방안 토론",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 14, title: "디지털 기반 수업 설계 프로젝트", tag: "실습",
        topics: [
          "백워드 설계로 수업 목표·평가·활동 정하기",
          "교과 목표에 맞는 디지털 도구 선택",
          "디지털 기반 수업 지도안 작성",
          "모의수업 준비와 동료 코칭",
        ],
        materials: [],
        videos: [],
      },
      {
        week: 15, title: "최종 발표와 성찰", tag: "최종 발표",
        topics: [
          "디지털 기반 모의수업 시연",
          "수업 설계·자료·도구 활용 평가",
          "동료 피드백과 수업 개선",
          "한 학기 디지털 교육 학습 성찰",
        ],
        materials: [],
        videos: [],
        assignment: {
          title: "기말 프로젝트: 디지털 기반 수업 설계와 모의수업",
          text: "전공 교과의 한 단원을 골라 AI·디지털 도구를 활용한 수업 지도안과 수업 자료를 완성하고, 10분 내외의 모의수업으로 시연합니다. 지도안·자료·시연 영상을 구글 드라이브 링크로 제출합니다.",
          due: "2026-12-08T23:59",
        },
      },
    ],

    /* 달력 일정 — 수업 외에 달력에 표시할 일정(휴강·보강·특강·행사 등).
     *   관리자 로그인 뒤 달력에서 날짜를 눌러 추가·수정·삭제할 수 있습니다.
     *   (예) { date: "2026-05-05", title: "어린이날 휴강", type: "휴강", text: "보강 일정은 추후 공지" } */
    events: [],

    // 최종 프로젝트 예시
    projectsTitle: "최종 프로젝트 예시",
    projectsLead: "학기 동안 학습한 내용을 활용하여 자신의 전공 교과에 맞는 다음과 같은 디지털 수업을 설계합니다.",
    projects: [
      "AI 활용 수준별 맞춤 학습지 수업",
      "Padlet 협업 토의·토론 수업",
      "Kahoot! 게이미피케이션 복습 수업",
      "Google Classroom 플립 러닝 수업",
      "NotebookLM 자료 탐구 수업",
      "Canva 카드뉴스 제작 프로젝트 수업",
      "Vrew 영상 제작 표현 수업",
      "Mentimeter 실시간 의견 공유 수업",
      "데이터 분석 기반 탐구 수업",
      "AI 피드백 활용 글쓰기 수업",
      "디지털 시민성·AI 윤리 토론 수업",
      "에듀테크 융합 프로젝트 수업",
    ],
    projectsNote: "최종 결과물은 수업 목표 → 디지털 도구 선택 → 수업 자료 제작 → 수업 운영 → 평가·성찰의 전 과정을 포함하도록 합니다.",
  },

  /* ── 포트폴리오: 우수 과제물 ───────────────────────────────
   *   등록은 구글 드라이브 주소(driveUrl)로만 합니다. 관리자 로그인 뒤 포트폴리오 카드의 '과제물 추가'로 올릴 수 있습니다.
   *   · 드라이브에서 파일 공유를 "링크가 있는 모든 사용자 – 뷰어"로 바꿔야 방문자가 볼 수 있습니다.
   *   · 파일 주소면 미리 보기 그림이 자동으로 표시됩니다(폴더 주소는 그림 없이 표시).
   *   · 아래 3개는 샘플입니다(주소가 SAMPLE…이라 열리지 않음). 실제 과제물로 바꾸세요. */
  portfolio: {
    id: "portfolio",
    eyebrow: "Portfolio",
    title: "우수 과제 포트폴리오",
    lead: "수강생들이 AI로 직접 기획하고 만든 우수 과제물을 소개합니다.",
    buttonLabel: "과제물 보기",
    emptyText: "아직 등록된 과제물이 없습니다.",
    items: [
      {
        title: "Kahoot! 활용 과학 복습 수업",
        student: "수강생 A",
        term: "2026 2학기 · 기말 프로젝트",
        category: "수업 설계",
        description: "AI로 만든 퀴즈 문항을 Kahoot!에 올려 단원 복습과 형성평가를 하는 수업 지도안과 모의수업 (샘플 설명)",
        driveUrl: "https://drive.google.com/file/d/SAMPLE_FILE_ID_1/view",
      },
      {
        title: "수준별 국어 읽기 학습지 꾸러미",
        student: "수강생 B",
        term: "2026 2학기 · 중간 프로젝트",
        category: "수업 자료",
        description: "생성형 AI로 같은 지문을 세 가지 수준으로 바꾸고 활동지·슬라이드를 함께 만든 자료 꾸러미 (샘플 설명)",
        driveUrl: "https://drive.google.com/file/d/SAMPLE_FILE_ID_2/view",
      },
      {
        title: "Vrew로 만든 수학 개념 영상",
        student: "수강생 C",
        term: "2026 2학기 · 실습 과제",
        category: "영상",
        description: "AI 자막과 음성을 넣어 5분 안에 함수 개념을 설명하는 마이크로 러닝 영상 (샘플 설명)",
        driveUrl: "https://drive.google.com/file/d/SAMPLE_FILE_ID_3/view",
      },
    ],
  },

  /* ── 수강 안내: 운영 방식 · 실습 도구 · 평가 · 참고자료 · 준비물 ── */
  guide: {
    id: "guide",
    eyebrow: "Guide",
    title: "수강 안내",
    lead: "수업은 강의, 실습, 프로젝트, 발표 및 피드백 형식으로 진행합니다. 매주 핵심 개념을 학습한 후 AI·디지털 도구 실습을 진행하며, 단계별 결과물을 쌓아 최종 디지털 기반 수업 설계를 완성합니다.",

    toolsTitle: "주요 실습 도구",
    tools: [
      { icon: "💬", name: "ChatGPT", category: "생성형 AI", text: "수업 아이디어와 학습지·문항 초안을 만듭니다." },
      { icon: "✨", name: "Claude", category: "생성형 AI", text: "긴 자료 요약, 지도안 검토, 피드백 작성에 활용합니다." },
      { icon: "🔮", name: "Gemini", category: "생성형 AI", text: "Google 도구와 연계한 자료 제작에 활용합니다." },
      { icon: "📓", name: "NotebookLM", category: "AI 자료 탐구", text: "교재·자료를 올려 요약하고 질문을 만듭니다." },
      { icon: "📁", name: "Google Workspace", category: "협업", text: "문서·스프레드시트·설문으로 함께 작업합니다." },
      { icon: "🏫", name: "Google Classroom", category: "LMS", text: "과제 배부·제출·피드백 등 수업을 운영합니다." },
      { icon: "🎨", name: "Canva", category: "자료 제작", text: "슬라이드·인포그래픽·카드뉴스를 만듭니다." },
      { icon: "📌", name: "Padlet", category: "협업", text: "생각 모으기와 모둠 협업 게시판에 활용합니다." },
      { icon: "🎮", name: "Kahoot!", category: "참여·평가", text: "실시간 퀴즈로 복습과 형성평가를 합니다." },
      { icon: "📊", name: "Mentimeter", category: "참여·평가", text: "실시간 투표와 워드클라우드로 의견을 모읍니다." },
      { icon: "🎬", name: "Vrew", category: "영상 제작", text: "AI 자막과 음성으로 수업 영상을 만듭니다." },
      { icon: "🪄", name: "Gamma", category: "자료 제작", text: "AI로 프레젠테이션 초안을 빠르게 만듭니다." },
    ],

    // 평가 (percent는 숫자. 합계 100)
    gradingTitle: "평가",
    grading: [
      { label: "중간평가 또는 중간 프로젝트", percent: 30 },
      { label: "기말 프로젝트", percent: 40 },
      { label: "출석", percent: 10 },
      { label: "실습과제", percent: 10 },
      { label: "수업 참여 및 발표", percent: 10 },
    ],
    gradingNote: "※ 세부 평가 방식은 수업 운영 상황에 따라 조정할 수 있습니다.",

    // 교재와 참고자료 (href를 비우면 링크 없이 이름만 표시)
    referencesTitle: "교재와 참고자료",
    referencesLead: "별도의 지정 교재보다는 교수자가 제공하는 강의자료와 최신 온라인 자료를 중심으로 진행합니다.",
    references: [
      { label: "에듀넷·티-클리어", href: "https://www.edunet.net" },
      { label: "Google for Education 교사 센터", href: "https://edu.google.com/intl/ALL_kr/teacher-center/" },
      { label: "Google Classroom 고객센터", href: "https://support.google.com/edu/classroom" },
      { label: "Canva 교육용", href: "https://www.canva.com/ko_kr/education/" },
      { label: "Padlet 도움말", href: "https://padlet.help" },
      { label: "Kahoot! 교사용", href: "https://kahoot.com/schools/" },
      { label: "NotebookLM", href: "https://notebooklm.google" },
      { label: "OpenAI ChatGPT 교육 자료", href: "https://openai.com/chatgpt/education/" },
      { label: "Anthropic Claude 도움말", href: "https://support.anthropic.com" },
      { label: "UNESCO 교사를 위한 AI 역량 프레임워크", href: "https://www.unesco.org/en/digital-education/artificial-intelligence" },
    ],
    referencesNote: "생성형 AI와 에듀테크는 변화가 빠른 분야이므로 최신 사례와 온라인 자료를 지속적으로 활용합니다.",

    prepTitle: "수강 준비물",
    prep: [
      { icon: "💻", title: "노트북", text: "실습용 개인 노트북 (태블릿 가능)" },
      { icon: "📧", title: "Google 계정", text: "Google Workspace, Classroom, NotebookLM 실습에 사용" },
      { icon: "🔐", title: "AI 도구 계정", text: "ChatGPT, Claude, Gemini 등 실습 도구 로그인에 사용" },
      { icon: "📘", title: "전공 교과서", text: "수업 자료·수업 설계 실습에 쓸 전공 교과 단원 1개" },
    ],
  },

  /* ── 참여하기: 투표 + 수강 신청서 ──────────────────────── */
  participate: {
    id: "participate",
    eyebrow: "Join",
    title: "참여하기",
    lead: "여러분의 의견을 들려주고, 수강 신청서를 작성해 주세요.",

    /* 설문 — 여러 개를 둘 수 있습니다. 관리자 로그인 뒤 '참여하기'에서 추가·수정·삭제하세요.
     *   id        : 설문마다 다른 값(응답이 이 값으로 구분됩니다. 바꾸지 마세요)
     *   options   : 보기
     *   createdAt : 만든 날짜와 시각
     *   open      : true면 화면에 표시, false면 숨김(관리자의 히스토리 표에만 남음) */
    pollsTitle: "설문",
    polls: [
      {
        id: "p1",
        title: "가장 먼저 배우고 싶은 주제는?",
        help: "하나를 골라 주세요. 다시 눌러 바꿀 수 있습니다.",
        options: [
          "생성형 AI로 수업 자료 만들기",
          "참여형 수업 도구 (Kahoot!·Padlet·Mentimeter)",
          "학습 데이터 분석과 맞춤형 피드백",
          "디지털 기반 수업 설계와 모의수업",
        ],
        createdAt: "2026-10-03T12:00",
        open: true,
      },
    ],

    apply: {
      title: "수강 신청서",
      // 안내 문구. 서버를 연결한 뒤에는 지우거나 바꾸세요.
      notice: "",
      // 신청서를 받을 서버 주소(Google Apps Script, Formspree 등). 비워 두면 이 브라우저에만 저장합니다.
      endpoint: "",
      submitLabel: "신청서 제출하기",
      successTitle: "신청서가 접수되었습니다 🌸",
      successText: "작성해 주셔서 고맙습니다. 담당 교수가 확인해 승인하면 수강생 명단에 등록되고, 그 뒤 '내 강의실'에 로그인할 수 있습니다.",
      /* 입력 항목
       *   type     : text · email · tel · select · textarea · checkbox
       *   required : true면 비워 둘 수 없습니다.
       *   pattern  : 형식 검사(정규식), patternMsg : 형식이 틀렸을 때 안내 문구 */
      fields: [
        { name: "name", label: "이름", type: "text", required: true, placeholder: "홍길동" },
        { name: "studentId", label: "학번", type: "text", required: true, placeholder: "숫자 10자리", pattern: "^\\d{10}$", patternMsg: "학번은 숫자 10자리로 입력해 주세요." },
        { name: "department", label: "소속 학과", type: "text", required: true, placeholder: "○○교육과" },
        { name: "grade", label: "학년", type: "select", required: true, options: ["1학년", "2학년", "3학년", "4학년", "대학원생"] },
        { name: "email", label: "이메일", type: "email", required: true, placeholder: "name@example.com" },
        { name: "phone", label: "연락처", type: "tel", required: false, placeholder: "010-0000-0000", pattern: "^[0-9-]{9,13}$", patternMsg: "연락처는 숫자와 -만 입력해 주세요." },
        { name: "motivation", label: "수강 동기", type: "textarea", required: true, placeholder: "이 강의에서 어떤 디지털 수업을 만들어 보고 싶은지 적어 주세요." },
        { name: "agree", label: "개인정보 수집·이용에 동의합니다.", type: "checkbox", required: true },
      ],
    },
  },

  /* ── 내 강의실: 로그인 · 출석 · 과제 제출 ──────────────── */
  classroom: {
    id: "classroom",
    eyebrow: "My Class",
    title: "내 강의실",
    lead: "로그인하면 출석을 체크하고 과제를 제출할 수 있습니다.",
    // 안내 문구. 서버를 연결한 뒤에는 지우거나 바꾸세요.
    notice: "제출한 과제 파일은 교수자의 구글 드라이브에 이름별 폴더로 저장됩니다.",
    // 수강 코드와 수강생 명단은 원문 대신 지문(해시)으로 저장됩니다.
    // 직접 고치지 말고 관리자 화면(오른쪽 위 자물쇠) → '수강생 명단'에서 바꾸세요.
    accessCodeHash: "c17a20306857aca4088143ade1b8406dc1d4cc339c3fec4459401ea59dd3b37f",
    rosterHashes: [], // 비어 있으면 수강 코드만 맞으면 로그인됩니다.
    // true면 수업일이 아니어도 주차를 눌러 출석을 체크할 수 있습니다(미리 보기용). 실제 운영 때는 false로 바꾸세요.
    testMode: true,
    // 제출 가능한 파일 형식과 최대 크기(MB)
    fileAccept: ".pdf,.docx,.hwp,.hwpx,.pptx,.xlsx,.zip",
    fileMaxMB: 20,
  },

  /* ── 안내 팝업 ─────────────────────────────────────────
   *   popup  : 모든 팝업에 공통인 설정
   *   popups : 팝업 목록. 여러 개를 둘 수 있고, enabled가 true인 것이 차례로 뜹니다.
   *            관리자 화면(자물쇠) → '팝업'에서 추가·수정·삭제할 수 있습니다.
   *     id          : 팝업마다 다른 값('오늘 하루 보지 않기' 기록에 씁니다. 바꾸지 마세요)
   *     buttonLabel : 비워 두면 버튼 없이 안내만 보여 줍니다. */
  popup: {
    delaySeconds: 2, // 접속 후 몇 초 뒤에 띄울지
    hideTodayLabel: "오늘 하루 보지 않기",
  },
  popups: [
    {
      id: "pop1",
      enabled: true,
      badge: "수강 신청 안내",
      title: "2026 2학기 「디지털 교육」 수강 신청을 받고 있습니다",
      text: "신청 기간과 방법을 이곳에 적어 주세요. 정원이 차면 조기 마감될 수 있습니다.",
      buttonLabel: "수강 신청하러 가기",
      buttonHref: "#apply",
    },
  ],

  /* ── 첫 방문 환영 효과 ─────────────────────────────────── */
  welcome: {
    fireworks: true, // 폭죽 효과 (처음 방문한 사람에게 한 번만)
    message: "처음 오셨군요! 환영합니다 🎉",
  },

  /* ── FAQ ───────────────────────────────────────────────── */
  faq: {
    id: "faq",
    eyebrow: "FAQ",
    title: "자주 묻는 질문",
    lead: "수강생들이 자주 묻는 내용을 모았습니다.",
    items: [
      {
        q: "수업은 어떤 방식으로 진행되나요?",
        a: "강의, 실습, 프로젝트, 발표 및 피드백 형식으로 진행합니다. 매주 핵심 개념을 학습한 후 AI·디지털 도구 실습을 진행하며, 단계별 결과물을 쌓아 최종 디지털 기반 수업 설계를 완성합니다.",
      },
      {
        q: "코딩이나 디지털 도구를 잘 몰라도 되나요?",
        a: "네. 코딩은 필요 없고, 모든 도구는 기초부터 실습합니다. 사범대학 학생이라면 전공과 관계없이 수강할 수 있습니다.",
      },
      {
        q: "교재가 따로 있나요?",
        a: "별도의 지정 교재보다는 교수자가 제공하는 강의자료와 에듀넷, Google for Education 등 최신 온라인 자료를 중심으로 진행합니다.",
      },
      {
        q: "어떤 도구를 사용하나요?",
        a: "ChatGPT, Claude, Gemini, NotebookLM, Google Workspace, Google Classroom, Canva, Padlet, Kahoot!, Mentimeter, Vrew, Gamma 등을 사용합니다. 대부분 무료 또는 교육용 계정으로 이용할 수 있습니다.",
      },
      {
        q: "평가는 어떻게 하나요?",
        a: "중간평가 또는 중간 프로젝트 30%, 기말 프로젝트 40%, 출석 10%, 실습과제 10%, 수업 참여 및 발표 10%입니다. 세부 평가 방식은 수업 운영 상황에 따라 조정할 수 있습니다.",
      },
      {
        q: "최종 프로젝트로 무엇을 만드나요?",
        a: "자신의 전공 교과 한 단원을 골라 AI·디지털 도구를 활용한 수업 지도안과 수업 자료를 만들고, 10분 내외의 모의수업으로 시연합니다. 수업 목표 → 도구 선택 → 자료 제작 → 수업 운영 → 평가·성찰의 전 과정을 포함해야 합니다.",
      },
    ],
  },

  /* ── 교수자 (페이지 끝 푸터) ───────────────────────────── */
  instructor: {
    id: "instructor",
    eyebrow: "Instructor",
    title: "교수자",
    name: "김민영 교수",
    nameSub: "", // 이름 옆 작은 글씨(한자·영문 이름 등). 비워 두면 표시하지 않습니다.
    role: "고려대학교 AI중심대학사업단",
    roleSub: "", // 소속 아래 작은 글씨(영문 소속 등). 비워 두면 표시하지 않습니다.
    photo: "", // 사진 파일 경로(예: "images/professor.jpg"). 비워 두면 이름 첫 글자가 표시됩니다.
    // 소개 글(여러 문단 가능). 비워 두면 표시하지 않습니다.
    bio: [
      "고려대학교 AI중심대학사업단에서 사범대학 「디지털 교육」 강의를 맡고 있습니다. 예비 교사들이 생성형 AI와 디지털 도구를 교육 현장에 맞게 활용할 수 있도록 실습 중심으로 수업합니다.",
    ],
    career: [], // 경력. 예) ["○○위원회 위원", "○○추진단"]
    // 저술·자료 목록. 누르면 새 창으로 열립니다. 예) { title: "책 제목", href: "https://…" }
    worksTitle: "저술",
    works: [],
    contacts: [
      { icon: "📱", label: "mobile", value: "010-4600-0522", href: "tel:010-4600-0522" },
      { icon: "✉️", label: "email", value: "kmin88@korea.ac.kr", href: "mailto:kmin88@korea.ac.kr" },
    ],
  },

  /* ── 관리자 ────────────────────────────────────────────── */
  admin: {
    // 관리자 비밀번호의 지문(해시). 비밀번호 자체는 어디에도 저장되지 않습니다.
    // 비어 있으면 자물쇠를 처음 누를 때 비밀번호를 만들게 됩니다. 잊어버렸다면 ""로 비우세요.
    passwordHash: "a5e558055a0d65045ee1243eece546e4c5676804ec0edc8fdf96db8a70d31590",
  },

  /* ── 맨 아래 한 줄 ─────────────────────────────────────── */
  footer: {
    copyright: "Copyright 2026 ⓒ 디지털 교육, All Rights Reserved. | 김민영(고려대학교 AI중심대학사업단)",
    links: [], // 예) { icon: "🌐", label: "홈페이지", text: "www.…", href: "https://…" }
  },
};
