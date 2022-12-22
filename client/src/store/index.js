import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../store/splice/post";
export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
