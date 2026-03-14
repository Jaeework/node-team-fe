import { useState } from "react";
import Button from "../../../../components/ui/button/Button";
import ConfirmModal from "../../../../components/ui/ConfirmModal/ConfirmModal";

const DeleteAccountButton = () => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const isLoading = false;
  const handleDelete = () => {};
  return (
    <>
      <Button
        size="xs"
        radius="xl"
        variant={isLoading ? "disable" : "link"}
        className="order-2 shrink-0 text-sm font-bold transition-colors sm:order-1"
        type="button"
        disabled={isLoading}
        onClick={() => setIsModalOpen(true)}
      >
        Delete Account
      </Button>
      <ConfirmModal
        isOpen={modalOpen}
        title="Delete Account"
        message={`동일한 이메일로 다시 가입하실 수 없습니다.\n정말 계정을 삭제하시겠습니까?`}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DeleteAccountButton;
