import { cn } from "../../../lib/utils";
import { inputColors, inputSizes } from "./Input.tokens";
import type { InputProps } from "./Input.types";

const Input = ({
  size = "xl",
  color = "default",
  readOnly,
  className,
  ...props
}: InputProps) => {
  return (
    <input
      className={cn(
        "placeholder:text-primary/55 w-full rounded-lg border py-4 text-sm shadow-xs outline-none read-only:cursor-default",
        inputColors[color].input,
        inputSizes[size],
        !readOnly && "focus:border-primary/30",
        readOnly && "bg-ink/5 border-border",
        className,
      )}
      readOnly={readOnly}
      {...props}
    />
  );
};

export default Input;
