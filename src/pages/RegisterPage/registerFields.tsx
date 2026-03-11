import { Lock, Mail, UserRound } from "lucide-react";
import type { registerField } from "./RegisterPage.types";

export const REGISTER_FIELDS: registerField[] = [
  {
    label: "Nickname",
    type: "text",
    id: "nickname",
    name: "nickname",
    placeholder: "Enter your nickname",
    leftIcon: <UserRound size={16} />,
  },
  {
    label: "Email Address",
    type: "email",
    id: "email",
    name: "email",
    placeholder: "Enter your email address",
    leftIcon: <Mail size={16} />,
    autoComplete: "email",
  },
  {
    label: "Password",
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Enter password",
    leftIcon: <Lock size={16} />,
    autoComplete: "new-password",
  },
  {
    label: "Confirm Password",
    type: "password",
    id: "secPassword",
    name: "secPassword",
    placeholder: "Confirm password",
    leftIcon: <Lock size={16} />,
    autoComplete: "new-password",
  },
];
