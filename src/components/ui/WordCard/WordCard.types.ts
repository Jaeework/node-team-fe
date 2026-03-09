export type NewsItem = {
  _id: string;
  title: string;
};

export type Word = {
  _id: string;
  text: string;
  meaning?: string;
  example?: string;
  example_meaning?: string;
  type: "word" | "idiom" | "abbreviation";
};

export type WordCardProps = {
  word: Word;

  isSelected: boolean;
  onSelect?: () => void;

  newsList?: NewsItem[];
  isDone?: boolean;
};

//isSelected는 단어 선택이고 onSelect는 선택한 단어에게 적용할 액션입니다.
//newList랑 isDone은 안넘기셔도 돼요. 단어장 페이지에서 사용하려고 만들었습니다.
