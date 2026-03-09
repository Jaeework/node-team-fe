import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import { isApiError, type ApiResponse } from "../../types/api.types";
import type { UserWord } from "../../types/word.types"; // WordState 타입도 types에 있다고 가정

interface WordState {
  userWords: UserWord[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WordState = {
  userWords: [],
  isLoading: false,
  error: null,
};

export const getMyWords = createAsyncThunk<
  UserWord[],
  { q?: string; status?: string; sort?: string } | void,
  { rejectValue: string }
>("word/getMyWords", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<UserWord[]>>("/user/words", {
      params: params || {},
    });

    const data = res.data.data;

    if (!data) {
      return rejectWithValue("단어장 데이터를 불러올 수 없습니다.");
    }

    return data;
  } catch (error) {
    if (isApiError(error) && error.isUserError) {
      return rejectWithValue(
        error.message || "단어장을 불러오는 중 오류가 발생했습니다.",
      );
    }
    return rejectWithValue("단어장을 불러오는 중 오류가 발생했습니다.");
  }
});

const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    clearWordErrors(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyWords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userWords = action.payload; // Postman에서 본 그 배열이 여기 꽂힘!
        state.error = null;
      })
      .addCase(getMyWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "단어장을 불러오지 못했습니다.";
      });
  },
});

export const { clearWordErrors } = wordSlice.actions;
export default wordSlice.reducer;
