import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { hideToast } from "../../../features/toast/toastSlice";
import { cn } from "../../../lib/utils";
import type { ToastPosition } from "../../../features/toast/toast.types";

const Toast = () => {
  const dispatch = useAppDispatch();
  const { message, type, isVisible, position } = useAppSelector(
    (state) => state.toast,
  );

  const positionStyles: Record<ToastPosition, string> = {
    top: "top-22 left-1/2 -translate-x-1/2 slide-in-from-top-4",
    bottom: "bottom-10 left-1/2 -translate-x-1/2 slide-in-from-bottom-4",
    left: "left-10 top-1/2 -translate-y-1/2 slide-in-from-left-4",
    right: "right-10 top-1/2 -translate-y-1/2 slide-in-from-right-4",
    "left-top": "top-22 left-10 slide-in-from-top-4 slide-in-from-left-4",
    "right-top": "top-22 right-10 slide-in-from-top-4 slide-in-from-right-4",
    "left-bottom":
      "bottom-10 left-10 slide-in-from-bottom-4 slide-in-from-left-4",
    "right-bottom":
      "bottom-10 right-10 slide-in-from-bottom-4 slide-in-from-right-4",
  };

  useEffect(() => {
    if (isVisible) {
      //토스트 활성시 n초후 스스로 닫기 액션 실행
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000); // 3초 후에 닫기
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "animate-in fade-in fixed z-9999 transition-all",
        positionStyles[position],
      )}
    >
      <div
        className={cn(
          "rounded-xl px-6 py-3 text-sm font-medium shadow-lg transition-all",
          type === "success" && "bg-primary text-white",
          type === "error" && "bg-red-500 text-white",
          type === "info" && "bg-ink text-background",
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
