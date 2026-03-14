import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../features/hooks";
import { useEffect, useState } from "react";
import {
  clearErrors,
  loginWithEmail,
  loginWithGoogle,
} from "../features/user/userSlice";
import type { LoginFormData } from "../pages/LoginPage/LoginPage.types";
import type { ValidationMessage } from "../components/ui/input-with-message/InputWithMessage.types";

type FieldStates = Partial<Record<keyof LoginFormData, ValidationMessage[]>>;

const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/articles";

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [fieldStates, setFieldStates] = useState<FieldStates>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof LoginFormData;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldStates[fieldName]) {
      setFieldStates((prev) => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = (): boolean => {
    const newFieldStates: FieldStates = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newFieldStates.email = [
        { message: "이메일을 입력하세요", variant: "error" },
      ];
      isValid = false;
    }
    if (!formData.password.trim()) {
      newFieldStates.password = [
        { message: "패스워드를 입력하세요", variant: "error" },
      ];
      isValid = false;
    }

    setFieldStates(newFieldStates);
    return isValid;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearErrors());
    if (!validateForm()) return;
    const result = await dispatch(loginWithEmail(formData));
    if (loginWithEmail.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLogin = async (credentialResponse: {
    credential?: string;
  }) => {
    if (credentialResponse.credential) {
      const result = await dispatch(
        loginWithGoogle(credentialResponse.credential),
      );
      if (loginWithGoogle.fulfilled.match(result)) {
        navigate(from, { replace: true });
      }
    }
  };

  return {
    formData,
    fieldStates,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  };
};

export default useLoginForm;
