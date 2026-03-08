/* eslint-disable no-console */
import Button from "../../components/ui/button/Button";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { registerUser } from "../../features/user/userSlice";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registrationError = useAppSelector(
    (state) => state.user.registrationError,
  );
  const handleRegisterTest = async () => {
    const result = await dispatch(
      registerUser({
        nickname: "양준석",
        email: "yang@test.com",
        password: "test1234!",
        level: "A2",
        navigate: (path) => console.log("navigate →", path),
      }),
    );
    console.log("result", result);
  };
  return (
    <div className="px-4">
      RegisterPage
      <div className="h-4"></div>
      {registrationError && (
        <p className="text-sm text-red-500">{registrationError}</p>
      )}
      <div className="h-2"></div>
      <Button
        size="xl"
        variant="primary"
        radius="xl"
        onClick={handleRegisterTest}
      >
        <h1 className="text-sm">회원가입 테스트</h1>
      </Button>
    </div>
  );
};

export default RegisterPage;
