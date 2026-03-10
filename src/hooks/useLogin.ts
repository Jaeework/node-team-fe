import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { useState } from "react";
import {
  clearErrors,
  loginWithEmail,
  loginWithGoogle,
} from "../features/user/userSlice";

const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const loginError = useAppSelector((state) => state.user.loginError);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearErrors());
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
    loginError,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  };
};

export default useLoginForm;
