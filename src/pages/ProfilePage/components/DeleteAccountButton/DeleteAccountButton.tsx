import { useState } from "react";
import Button from "../../../../components/ui/button/Button";
import ConfirmModal from "../../../../components/common/ConfirmModal/ConfirmModal";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../../../../features/hooks";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../../features/user/userSlice";
import { cn } from "../../../../lib/utils";

const DeleteAccountButton = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteUser())
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <>
      <Button
        size="xs"
        radius="xl"
        variant="link"
        className="order-2 shrink-0 text-sm font-bold transition-colors sm:order-1"
        type="button"
        disabled={isLoading}
        onClick={() => setIsModalOpen(true)}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="sm" />
          </span>
        )}
        <span className={cn(isLoading && "invisible")}>
          <span className="ml-1">Delete Account</span>
        </span>
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
