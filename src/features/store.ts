import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import wordReducer from "./word/wordSlice";
import newsReducer from "./news/newsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    word: wordReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
