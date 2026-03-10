import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import { isApiError, type ApiResponse } from "../../types/api.types";
import type { NewsDetailData, NewsState } from "./news.types";

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

export const saveUserWords = createAsyncThunk<
  void,
  { wordIds: string[] },
  { rejectValue: string }
>("news/saveUserWords", async ({ wordIds }, { rejectWithValue }) => {
  try {
    await api.post("/user/words", { wordIds });
  } catch (error) {
    if (isApiError(error) && error.isUserError) {
      return rejectWithValue(
        error.message || "단어 저장 중 오류가 발생했습니다.",
      );
    }
    return rejectWithValue("단어 저장 중 오류가 발생했습니다.");
  }
});

const initialState: NewsState = {
  currentNews: null,
  currentWords: [],
  currentAbbreviations: [],
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
      });
  },
});

export const { clearNewsDetail } = newsSlice.actions;
export default newsSlice.reducer;
