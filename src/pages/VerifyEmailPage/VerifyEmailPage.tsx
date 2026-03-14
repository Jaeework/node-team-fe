import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { verifyEmail } from "../../features/user/userSlice";
import Button from "../../components/ui/button/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { cn } from "../../lib/utils";

const VerifyEmailPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { verifyEmailStatus } = useAppSelector((state) => state.user);
  const hasVerified = useRef(false);

  const token = searchParams.get("token");
  const status = !token ? "error" : verifyEmailStatus;
  const isLoading = status === "idle" || status === "loading";

  useEffect(() => {
    if (!token) return;
    if (hasVerified.current) return;

    hasVerified.current = true;

    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  return (
    <div className="flex min-h-full w-screen items-center justify-center md:py-8">
      <div className="w-full max-w-md bg-white p-8 text-center shadow-xl md:rounded-xl md:p-12">
        <div className="relative">
          <div className={cn(isLoading && "invisible")}>
            <h1 className="text-ink mb-2 text-lg font-bold">
              {status === "success"
                ? "인증 완료! 로그인해주세요."
                : "유효하지 않거나 만료된 링크입니다."}
            </h1>
            {status === "success" && (
              <Link to="/login">
                <Button
                  className="mt-8"
                  size="xl"
                  radius="xl"
                  isFullWidth
                  variant="primary"
                >
                  로그인하러 가기
                </Button>
              </Link>
            )}
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
