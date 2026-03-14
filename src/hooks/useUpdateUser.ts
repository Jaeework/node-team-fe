import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { updateUser } from "../features/user/userSlice";
import type { UserLevel, UserRequestData } from "../features/user/user.types";
import type { ValidationMessage } from "../components/ui/input-with-message/InputWithMessage.types";
import { FIELD_VALIDATIONS } from "../constants/fieldValidations";

interface UpdateFormData {
  nickname: string;
  level: UserLevel;
  password: string;
  secPassword: string;
}

type FieldStates = Partial<Record<keyof UpdateFormData, ValidationMessage[]>>;

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
      states[name as keyof UpdateFormData] = messages;
    }
  }

  return states;
};

const useUpdateUser = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  const handleCancel = () => {
    setIsEdit(false);
    setPasswordEdit(false);
    resetForm();
  };

  const [formData, setFormData] = useState<UpdateFormData>({
    nickname: user?.nickname ?? "",
    level: user?.level ?? "A2",
    password: "",
    secPassword: "",
  });

  const [fieldStates, setFieldStates] = useState<FieldStates>(
    getInitialFieldStates(),
  );

  const validateField = (name: keyof UpdateFormData, value: string) => {
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
    validateField(name as keyof UpdateFormData, value);
  };

  const validateForm = (): boolean => {
    const newFieldStates: FieldStates = {};
    let isValid = true;

    // nickname은 필수
    const nicknameRules = FIELD_VALIDATIONS.nickname;
    if (nicknameRules) {
      const messages: ValidationMessage[] = [];
      for (const rule of nicknameRules) {
        const ruleValid = rule.validate(formData.nickname, formData);
        if (!ruleValid) isValid = false;
        if (ruleValid && rule.hideOnSuccess) continue;
        messages.push({
          message: rule.message,
          variant: ruleValid ? "success" : "error",
        });
      }
      if (messages.length > 0) {
        newFieldStates.nickname = messages;
      }
    }

    // password는 입력된 경우에만 검증
    if (passwordEdit && formData.password) {
      const passwordRules = FIELD_VALIDATIONS.password;
      if (passwordRules) {
        const messages: ValidationMessage[] = [];
        for (const rule of passwordRules) {
          const ruleValid = rule.validate(formData.password, formData);
          if (!ruleValid) isValid = false;
          if (ruleValid && rule.hideOnSuccess) continue;
          messages.push({
            message: rule.message,
            variant: ruleValid ? "success" : "error",
          });
        }
        if (messages.length > 0) {
          newFieldStates.password = messages;
        }
      }

      const confirmRules = FIELD_VALIDATIONS.secPassword;
      if (confirmRules) {
        const messages: ValidationMessage[] = [];
        for (const rule of confirmRules) {
          const ruleValid = rule.validate(formData.secPassword, formData);
          if (!ruleValid) isValid = false;
          if (ruleValid && rule.hideOnSuccess) continue;
          messages.push({
            message: rule.message,
            variant: ruleValid ? "success" : "error",
          });
        }
        if (messages.length > 0) {
          newFieldStates.secPassword = messages;
        }
      }
    }

    setFieldStates(newFieldStates);
    return isValid;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload: UserRequestData = {
      nickname: formData.nickname,
      level: formData.level,
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    const result = await dispatch(updateUser(payload));

    if (updateUser.fulfilled.match(result)) {
      setFormData((prev) => ({
        ...prev,
        password: "",
        secPassword: "",
      }));
      setIsEdit(false);
      setPasswordEdit(false);
      setFieldStates(getInitialFieldStates());
      return true;
    }

    return false;
  };

  const resetForm = () => {
    setFormData({
      nickname: user?.nickname ?? "",
      level: user?.level ?? "A2",
      password: "",
      secPassword: "",
    });
    setFieldStates(getInitialFieldStates());
  };

  return {
    user,
    isEdit,
    setIsEdit,
    passwordEdit,
    setPasswordEdit,
    formData,
    fieldStates,
    isLoading,
    handleChange,
    handleCancel,
    handleSubmit,
  };
};

export default useUpdateUser;
