import Button from "../../components/ui/button/Button";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { loginWithEmail, loginWithToken } from "../../features/user/userSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector((state) => state.user.loginError);

  const handleLoginTest = async () => {
    await dispatch(
      loginWithEmail({
        email: "yoo@test.com",
        password: "test1234!",
      }),
    );
  };
  const handleTokenTest = async () => {
    await dispatch(loginWithToken());
  };

  return (
    <div className="px-4">
      LandingPage
      <div className="h-4"></div>
      <div className="h-2"></div>
      {loginError && <p className="text-sm text-red-500">{loginError}</p>}
      <Button size="xl" variant="primary" radius="xl" onClick={handleLoginTest}>
        <h1 className="text-sm">로그인 테스트</h1>
      </Button>
      <div className="h-4"></div>
      <Button size="xl" variant="primary" radius="xl" onClick={handleTokenTest}>
        <h1 className="text-sm">토큰 로그인 테스트</h1>
      </Button>
    </div>
  );
};

export default LoginPage;
