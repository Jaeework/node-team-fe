import { useState, useRef, useEffect } from "react";
import { cn } from "../../../../lib/utils";
import Button from "../../../../components/ui/button/Button";
import type { DropdownProps } from "./Dropdown.types";
import { ChevronDown } from "lucide-react";

// Tailwind Purge 방지용 안전한 하단 둥글기 매핑
const bottomRadiusMap: Record<string, string> = {
  none: "rounded-b-none",
  sm: "rounded-b-sm",
  md: "rounded-b-md",
  lg: "rounded-b-lg",
  xl: "rounded-b-xl",
  pill: "rounded-b-2xl",
};

const Dropdown = ({
  label = "Sort by",
  leftIcon,
  variant = "outline",
  radius = "lg",
  options = ["Latest", "Oldest", "A to Z"],
  onSelect,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={cn("relative inline-flex flex-col", isOpen ? "z-110" : "z-10")}
      ref={dropdownRef}
    >
      <Button
        variant={variant}
        radius={radius}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "z-10 bg-white px-4 py-2 transition-none hover:bg-white",

          isOpen && "rounded-b-none border-b-transparent",
          className,
        )}
      >
        {leftIcon && <span className="mr-1.5">{leftIcon}</span>}
        {label}
        <ChevronDown
          className={cn(
            "ml-1.5 size-4 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      <div
        className={cn(
          "border-border absolute top-[calc(100%-1px)] left-0 z-110 border bg-white shadow-lg transition-all duration-300 ease-in-out",
          "w-max min-w-full overflow-hidden",
          bottomRadiusMap[radius] || "rounded-b-lg",
          isOpen
            ? "max-h-75 border-t-0 opacity-100"
            : "max-h-0 border-transparent opacity-0",
        )}
      >
        <div className="flex flex-col py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect?.(option);
                setIsOpen(false);
              }}
              className={cn(
                "text-ink hover:bg-paper/50 flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors",
                "whitespace-nowrap",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
