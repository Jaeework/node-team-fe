import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { clearErrors, registerUser } from "../features/user/userSlice";
import type { RegisterFormData } from "../pages/RegisterPage/RegisterPage.types";
import type { ValidationVariant } from "../components/ui/input-with-message/InputWithMessage.types";

type FieldState = {
  message: string;
  variant: ValidationVariant;
};
type FieldStates = Partial<Record<keyof RegisterFormData, FieldState>>;

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { registrationError } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<RegisterFormData>({
    nickname: "",
    email: "",
    password: "",
    secPassword: "",
    level: "A2",
  });
  const initialFieldStates: FieldStates = {
    nickname: { message: "2자 이상, 10자 이내", variant: "default" },
    password: {
      message: "8자 이상 / 영문, 숫자, 특수문자 2개 이상 조합",
      variant: "default",
    },
  };

  const [fieldStates, setFieldStates] =
    useState<FieldStates>(initialFieldStates);
  const [policy, setPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const validateField = (name: keyof RegisterFormData, value: string) => {
    let fieldState: FieldState | undefined;

    switch (name) {
      case "nickname": {
        const trimmed = value.trim();
        const isValid = trimmed.length >= 2 && trimmed.length <= 10;
        fieldState = {
          message: "2자 이상, 10자 이내",
          variant: isValid ? "success" : "error",
        };
        break;
      }
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        fieldState = isValid
          ? undefined
          : { message: "올바른 이메일 형식이 아닙니다", variant: "error" };
        break;
      }
      case "password": {
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const typeCount = [hasLetter, hasNumber, hasSpecial].filter(
          Boolean,
        ).length;
        const isValid = value.length >= 8 && typeCount >= 2;
        fieldState = {
          message: "8자 이상 / 영문, 숫자, 특수문자 2개 이상 조합",
          variant: isValid ? "success" : "error",
        };
        break;
      }
      case "secPassword": {
        const isValid = value === formData.password;
        fieldState = isValid
          ? undefined
          : { message: "비밀번호가 일치하지 않습니다", variant: "error" };
        break;
      }
    }

    if (fieldState) {
      setFieldStates((prev) => ({ ...prev, [name]: fieldState }));
    } else {
      setFieldStates((prev) => {
        const newState = { ...prev };
        delete newState[name];
        return newState;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof RegisterFormData, value);
  };

  const handlePolicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPolicy(e.target.checked);
    setPolicyError("");
  };

  const validateForm = (): boolean => {
    const newFieldStates: FieldStates = { ...initialFieldStates };
    let isValid = true;

    // 닉네임 검사
    const nickname = formData.nickname.trim();
    const isNicknameValid = nickname.length >= 2 && nickname.length <= 10;
    newFieldStates.nickname = {
      message: "2자 이상, 10자 이내",
      variant: isNicknameValid ? "success" : "error",
    };
    if (!isNicknameValid) isValid = false;

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    if (!isEmailValid) {
      newFieldStates.email = {
        message: "올바른 이메일 형식이 아닙니다",
        variant: "error",
      };
      isValid = false;
    }

    // 비밀번호 검사
    const password = formData.password;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const typeCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
    const isPasswordValid = password.length >= 8 && typeCount >= 2;
    newFieldStates.password = {
      message: "8자 이상 / 영문, 숫자, 특수문자 2개 이상 조합",
      variant: isPasswordValid ? "success" : "error",
    };
    if (!isPasswordValid) isValid = false;

    // 비밀번호 확인 검사
    const { password: pw, secPassword } = formData;
    const isSecPasswordValid = pw === secPassword;
    if (!isSecPasswordValid) {
      newFieldStates.secPassword = {
        message: "비밀번호가 일치하지 않습니다",
        variant: "error",
      };
      isValid = false;
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
    policy,
    policyError,
    registrationError,
    handleChange,
    handlePolicyChange,
    handleSubmit,
  };
};

export default useRegister;
