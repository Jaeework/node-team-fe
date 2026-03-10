export interface News {
  _id: string;
  title: string;
  content: string[];
  translated_content: string[];
  url: string;
  image: string;
  published_at: string;
  level: "A2" | "B1" | "B2" | "C1";
  source: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  _id: string;
  id: string;
  text: string;
  meaning: string;
  example: string;
  example_meaning: string;
  type: "word" | "idiom";
  isDone: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Abbreviation {
  _id: string;
  id: string;
  text: string;
  meaning: string;
  example: string;
  example_meaning: string;
  type: "abbreviation";
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsDetailData {
  news: News;
  words: Word[];
  abbreviations: Abbreviation[];
}

export interface NewsState {
  currentNews: News | null;
  currentWords: Word[];
  currentAbbreviations: Abbreviation[];
  isLoading: boolean;
  error: string | null;
}
