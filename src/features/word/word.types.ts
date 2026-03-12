export type WordType = "word" | "idiom" | "abbreviation";

export interface NewsItem {
  _id?: string;
  id?: string;
  title: string;
}

export interface NewsLink {
  _id: string;
  word: string;
  news: NewsItem;
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
  news?: NewsLink[]; //virtual field
}

export interface UserWord {
  _id: string;
  user: string;
  word: Word;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}
