import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import {
  isApiError,
  type ApiResponse,
  type Pagination,
} from "../../types/api.types";
import type { NewsDetailData, NewsState, News } from "./news.types";
import { showToast } from "../toast/toastSlice"; // 토스트 액션 임포트

// 전체 뉴스 가져오기
export const fetchArticles = createAsyncThunk<
  { articles: News[]; pagination: Pagination },
  { page: number; limit: number; keyword?: string; level?: string },
  { rejectValue: string }
>(
  "news/fetchArticles",
  async ({ page, limit, keyword, level }, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<News[]>>("/news", {
        params: {
          page,
          limit,
          ...(keyword ? { keyword } : {}),
          ...(level ? { level } : {}),
        },
      });

      const articles = response.data?.data;
      const pagination = response.data?.pagination;

      if (!articles || !pagination) {
        return rejectWithValue("뉴스 정보를 찾을 수 없습니다.");
      }

      return { articles, pagination };
    } catch (error) {
      if (isApiError(error) && error.isUserError) {
        return rejectWithValue(
          error.message || "뉴스 정보를 가져오는 중 오류가 발생했습니다.",
        );
      }
      return rejectWithValue("뉴스 정보를 가져오는 중 오류가 발생했습니다.");
    }
  },
);

// 뉴스 상세 정보 가져오기
export const fetchNewsDetail = createAsyncThunk<
  NewsDetailData,
  { newsId: string },
  { rejectValue: string }
>("news/fetchNewsDetail", async ({ newsId }, { rejectWithValue }) => {
  try {
    const response = await api.get<ApiResponse<NewsDetailData>>(
      `/news/${newsId}`,
    );

    const result = response.data?.data;

    if (!result || !result.news) {
      return rejectWithValue("뉴스 상세 정보를 찾을 수 없습니다.");
    }
    return result;
  } catch (error) {
    if (isApiError(error) && error.isUserError) {
      return rejectWithValue(
        error.message || "뉴스 상세 정보를 가져오는 중 오류가 발생했습니다.",
      );
    }
    return rejectWithValue("뉴스 상세 정보를 가져오는 중 오류가 발생했습니다.");
  }
});

// 단어 저장 시 성공/실패 토스트 추가
export const saveUserWords = createAsyncThunk<
  void,
  { wordIds: string[] },
  { rejectValue: string }
>("news/saveUserWords", async ({ wordIds }, { rejectWithValue, dispatch }) => {
  try {
    await api.post("/user/words", { wordIds });
    // 성공 시 토스트 표시
    dispatch(
      showToast({
        message: "단어가 내 단어장에 저장되었습니다.",
        type: "success",
        position: "right-top",
      }),
    );
  } catch (error) {
    const errorMsg =
      isApiError(error) && error.isUserError
        ? error.message || "단어 저장 중 오류가 발생했습니다."
        : "단어 저장 중 오류가 발생했습니다.";

    // 실패 시 토스트 표시
    dispatch(
      showToast({ message: errorMsg, type: "error", position: "right-top" }),
    );
    return rejectWithValue(errorMsg);
  }
});

export const saveUserArticle = createAsyncThunk<
  void,
  { newsId: string },
  { rejectValue: string }
>("news/saveUserArticle", async ({ newsId }, { rejectWithValue, dispatch }) => {
  try {
    await api.post(`/user/news/${newsId}`);
    dispatch(
      showToast({
        message: "기사가 저장되었습니다.",
        type: "success",
        position: "right-top",
      }),
    );
  } catch (error) {
    const errorMsg =
      isApiError(error) && error.isUserError
        ? error.message || "기사 저장 중 오류가 발생했습니다."
        : "기사 저장 중 오류가 발생했습니다.";

    dispatch(
      showToast({ message: errorMsg, type: "error", position: "right-top" }),
    );
    return rejectWithValue(errorMsg);
  }
});

const initialState: NewsState = {
  currentNews: null,
  currentWords: [],
  currentAbbreviations: [],
  articles: [],
  pagination: null,
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsDetail(state) {
      state.currentNews = null;
      state.currentWords = [];
      state.currentAbbreviations = [];
      state.articles = [];
      state.pagination = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentNews = action.payload.news;
        state.currentWords = action.payload.words;
        state.currentAbbreviations = action.payload.abbreviations;
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "뉴스 상세 정보를 가져오는 중 오류가 발생했습니다.";
      })
      .addCase(saveUserWords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveUserWords.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveUserWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "단어 저장 중 오류가 발생했습니다.";
      })
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
        state.pagination = action.payload.pagination || undefined;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "뉴스 정보를 가져오는 중 오류가 발생했습니다.";
      })
      .addCase(saveUserArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveUserArticle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveUserArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "기사 저장 중 오류가 발생했습니다.";
      });
  },
});

export const { clearNewsDetail } = newsSlice.actions;
export default newsSlice.reducer;
