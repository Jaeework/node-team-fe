import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Label from "../../components/ui/label/Label";
import InputWithMessage from "../../components/ui/input-with-message/InputWithMessage";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import LevelSelector from "../../components/common/LevelSelector/LevelSelector";
import { REGISTER_FIELDS } from "./constants/registerFields";
import useRegister from "../../hooks/useRegister";
import type { RegisterFormData } from "./RegisterPage.types";
import { cn } from "../../lib/utils";
import { useAppSelector } from "../../features/hooks";

const RegisterPage = () => {
  const { isLoading, isCheckingEmail } = useAppSelector((state) => state.user);
  const {
    formData,
    fieldStates,
    isEmailChecked,
    policy,
    policyError,
    handleCheckEmail,
    handleChange,
    handlePolicyChange,
    handleSubmit,
  } = useRegister();

  return (
    <div className="flex min-h-full w-screen items-center justify-center md:py-8">
      <div className="shadow-primary/5 md:border-primary/5 w-full max-w-md bg-white p-8 shadow-xl sm:min-w-md md:rounded-xl md:p-12">
        <div className="mb-8">
          <h1 className="text-ink-900 mb-2 text-3xl leading-tight font-black tracking-[-0.033em]">
            Create Your Account
          </h1>
          <p className="text-ink/50 text-base font-normal">
            Join thousands of learners today
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {REGISTER_FIELDS.map((field) => {
            const fieldName = field.name as keyof RegisterFormData;
            return (
              <div key={field.id} className="flex flex-col">
                <Label size="sm" htmlFor={field.name}>
                  {field.label}
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <InputWithMessage
                      {...field}
                      readOnly={isLoading || isCheckingEmail}
                      color="primary"
                      messages={fieldStates[fieldName]}
                      onChange={handleChange}
                      className="border-primary/10"
                    />
                  </div>
                  {field.name === "email" && (
                    <Button
                      type="button"
                      variant={isCheckingEmail ? "disable" : "border"}
                      size="icon"
                      disabled={isCheckingEmail}
                      onClick={handleCheckEmail}
                      className={cn(
                        `shrink-0 text-gray-300`,
                        isEmailChecked && "text-green-500",
                      )}
                    >
                      {isCheckingEmail ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Check size={16} />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex flex-col gap-3 pt-2">
            <Label>English Proficiency Level</Label>
            <LevelSelector
              selectedLevel={formData.level}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-start gap-3 pt-2">
            <input
              className="text-primary focus:ring-primary border-ink-300 mt-1 rounded"
              id="terms"
              type="checkbox"
              checked={policy}
              onChange={handlePolicyChange}
            />
            <Label
              size="sm"
              className="text-ink/60 text-sm leading-tight font-medium"
              htmlFor="terms"
            >
              I agree to the{" "}
              <a className="text-primary hover:underline" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-primary hover:underline" href="#">
                Privacy Policy
              </a>
              .
            </Label>
          </div>
          {policyError && (
            <p className="translate-x-1 -translate-y-4 text-sm text-red-500">
              {policyError}
            </p>
          )}
          <Button
            size="xl"
            radius="xl"
            isFullWidth
            variant={isLoading ? "disable" : "primary"}
            disabled={isLoading}
            className="shadow-primary/20 overflow-hidden text-lg leading-normal font-bold tracking-[0.015em] shadow-lg transition-all active:scale-[0.98]"
            type="submit"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : <h1>Create Account</h1>}
          </Button>
        </form>
        <div className="mt-1 pt-6 text-center">
          <p className="text-ink/50">
            Already have an account?
            <Link
              className="text-primary ml-1 font-bold underline-offset-4 hover:underline"
              to="/login"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
