import type { InputProps } from "../input/Input.types";

export type InputWithIconProps = InputProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};
