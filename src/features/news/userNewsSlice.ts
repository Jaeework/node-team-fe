import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import {
  isApiError,
  type ApiResponse,
  type Pagination,
} from "../../types/api.types";
import type { UserNews } from "./news.types";

interface UserNewsState {
  userNews: UserNews[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserNewsState = {
  userNews: [],
  pagination: null,
  isLoading: false,
  error: null,
};

export const getUserNews = createAsyncThunk<
  { data: UserNews[]; pagination?: Pagination },
  {
    q?: string;
    level?: string;
    sort?: string;
    page?: number;
  },
  { rejectValue: string }
>("userNews/getUserNews", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<UserNews[]>>("/user/news", {
      params: params || {},
    });

    const data = res.data.data;
    const pagination = res.data.pagination;

    if (!data || !pagination) {
      return rejectWithValue("저장한 기사 목록을 불러올 수 없습니다.");
    }

    return {
      data,
      pagination,
    };
  } catch (error) {
    if (isApiError(error) && error.isUserError) {
      return rejectWithValue(
        error.message || "기사 목록을 불러오는 중 오류가 발생했습니다.",
      );
    }

    return rejectWithValue("기사 목록을 불러오는 중 오류가 발생했습니다.");
  }
});

export const deleteUserNews = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("userNews/deleteUserNews", async (newsId, { rejectWithValue }) => {
  try {
    await api.delete<ApiResponse<null>>(`/user/news/${newsId}`);
    return newsId;
  } catch (error) {
    if (isApiError(error) && error.isUserError) {
      return rejectWithValue(error.message || "기사 삭제 실패");
    }

    return rejectWithValue("기사 삭제에 실패했습니다.");
  }
});

const userNewsSlice = createSlice({
  name: "userNews",
  initialState,
  reducers: {
    clearUserNewsErrors(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userNews = action.payload.data;
        state.pagination = action.payload.pagination ?? null;
        state.error = null;
      })
      .addCase(getUserNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "저장한 기사 목록을 불러오지 못했습니다.";
      })
      .addCase(deleteUserNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userNews = state.userNews.filter(
          (news) => news._id !== action.payload,
        );
        state.error = null;
      })
      .addCase(deleteUserNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "기사 삭제에 실패했습니다.";
      });
  },
});

export const { clearUserNewsErrors } = userNewsSlice.actions;

export default userNewsSlice.reducer;
