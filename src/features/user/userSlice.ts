import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  LoginWithEmailData,
  User,
  UserLevel,
  UserState,
} from "./user.types";
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
      const res = await api.post<ApiResponse<User>>("/auth/signup", {
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

export const loginWithEmail = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/loginWithEmail", async ({ email, password }, { rejectWithValue }) => {
  try {
    if (!email || !password) {
      return rejectWithValue("이메일과 패스워드를 입력해주세요.");
    }
    const res = await api.post<ApiResponse<LoginWithEmailData>>(
      "/auth/signin",
      {
        email,
        password,
      },
    );
    const data = res.data.data;

    if (!data) {
      return rejectWithValue("로그인 중 오류가 발생했습니다.");
    }

    sessionStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    if (isApiError(error) && error.isUserError) {
      return rejectWithValue(error.message || "로그인 중 오류가 발생했습니다.");
    }
    return rejectWithValue("로그인 중 오류가 발생했습니다.");
  }
});

export const loginWithToken = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/loginWithToken", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<User>>("/user/me");

    const data = res.data.data;

    if (!data) {
      return rejectWithValue("로그인 중 오류가 발생했습니다.");
    }

    return data;
  } catch (error) {
    if (isApiError(error) && error.isUserError) {
      return rejectWithValue(error.message || "로그인 중 오류가 발생했습니다.");
    }
    return rejectWithValue("로그인 중 오류가 발생했습니다.");
  }
});

const initialState: UserState = {
  user: null,
  isLoading: false,
  isInitialized: false,
  registrationError: null,
  loginError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUserState(state) {
      state.user = null;
      sessionStorage.removeItem("token");
    },
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
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loginError = null;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loginError = action.payload || "로그인 중 오류가 발생했습니다.";
        state.isLoading = false;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(loginWithToken.rejected, (state) => {
        state.isInitialized = true;
      });
  },
});

export const { setUser, clearUserState, clearErrors } = userSlice.actions;
export default userSlice.reducer;
