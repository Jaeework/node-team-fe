import type { ButtonRadius, ButtonVariant } from "../button/Button.tokens";

export interface DropdownProps {
  label?: React.ReactNode;
  leftIcon?: React.ReactNode;
  variant?: ButtonVariant; // 버튼 테마 색상 및 스타일
  radius?: ButtonRadius; // 둥글기 설정
  options?: string[];
  onSelect?: (value: string) => void;
  className?: string; // 글씨 색상, 폰트 크기, 여백 등을 커스텀할 때 사용!
}
