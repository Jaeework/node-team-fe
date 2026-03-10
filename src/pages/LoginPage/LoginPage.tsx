import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import InputWithIcon from "../../components/ui/input-with-icon/InputWithIcon";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import Label from "../../components/ui/label/Label";
import useLoginForm from "../../hooks/useLogin";
import type { loginField } from "./LoginPage.types";
import { useState } from "react";

const LoginPage = () => {
  const { loginError, handleChange, handleSubmit, handleGoogleLogin } =
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
    <div className="w-full md:py-8">
      <div className="shadow-primary/5 md:border-primary/5 w-full max-w-md bg-white p-8 shadow-xl sm:min-w-md md:rounded-xl md:p-12">
        <div className="mb-8 text-center">
          <h1 className="text-ink-900 mb-2 text-3xl font-extrabold tracking-[-0.033em]">
            Welcome Back
          </h1>
          <p className="text-ink/50">Log in to access your dashboard</p>
        </div>
        {loginError && <p className="text-sm text-red-500">{loginError}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.id}>
              <Label size="sm" htmlFor={field.name}>
                {field.label}
              </Label>
              <InputWithIcon {...field} onChange={handleChange} required />
            </div>
          ))}

          <Button
            size="xl"
            radius="lg"
            isFullWidth
            className="shadow-primary/20 mt-4 transform font-bold shadow-lg transition-all active:scale-[0.98]"
            type="submit"
          >
            <h1>Log in</h1>
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
        <div className="grid grid-cols-1">
          <Button
            variant="outline"
            size="lg"
            radius="lg"
            isFullWidth
            onClick={() => handleGoogleLogin()}
            className="hover:bg-border/30 transition-colors"
          >
            <img
              alt=""
              className="size-4"
              data-alt="Google logo icon"
              src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
            />
            <span className="text-sm font-semibold">Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
