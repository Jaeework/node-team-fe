import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import Label from "../../components/ui/label/Label";
import { REGISTER_FIELDS } from "./registerFields";
import useRegister from "../../hooks/useRegister";
import Input from "../../components/ui/input/Input";
import InputWithMessage from "../../components/ui/input-with-message/InputWithMessage";
import type { RegisterFormData } from "./RegisterPage.types";

const RegisterPage = () => {
  const {
    formData,
    fieldStates,
    policy,
    policyError,
    registrationError,
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
        <form className="space-y-7" onSubmit={handleSubmit}>
          {registrationError && (
            <p className="text-center text-sm text-red-500">
              {registrationError}
            </p>
          )}
          {REGISTER_FIELDS.map((field) => {
            const fieldName = field.name as keyof RegisterFormData;
            return (
              <div key={field.id} className="flex flex-col">
                <Label size="sm" htmlFor={field.name}>
                  {field.label}
                </Label>
                <InputWithMessage
                  {...field}
                  color="primary"
                  message={fieldStates[fieldName]?.message}
                  variant={fieldStates[fieldName]?.variant}
                  onChange={handleChange}
                  required
                  className="border-primary/10"
                />
              </div>
            );
          })}

          <div className="flex flex-col gap-3 pt-2">
            <label className="text-ink-700 text-sm leading-normal font-semibold">
              English Proficiency Level
            </label>
            <div className="grid grid-cols-4 gap-3">
              {["A2", "B1", "B2", "C1"].map((level) => (
                <label className="cursor-pointer" key={level}>
                  <Input
                    className="peer absolute h-0 w-0 opacity-0"
                    name="level"
                    value={level}
                    checked={formData.level === level}
                    onChange={handleChange}
                    type="radio"
                  />
                  <div className="peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary border-ink-300 bg-ink-50 flex flex-col items-center justify-center rounded-lg border p-3 transition-all">
                    <span className="text-xs font-bold tracking-wider uppercase">
                      {level}
                    </span>
                  </div>
                </label>
              ))}
            </div>
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
          {policyError && <p className="text-sm text-red-500">{policyError}</p>}
          <Button
            size="xl"
            radius="xl"
            isFullWidth
            className="shadow-primary/20 overflow-hidden text-lg leading-normal font-bold tracking-[0.015em] shadow-lg transition-all active:scale-[0.98]"
            type="submit"
          >
            <h1>Create Account</h1>
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
