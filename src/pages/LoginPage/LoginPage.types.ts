import type { ComponentProps, ReactNode } from "react";
import type InputWithIcon from "../../components/ui/input-with-icon/InputWithIcon";

export type loginField = {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & ComponentProps<typeof InputWithIcon>;

export interface LoginFormData {
  email: string;
  password: string;
}
