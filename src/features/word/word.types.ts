export type WordType = "word" | "idiom" | "abbreviation";

export type WordFilterType =
  | "All"
  | Capitalize<Exclude<WordType, "abbreviation">>;

export interface NewsItem {
  _id?: string;
  id?: string;
  title: string;
}

export interface Word {
  _id: string;
  text: string;
  meaning: string;
  example: string;
  example_meaning: string;
  type: WordType;
  createdAt: string;
  updatedAt: string;
  news?: NewsItem[]; //virtual field
}

export interface UserWord {
  _id: string;
  user: string;
  word: Word;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}
