import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../store/splice/post";
import userReducer from "../store/splice/user";
export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});
