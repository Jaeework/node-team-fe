import { cn } from "../../../lib/utils";
import Button from "../../ui/button/Button";
import type { TypeToggleProps } from "./TypeToggle.types";

const TypeToggle = ({
  options = ["All", "Word", "Idiom"],
  selectedValue = "Word",
  onSelect,
  className,
}: TypeToggleProps) => {
  const selectedIndex = Math.max(0, options.indexOf(selectedValue));

  return (
    <div
      className={cn(
        "border-border bg-background relative inline-flex items-center gap-1 rounded-lg border p-1 shadow-xs",
        className,
      )}
    >
      <div
        className="bg-primary absolute top-1 bottom-1 left-1 rounded-md transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 0.5rem - ${(options.length - 1) * 0.25}rem) / ${options.length})`,

          transform: `translateX(calc(${selectedIndex * 100}% + ${selectedIndex * 0.25}rem))`,
        }}
      />

      {options.map((option) => {
        const isSelected = selectedValue === option;

        return (
          <Button
            key={option}
            variant="ghost"
            radius="lg"
            size="sm"
            onClick={() => onSelect?.(option)}
            className={cn(
              "relative z-10 min-w-18 flex-1 text-sm font-semibold transition-colors duration-300",
              isSelected
                ? "text-background hover:text-background hover:bg-transparent"
                : "text-primary/70 hover:bg-primary/10 hover:text-primary",
            )}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};

export default TypeToggle;
