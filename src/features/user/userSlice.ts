import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  LoginResponseData,
  User,
  UserLevel,
  UserState,
} from "./user.types";
import api from "../../lib/axios";
import { isApiError, type ApiResponse } from "../../types/api.types";
import { showToast } from "../toast/toastSlice";

export const checkDuplicateEmail = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>("user/checkDuplicateEmail", async (email, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<boolean>>("/auth/check-email", {
      params: { email },
    });

    const isDuplicate = res.data.data;
    if (isDuplicate === undefined || isDuplicate === null) {
      return rejectWithValue("이메일을 확인하지 못했습니다.");
    }

    return isDuplicate;
  } catch (error) {
    if (isApiError(error) && error.isUserError) {
      return rejectWithValue(error.message || "이메일을 확인하지 못했습니다.");
    }
    return rejectWithValue("이메일 확인 중 오류가 발생했습니다");
  }
});

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
    { rejectWithValue, dispatch },
  ) => {
    try {
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
        const errorMsg = "회원가입 중 오류가 발생했습니다.";
        dispatch(
          showToast({ message: errorMsg, type: "error", position: "top" }),
        );
        return rejectWithValue(errorMsg);
      }

      dispatch(
        showToast({
          message: "가입이 완료되었습니다. 로그인해주세요.",
          type: "success",
          position: "top",
        }),
      );

      navigate("/login");
      return data;
    } catch (error) {
      const errorMsg =
        isApiError(error) && error.isUserError
          ? error.message || "회원가입 중 오류가 발생했습니다."
          : "회원가입 중 오류가 발생했습니다.";

      dispatch(
        showToast({ message: errorMsg, type: "error", position: "top" }),
      );

      return rejectWithValue(errorMsg);
    }
  },
);

export const loginWithEmail = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/loginWithEmail",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      if (!email || !password) {
        return rejectWithValue("이메일과 패스워드를 입력해주세요.");
      }
      const res = await api.post<ApiResponse<LoginResponseData>>(
        "/auth/signin",
        {
          email,
          password,
        },
      );
      const data = res.data.data;

      if (!data) {
        const errorMsg = "로그인 중 오류가 발생했습니다.";
        dispatch(
          showToast({ message: errorMsg, type: "error", position: "top" }),
        );
        return rejectWithValue(errorMsg);
      }

      sessionStorage.setItem("token", data.token);
      return data.user;
    } catch (error) {
      const errorMsg =
        isApiError(error) && error.isUserError
          ? error.message || "로그인 중 오류가 발생했습니다."
          : "로그인 중 오류가 발생했습니다.";

      dispatch(
        showToast({ message: errorMsg, type: "error", position: "top" }),
      );

      return rejectWithValue(errorMsg);
    }
  },
);

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

export const loginWithGoogle = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("user/loginWithGoogle", async (credential, { rejectWithValue, dispatch }) => {
  try {
    const res = await api.post<ApiResponse<LoginResponseData>>("/auth/google", {
      credential: credential,
    });

    const data = res.data.data;

    if (!data) {
      const errorMsg = "데이터를 불러오지 못했습니다.";
      dispatch(
        showToast({ message: errorMsg, type: "error", position: "top" }),
      );
      return rejectWithValue(errorMsg);
    }

    sessionStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    const errorMsg =
      isApiError(error) && error.isUserError
        ? error.message || "로그인 중 오류가 발생했습니다."
        : "로그인 중 오류가 발생했습니다.";

    dispatch(showToast({ message: errorMsg, type: "error", position: "top" }));

    return rejectWithValue(errorMsg);
  }
});

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/signout");
      sessionStorage.removeItem("token");
    } catch (error) {
      if (isApiError(error) && error.isUserError) {
        return rejectWithValue(
          error.message || "로그아웃 중 오류가 발생했습니다.",
        );
      }
      return rejectWithValue("로그아웃 중 오류가 발생했습니다.");
    }
  },
);

const initialState: UserState = {
  user: null,
  isLoading: false,
  isCheckingEmail: false,
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
      .addCase(checkDuplicateEmail.pending, (state) => {
        state.isCheckingEmail = true;
      })
      .addCase(checkDuplicateEmail.fulfilled, (state) => {
        state.isCheckingEmail = false;
      })
      .addCase(checkDuplicateEmail.rejected, (state) => {
        state.isCheckingEmail = false;
      })
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
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginError = null;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload || "로그인 중 오류가 발생했습니다.";
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logOut.rejected, (state) => {
        state.user = null;
        sessionStorage.removeItem("token");
      });
  },
});

export const { setUser, clearUserState, clearErrors } = userSlice.actions;
export default userSlice.reducer;
