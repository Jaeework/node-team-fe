export type ValidationRule<T = { password?: string }> = {
  message: string;
  validate: (value: string, formData?: T) => boolean;
  hideOnSuccess?: boolean;
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "nickname" | "email" | "password" | "secPassword";

export const FIELD_VALIDATIONS: Record<
  FieldName,
  ValidationRule<{ password?: string }>[]
> = {
  nickname: [
    {
      message: "2자 이상, 10자 이내",
      validate: (value) => {
        const trimmed = value.trim();
        return trimmed.length >= 2 && trimmed.length <= 10;
      },
    },
  ],
  email: [
    {
      message: "올바른 이메일 형식이 아닙니다",
      validate: (value) => EMAIL_REGEX.test(value),
      hideOnSuccess: true,
    },
  ],
  password: [
    {
      message: "8자 이상",
      validate: (value) => value.length >= 8,
    },
    {
      message: "영문/숫자/특수문자 중 2가지 이상",
      validate: (value) => {
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        return [hasLetter, hasNumber, hasSpecial].filter(Boolean).length >= 2;
      },
    },
  ],
  secPassword: [
    {
      message: "비밀번호가 일치하지 않습니다",
      validate: (value, formData) => value === formData?.password,
      hideOnSuccess: true,
    },
  ],
};
