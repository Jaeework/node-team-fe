import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { clearErrors, registerUser } from "../features/user/userSlice";
import type { RegisterFormData } from "../pages/RegisterPage/RegisterPage.types";

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
  const [passwordError, setPasswordError] = useState("");
  const [policy, setPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePolicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPolicy(e.target.checked);
    setPolicyError("");
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    dispatch(clearErrors());

    const { password, secPassword } = formData;
    const isPasswordError = password !== secPassword;
    const isPolicyError = !policy;

    if (isPasswordError) setPasswordError("비밀번호가 일치하지 않습니다.");
    if (isPolicyError) setPolicyError("약관에 동의해주세요.");
    if (isPasswordError || isPolicyError) return;

    await dispatch(registerUser({ ...formData, navigate }));
  };

  return {
    formData,
    passwordError,
    policy,
    policyError,
    registrationError,
    handleChange,
    handlePolicyChange,
    handleSubmit,
  };
};

export default useRegister;
