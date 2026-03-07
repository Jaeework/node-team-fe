import { cn } from "../../../lib/utils";
import Input from "../input/Input";
import type { InputWithIconProps } from "./InputWithIcon.types";

const InputWithIcon = ({
  leftIcon,
  rightIcon,
  readOnly,
  className,
  ...props
}: InputWithIconProps) => {
  return (
    <div
      className={cn(
        "bg-background inline-flex w-full items-center gap-2 rounded-lg border border-transparent px-2 shadow-xs",
        !readOnly && "has-[:focus-within]:border-primary/30",
        readOnly && "bg-border/30 border-border",
        className,
      )}
    >
      {leftIcon && <span className="text-primary/55 shrink-0">{leftIcon}</span>}
      <Input
        readOnly={readOnly}
        className="flex-1 border-none px-0 shadow-none"
        {...props}
      />
      {rightIcon && (
        <span className="text-primary/55 shrink-0">{rightIcon}</span>
      )}
    </div>
  );
};

export default InputWithIcon;
