export type NewsItem = {
  _id: string;
  title: string;
};

export type WordCardProps = {
  text: string;
  meaning?: string;
  example?: string;
  example_meaning?: string;
  type: "word" | "idiom" | "abbreviation";

  isSelected: boolean;
  onSelect?: () => void; //내 단어장에 저장할 때 선택기능

  newsList?: NewsItem[]; //뉴스 목록은 데이터 있을 때만 쓰면 돼요.

  isDone?: boolean; //학습 상태 -> 이것도 페이지에 따라서 Props 넘기면 돼요.
};
