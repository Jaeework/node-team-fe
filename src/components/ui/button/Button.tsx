import { cn } from "../../../lib/utils";
import { buttonRadius, buttonSizes, buttonVariants } from "./Button.tokens";
import type { ButtonProps } from "./Button.types";

const Button = ({
  size = "default",
  variant = "primary",
  radius = "md",
  isFullWidth,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        buttonSizes[size],
        buttonVariants[variant],
        buttonRadius[radius],
        isFullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
