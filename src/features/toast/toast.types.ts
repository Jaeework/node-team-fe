export type ToastPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "left-top"
  | "right-top"
  | "left-bottom"
  | "right-bottom";

export interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  position: ToastPosition;
}
