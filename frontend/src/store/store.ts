import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/Auth/AuthSlice";
import postReducer from "../slice/post/PostSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
