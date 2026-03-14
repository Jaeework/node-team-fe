import Button from "../../ui/button/Button";
import type { ConfirmModalProps } from "./ConfirmModal.types";

const ConfirmModal = ({
  isOpen,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>

        <p className="text-sm text-gray-500">{message}</p>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
