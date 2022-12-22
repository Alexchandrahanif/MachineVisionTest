import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  myPosts: [],
  post: {},
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
  },
});

export const { setPosts, setPost, setMyPosts } = postSlice.actions;

export const getAllPosts = (page, search) => async (dispatch) => {
  try {
    let option = "";
    if (search) option = `&search=${search}`;
    let { data } = await axios.get(
      `http://localhost:3000/post?page=${page}` + option,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    dispatch(setPosts(data));
  } catch (error) {
    console.log(error);
  }
};

export const getAllMyPosts = (page, search) => async (dispatch) => {
  try {
    let option = "";
    if (search) option = `&search=${search}`;
    let { data } = await axios.get(
      `http://localhost:3000/post?page=${page}` + option,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    dispatch(setMyPosts(data));
  } catch (error) {
    console.log(error);
  }
};

export const createNewPost = (posting) => async (dispatch) => {
  console.log(posting, "data brooo");
  try {
    let { data } = await axios.post(`http://localhost:3000/post`, posting, {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    if (data) dispatch(getAllMyPosts(1));
  } catch (error) {
    console.log(error);
  }
};

export const selectPosts = (state) => state.post.posts;
export const selectMyPosts = (state) => state.post.myPosts;
export const selectPost = (state) => state.post.post;

export default postSlice.reducer;
