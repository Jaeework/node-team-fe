import type { InputWithIconProps } from "../input-with-icon/InputWithIcon.types";

export type ValidationVariant = "default" | "error" | "success";

export type ValidationMessage = {
  message: string;
  variant: ValidationVariant;
};

export type InputWithMessageProps = InputWithIconProps & {
  messages?: ValidationMessage[];
};
