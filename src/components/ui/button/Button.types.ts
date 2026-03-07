import type { ButtonRadius, ButtonSize, ButtonVariant } from "./Button.tokens";

export type ButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  radius?: ButtonRadius;
  isFullWidth?: boolean;
  className?: string;
} & React.ComponentProps<"button">;
