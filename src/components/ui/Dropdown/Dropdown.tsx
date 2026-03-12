import { useState, useRef, useEffect } from "react";
import { cn } from "../../../lib/utils";
import Button from "../button/Button";
import type { DropdownProps } from "./Dropdown.types";
import { ChevronDown } from "lucide-react";

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
      className={cn(
        "relative inline-flex w-fit flex-col",
        isOpen ? "z-110" : "z-10",
        className,
      )}
      ref={dropdownRef}
    >
      <Button
        variant={variant}
        radius={radius}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "items-center justify-between bg-white px-4 py-2 transition-none hover:bg-white",
          "relative z-20 min-w-full",
          isOpen && "rounded-b-none border-b-transparent",
        )}
      >
        <div className="text-primary mr-4 flex items-center whitespace-nowrap">
          {leftIcon && <span className="mr-1.5">{leftIcon}</span>}
          <span>{label}</span>
        </div>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      <div
        className={cn(
          "border-border absolute top-full left-0 z-10 -mt-px border bg-white shadow-lg transition-all duration-200",
          "w-full min-w-max overflow-hidden",
          bottomRadiusMap[radius] || "rounded-b-lg",
          isOpen
            ? "max-h-72 opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0",
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
                "text-ink hover:bg-primary/15 w-full px-4 py-2.5 text-left text-xs transition-colors",
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
