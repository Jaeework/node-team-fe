import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User, UserLevel, UserState } from "./user.types";
import api from "../../lib/axios";
import { isApiError, type ApiResponse } from "../../types/api.types";

export const registerUser = createAsyncThunk<
  User,
  {
    nickname: string;
    email: string;
    level: UserLevel;
    password: string;
    navigate: (path: string) => void;
  },
  { rejectValue: string }
>(
  "user/registerUser",
  async (
    { nickname, email, level, password, navigate },
    { rejectWithValue },
  ) => {
    try {
      // 유효성 검사는 나중에 컴포넌트 레벨로 옮길 예정
      if (!nickname || !email || !password) {
        return rejectWithValue("모든 필드를 입력해주세요.");
      }
      if (!level) {
        return rejectWithValue("레벨을 선택해주세요.");
      }
      const res = await api.post<ApiResponse<User>>("/api/auth/signup", {
        nickname,
        email,
        level,
        password,
      });

      const data = res.data.data;
      if (!data) {
        return rejectWithValue("회원가입 중 오류가 발생했습니다.");
      }

      navigate("/login");
      return data;
    } catch (error) {
      if (isApiError(error) && error.isUserError) {
        return rejectWithValue(
          error.message || "회원가입 중 오류가 발생했습니다.",
        );
      }
      return rejectWithValue("회원가입 중 오류가 발생했습니다.");
    }
  },
);

const initialState: UserState = {
  user: null,
  isLoading: false,
  registrationError: null,
  loginError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors(state) {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registrationError =
          action.payload || "회원가입 중 오류가 발생했습니다.";
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
