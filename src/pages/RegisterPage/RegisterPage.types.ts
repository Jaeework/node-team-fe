import type { ComponentProps, ReactNode } from "react";
import type { UserLevel } from "../../features/user/user.types";
import type InputWithIcon from "../../components/ui/input-with-icon/InputWithIcon";
export type registerField = {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & ComponentProps<typeof InputWithIcon>;

export interface RegisterFormData {
  nickname: string;
  email: string;
  password: string;
  secPassword: string;
  level: UserLevel;
}
