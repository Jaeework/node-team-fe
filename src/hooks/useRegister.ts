import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../features/hooks";
import {
  checkDuplicateEmail,
  clearErrors,
  registerUser,
} from "../features/user/userSlice";
import type { RegisterFormData } from "../pages/RegisterPage/RegisterPage.types";
import type { ValidationMessage } from "../components/ui/input-with-message/InputWithMessage.types";
import { EMAIL_REGEX, FIELD_VALIDATIONS } from "../constants/fieldValidations";

type FieldStates = Partial<Record<keyof RegisterFormData, ValidationMessage[]>>;

const getInitialFieldStates = (): FieldStates => {
  const states: FieldStates = {};

  for (const [name, rules] of Object.entries(FIELD_VALIDATIONS)) {
    if (!rules) continue;

    const messages = rules
      .filter((rule) => !rule.hideOnSuccess)
      .map((rule) => ({
        message: rule.message,
        variant: "default" as const,
      }));

    if (messages.length > 0) {
      states[name as keyof RegisterFormData] = messages;
    }
  }

  return states;
};

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const [formData, setFormData] = useState<RegisterFormData>({
    nickname: "",
    email: "",
    password: "",
    secPassword: "",
    level: "A2",
  });

  const [fieldStates, setFieldStates] = useState<FieldStates>(
    getInitialFieldStates(),
  );
  const [policy, setPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const handleCheckEmail = async () => {
    const email = formData.email;

    if (!email) {
      setFieldStates((prev) => ({
        ...prev,
        email: [{ message: "이메일을 입력해주세요.", variant: "error" }],
      }));
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setFieldStates((prev) => ({
        ...prev,
        email: [{ message: "올바른 이메일 형식이 아닙니다", variant: "error" }],
      }));
      return;
    }

    const result = await dispatch(checkDuplicateEmail(email));
    if (checkDuplicateEmail.rejected.match(result)) {
      setFieldStates((prev) => ({
        ...prev,
        email: [
          {
            message: result.payload ?? "이메일 확인 중 오류가 발생했습니다",
            variant: "error",
          },
        ],
      }));
      return;
    }

    if (checkDuplicateEmail.fulfilled.match(result)) {
      const isDuplicate = result.payload;
      setIsEmailChecked(!isDuplicate);

      setFieldStates((prev) => ({
        ...prev,
        email: [
          {
            message: isDuplicate
              ? "이미 사용 중인 이메일입니다"
              : "사용 가능한 이메일입니다",
            variant: isDuplicate ? "error" : "success",
          },
        ],
      }));
    }
  };

  const validateField = (name: keyof RegisterFormData, value: string) => {
    if (!(name in FIELD_VALIDATIONS)) return;
    const rules = FIELD_VALIDATIONS[name as keyof typeof FIELD_VALIDATIONS];
    if (!rules) return;

    const messages: ValidationMessage[] = [];

    for (const rule of rules) {
      const isValid = rule.validate(value, formData);

      if (isValid && rule.hideOnSuccess) continue;

      messages.push({
        message: rule.message,
        variant: isValid ? "success" : "error",
      });
    }

    if (messages.length > 0) {
      setFieldStates((prev) => ({
        ...prev,
        [name]: messages,
      }));
    } else {
      setFieldStates((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof RegisterFormData, value);

    if (name === "email") {
      setIsEmailChecked(false);
    }
  };

  const handlePolicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPolicy(e.target.checked);
    setPolicyError("");
  };

  const validateRequiredFields = (
    fieldsToValidate: (keyof RegisterFormData)[],
  ): boolean => {
    let isValid = true;
    for (const name of fieldsToValidate) {
      const value = formData[name];

      if (!value.trim()) {
        setFieldStates((prev) => ({
          ...prev,
          [name]: [{ message: "필수 입력 항목입니다", variant: "error" }],
        }));

        isValid = false;
        continue;
      }
    }
    return isValid;
  };

  const validateForm = (): boolean => {
    const newFieldStates: FieldStates = {};
    let isValid = true;

    const fieldsToValidate: (keyof RegisterFormData)[] = [
      "nickname",
      "email",
      "password",
      "secPassword",
    ];

    const isRequiredFieldsValid = validateRequiredFields(fieldsToValidate);
    if (!isRequiredFieldsValid) return false;

    if (!isEmailChecked) {
      setFieldStates((prev) => ({
        ...prev,
        email: [
          { message: "이메일 중복 확인이 필요합니다.", variant: "error" },
        ],
      }));
      return false;
    }

    for (const name of fieldsToValidate) {
      const value = formData[name];

      if (!(name in FIELD_VALIDATIONS)) continue;
      const rules = FIELD_VALIDATIONS[name as keyof typeof FIELD_VALIDATIONS];
      if (!rules) continue;

      const messages: ValidationMessage[] = [];

      for (const rule of rules) {
        const ruleValid = rule.validate(value, formData);
        if (!ruleValid) isValid = false;

        if (ruleValid && rule.hideOnSuccess) continue;

        messages.push({
          message: rule.message,
          variant: ruleValid ? "success" : "error",
        });
      }

      if (messages.length > 0) {
        newFieldStates[name] = messages;
      }
    }

    setFieldStates(newFieldStates);
    return isValid;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearErrors());

    const isFormValid = validateForm();
    const isPolicyError = !policy;

    if (isPolicyError) setPolicyError("약관에 동의해주세요.");
    if (!isFormValid || isPolicyError) return;

    await dispatch(registerUser({ ...formData, navigate }));
  };

  return {
    formData,
    fieldStates,
    isEmailChecked,
    policy,
    policyError,
    handleCheckEmail,
    handleChange,
    handlePolicyChange,
    handleSubmit,
  };
};

export default useRegister;
