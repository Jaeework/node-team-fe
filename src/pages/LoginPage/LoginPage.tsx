import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import InputWithMessage from "../../components/ui/input-with-message/InputWithMessage";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import Label from "../../components/ui/label/Label";
import useLoginForm from "../../hooks/useLogin";
import type { loginField, LoginFormData } from "./LoginPage.types";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useAppSelector } from "../../features/hooks";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const LoginPage = () => {
  const { isLoading } = useAppSelector((state) => state.user);
  const { fieldStates, handleChange, handleSubmit, handleGoogleLogin } =
    useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const fields: loginField[] = [
    {
      label: "Email Address",
      type: "email",
      id: "email",
      name: "email",
      placeholder: "Enter your email address",
      leftIcon: <Mail size={16} />,
      autoComplete: "email",
    },
    {
      label: "Password",
      type: showPassword ? "text" : "password",
      id: "password",
      name: "password",
      placeholder: "Enter your password",
      leftIcon: <Lock size={16} />,
      rightIcon: (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-primary/55 translate-x-2"
          onClick={handleShowPassword}
        >
          {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button>
      ),
      autoComplete: "current-password",
    },
  ];

  return (
    <div className="flex min-h-full w-screen items-center justify-center md:py-8">
      <div className="shadow-primary/5 md:border-primary/5 w-full max-w-md bg-white p-8 shadow-xl md:min-w-md md:rounded-xl md:p-12">
        <div className="mb-8 text-center">
          <h1 className="text-ink-900 mb-2 text-3xl font-extrabold tracking-[-0.033em]">
            Welcome Back
          </h1>
          <p className="text-ink/50">Log in to access your dashboard</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {fields.map((field) => {
            const fieldName = field.name as keyof LoginFormData;
            return (
              <div key={field.id}>
                <Label size="sm" htmlFor={field.name}>
                  {field.label}
                </Label>
                <InputWithMessage
                  {...field}
                  readOnly={isLoading}
                  color="primary"
                  onChange={handleChange}
                  messages={fieldStates[fieldName]}
                  className="border-primary/10"
                />
              </div>
            );
          })}

          <Button
            size="xl"
            radius="lg"
            isFullWidth
            variant={isLoading ? "disable" : "primary"}
            className="shadow-primary/20 mt-4 transform font-bold shadow-lg transition-all active:scale-[0.98]"
            type="submit"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : <h1>Log in</h1>}
          </Button>
        </form>
        <div className="mt-1 pt-6 text-center">
          <p className="text-ink/50">
            Don't have an account?
            <Link
              className="text-primary ml-1 font-bold underline-offset-4 hover:underline"
              to="/register"
            >
              Create an account
            </Link>
          </p>
        </div>
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="border-ink/50 w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="text-ink/50 bg-white px-2">Or continue with</span>
          </div>
        </div>
        <div className="mb-2 flex justify-center">
          <GoogleLogin logo_alignment="center" onSuccess={handleGoogleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
