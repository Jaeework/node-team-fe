export type WordFilterType = "All" | "Word" | "Idiom";

export interface WordTypeToggleProps {
  options?: WordFilterType[];
  selectedValue?: WordFilterType;
  onSelect?: (value: WordFilterType) => void;
  className?: string;
}
