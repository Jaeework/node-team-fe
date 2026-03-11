export type WordType = "word" | "idiom" | "abbreviation";

export interface NewsItem {
  _id: string;
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
  news?: NewsLink[]; //virtual field
  createdAt: string;
  updatedAt: string;
}

export interface UserWord {
  _id: string;
  user: string;
  word: Word;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}
