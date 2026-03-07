import { cn } from "../../../lib/utils";
import { inputSizes } from "./Input.tokens";
import type { InputProps } from "./Input.types";

const Input = ({ size = "xl", readOnly, className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "bg-background placeholder:text-primary/55 w-full rounded-lg border border-transparent py-4 text-sm shadow-xs outline-none read-only:cursor-default",
        "[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--color-background)]",
        inputSizes[size],
        !readOnly && "focus:border-primary/30",
        readOnly && "bg-gray/30 border-border",
        className,
      )}
      readOnly={readOnly}
      {...props}
    />
  );
};

export default Input;
