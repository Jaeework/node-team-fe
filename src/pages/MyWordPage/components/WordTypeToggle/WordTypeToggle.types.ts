export type WordFilterType = "All" | "Word" | "Idiom";

export interface WordTypeToggleProps {
  options?: string[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
  className?: string;
}
