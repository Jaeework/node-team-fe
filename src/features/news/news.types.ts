import type { Pagination } from "../../types/api.types";
import type { Word } from "../word/word.types";
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
  articles: News[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserNews {
  _id: string;
  createdAt: string;
  news: News;
}
