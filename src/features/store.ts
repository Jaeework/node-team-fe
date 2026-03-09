import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import wordReducer from "./word/wordSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    word: wordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
