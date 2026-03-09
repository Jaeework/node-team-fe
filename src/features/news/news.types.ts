/**
 * 1. 개별 뉴스 아이템 타입
 */
export interface News {
  _id: string; // MongoDB 고유 ID
  title: string; // 뉴스 제목
  content: string[]; // 영어 본문 문단 배열
  translated_content: string[]; // 한글 번역 본문 문단 배열
  url: string; // 출처 기사 링크
  image: string; // 대표 이미지 URL
  published_at: string; // 발행일 (ISO 8601)
  level: "A2" | "B1" | "B2" | "C1"; // 난이도
  source: string; // 언론사 (The Guardian 등)
  __v: number; // 버전 키
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
}

/**
 * 2. 단어 및 숙어 타입 (words)
 */
export interface Word {
  _id: string;
  id: string;
  text: string; // 단어/숙어 텍스트
  meaning: string; // 뜻
  example: string; // 영어 예문
  example_meaning: string; // 예문 번역
  type: "word" | "idiom"; // 타입 구분
  isDone: boolean; // 학습 완료 여부
  __v: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 3. 약어 타입 (abbreviations)
 */
export interface Abbreviation {
  _id: string;
  id: string;
  text: string; // 약어 텍스트 (예: BLS)
  meaning: string; // 원래 뜻 (예: 노동통계국)
  example: string; // 영어 예문
  example_meaning: string; // 예문 번역
  type: "abbreviation"; // 타입 구분
  __v: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 4. API 응답의 'data' 필드 구조
 * 질문하신 데이터의 핵심 알맹이 구조입니다.
 */
export interface NewsDetailData {
  news: News; // 뉴스 상세 객체
  words: Word[]; // 관련 단어 배열
  abbreviations: Abbreviation[]; // 관련 약어 배열
}

/**
 * 5. 전체 API 공통 응답 구조
 * 서버에서 오는 { success, data } 전체를 감싸는 타입입니다.
 */
export interface ApiResponse<T> {
  success: boolean; // 성공 여부 (true/false)
  data: T; // 실제 데이터 (위의 NewsDetailData가 여기 들어감)
}

export interface NewsState {
  currentNews: News | null;
  currentWords: Word[];
  currentAbbreviations: Abbreviation[];
  isLoading: boolean;
  error: string | null;
}
