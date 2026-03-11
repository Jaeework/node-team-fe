import { cn } from "../../../lib/utils";
import Input from "../input/Input";
import { inputColors } from "../input/Input.tokens";
import type { InputWithIconProps } from "./InputWithIcon.types";

const InputWithIcon = ({
  leftIcon,
  rightIcon,
  readOnly,
  size,
  color = "default",
  className,
  ...props
}: InputWithIconProps) => {
  return (
    <div
      className={cn(
        "inline-flex w-full items-center gap-2 rounded-lg border px-2 shadow-xs",
        inputColors[color].wrapper,
        !readOnly && "has-focus-within:border-primary/30",
        readOnly && "bg-border/30 border-border",
        className,
      )}
    >
      {leftIcon && <span className="text-primary/55 shrink-0">{leftIcon}</span>}
      <Input
        readOnly={readOnly}
        color={color}
        size={size}
        className="flex-1 border-none bg-transparent px-0 shadow-none"
        {...props}
      />
      {rightIcon && (
        <span className="text-primary/55 shrink-0">{rightIcon}</span>
      )}
    </div>
  );
};

export default InputWithIcon;
