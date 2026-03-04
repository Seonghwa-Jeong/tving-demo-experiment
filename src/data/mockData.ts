export interface Content {
  id: string;
  title: string;
  description: string;
  genres: string[];
  year: number;
  rating: string;
  score: number;
  duration: number; // seconds
  videoId: string; // YouTube video ID
  thumbnail: string;
  category: "드라마" | "영화" | "예능" | "키즈" | "스포츠";
  isFeatured?: boolean;
  director?: string;
  cast?: string[];
  episodes?: number;
}

export const contents: Content[] = [
  {
    id: "1",
    title: "별빛 아래서",
    description:
      "도시의 삶에 지친 두 남녀가 우연히 작은 마을에서 만나 서로의 상처를 치유하며 사랑을 찾아가는 힐링 로맨스. 아름다운 자연 배경과 따뜻한 이야기로 마음을 울리는 작품.",
    genres: ["드라마", "로맨스"],
    year: 2024,
    rating: "15",
    score: 9.1,
    duration: 596,
    videoId: "aqz-KE-bpKQ",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    category: "드라마",
    isFeatured: true,
    director: "박지원",
    cast: ["이민호", "박신혜", "김수현"],
    episodes: 16,
  },
  {
    id: "2",
    title: "철의 눈물",
    description:
      "2043년 황폐해진 지구, 생존을 위해 싸우는 인류의 마지막 이야기. 최첨단 CG와 감동적인 스토리로 완성된 SF 대작.",
    genres: ["SF", "액션"],
    year: 2023,
    rating: "15",
    score: 8.7,
    duration: 734,
    videoId: "R6MlUcmOul8",
    thumbnail: "https://img.youtube.com/vi/R6MlUcmOul8/maxresdefault.jpg",
    category: "영화",
    director: "최동훈",
    cast: ["마동석", "전도연", "류준열"],
  },
  {
    id: "3",
    title: "신텔의 여정",
    description:
      "잃어버린 아이를 찾아 세상의 끝까지 떠나는 한 여인의 험난한 여정. 절망과 희망 사이에서 피어나는 모성애와 용기의 이야기.",
    genres: ["판타지", "어드벤처"],
    year: 2024,
    rating: "12",
    score: 8.9,
    duration: 870,
    videoId: "eRsGyueVLvQ",
    thumbnail: "https://img.youtube.com/vi/eRsGyueVLvQ/maxresdefault.jpg",
    category: "영화",
    isFeatured: false,
    director: "봉준호",
    cast: ["탕웨이", "공유", "배두나"],
  },
  {
    id: "4",
    title: "우주 세탁소",
    description:
      "우주 한복판에 있는 작은 세탁소에서 벌어지는 기상천외한 사건들. 웃음과 감동을 동시에 선사하는 판타지 코미디.",
    genres: ["코미디", "판타지"],
    year: 2023,
    rating: "전체",
    score: 7.8,
    duration: 3300,
    videoId: "TLkA0RELQ1g",
    thumbnail: "https://img.youtube.com/vi/TLkA0RELQ1g/maxresdefault.jpg",
    category: "영화",
    director: "이병헌",
    cast: ["류승룡", "고아성", "안재홍"],
  },
  {
    id: "5",
    title: "327 요원",
    description:
      "정체를 숨긴 채 활동하는 비밀 요원의 유쾌한 일상. 코믹하면서도 긴장감 넘치는 스파이 액션.",
    genres: ["액션", "코미디"],
    year: 2024,
    rating: "12",
    score: 8.2,
    duration: 237,
    videoId: "mN0zPOpADL4",
    thumbnail: "https://img.youtube.com/vi/mN0zPOpADL4/maxresdefault.jpg",
    category: "영화",
    director: "최우식",
    cast: ["이정재", "김태리", "박해일"],
  },
  {
    id: "6",
    title: "코끼리의 꿈",
    description:
      "거대한 기계 세계에서 살아가는 두 로봇의 우정과 모험. 어린이부터 어른까지 함께 즐길 수 있는 따뜻한 애니메이션.",
    genres: ["애니메이션", "가족"],
    year: 2023,
    rating: "전체",
    score: 8.5,
    duration: 654,
    videoId: "wX8WT9dXMWc",
    thumbnail: "https://img.youtube.com/vi/wX8WT9dXMWc/maxresdefault.jpg",
    category: "키즈",
    director: "픽셀스튜디오",
    cast: ["나레이션: 황정민"],
  },
  {
    id: "7",
    title: "런닝맨 시즌 2",
    description:
      "대한민국 최고의 예능 프로그램이 새로운 모습으로 돌아왔다! 더욱 다양해진 미션과 게스트들로 업그레이드된 레이스가 시작된다.",
    genres: ["예능", "리얼리티"],
    year: 2024,
    rating: "전체",
    score: 7.5,
    duration: 5400,
    videoId: "aqz-KE-bpKQ",
    thumbnail:
      "https://picsum.photos/seed/running/800/450",
    category: "예능",
    episodes: 20,
    cast: ["유재석", "지석진", "김종국", "하하", "송지효"],
  },
  {
    id: "8",
    title: "나 혼자 산다 스페셜",
    description:
      "혼자 사는 연예인들의 솔직한 일상을 담은 힐링 예능. 공감과 웃음이 넘치는 리얼 라이프스타일 쇼.",
    genres: ["예능", "일상"],
    year: 2024,
    rating: "전체",
    score: 8.0,
    duration: 4800,
    videoId: "eRsGyueVLvQ",
    thumbnail: "https://picsum.photos/seed/solo/800/450",
    category: "예능",
    episodes: 15,
    cast: ["전현무", "박나래", "이시언", "헨리"],
  },
  {
    id: "9",
    title: "K리그 하이라이트",
    description:
      "이번 시즌 가장 짜릿한 순간들을 모아담은 K리그 특별 하이라이트. 골 세리머니부터 극적인 역전골까지!",
    genres: ["스포츠", "축구"],
    year: 2024,
    rating: "전체",
    score: 8.8,
    duration: 1800,
    videoId: "R6MlUcmOul8",
    thumbnail: "https://picsum.photos/seed/soccer/800/450",
    category: "스포츠",
    cast: ["해설: 이영표", "캐스터: 차범근"],
  },
  {
    id: "10",
    title: "미스터 션샤인",
    description:
      "1900년대 초반 격동의 조선, 운명적으로 얽힌 사람들의 사랑과 희생. 역사적 배경 위에 펼쳐지는 대서사 로맨스.",
    genres: ["드라마", "사극", "로맨스"],
    year: 2023,
    rating: "15",
    score: 9.3,
    duration: 4500,
    videoId: "TLkA0RELQ1g",
    thumbnail: "https://picsum.photos/seed/sunshine/800/450",
    category: "드라마",
    isFeatured: false,
    director: "이응복",
    cast: ["이병헌", "김태리", "유연석", "변요한"],
    episodes: 24,
  },
  {
    id: "11",
    title: "도깨비",
    description:
      "939년을 살아온 신비로운 존재 '도깨비'와 자신의 신부를 찾아다니는 이야기. 환상적인 세계관과 명대사로 사랑받는 판타지 로맨스.",
    genres: ["드라마", "판타지", "로맨스"],
    year: 2023,
    rating: "12",
    score: 9.5,
    duration: 4200,
    videoId: "wX8WT9dXMWc",
    thumbnail: "https://picsum.photos/seed/goblin/800/450",
    category: "드라마",
    isFeatured: true,
    director: "이응복",
    cast: ["공유", "이동욱", "김고은", "유인나"],
    episodes: 16,
  },
  {
    id: "12",
    title: "핑크퐁 동요 모음",
    description:
      "아이들이 좋아하는 핑크퐁과 함께하는 신나는 동요 모음! 상어 가족부터 다양한 동요까지 함께 노래해요.",
    genres: ["키즈", "교육"],
    year: 2024,
    rating: "전체",
    score: 9.0,
    duration: 1200,
    videoId: "mN0zPOpADL4",
    thumbnail: "https://picsum.photos/seed/pinkfong/800/450",
    category: "키즈",
    cast: ["핑크퐁"],
  },
];

export const categories = ["전체", "드라마", "영화", "예능", "키즈", "스포츠"];

export const featuredContents = contents.filter((c) => c.isFeatured);
