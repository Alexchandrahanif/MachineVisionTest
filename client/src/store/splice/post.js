import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Swal from "sweetalert2";

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
    if (page) option = `page=${page}`;
    if (search && page) option = `page=${page}&search=${search}`;
    let { data } = await axios.get(`http://localhost:3000/post?` + option, {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    dispatch(setPosts(data));
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    let { data } = await axios.get(`http://localhost:3000/post/${id}`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const editPost = (id, posting, page) => async (dispatch) => {
  try {
    let { data } = await axios.put(
      `http://localhost:3000/post/${id}`,
      posting,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    if (data) dispatch(getAllMyPosts(page));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Edit Post Success!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.response.data.message,
    });
  }
};

export const getAllMyPosts = (page, search) => async (dispatch) => {
  try {
    let option = "";
    if (search) option = `&search=${search}`;
    if (page) option = `page=${page}`;
    if (search && page) option = `page=${page}&search=${search}`;
    const id = localStorage.getItem("userId");
    let { data } = await axios.get(
      `http://localhost:3000/post/user/${id}?` + option,
      {
        headers: { access_token: localStorage.getItem("access_token") },
      }
    );
    dispatch(setMyPosts(data));
  } catch (error) {
    console.log(error);
  }
};

export const createNewPost = (posting, page) => async (dispatch) => {
  try {
    let { data } = await axios.post(`http://localhost:3000/post`, posting, {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    if (data) dispatch(getAllMyPosts(page));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Create Post Success!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.response.data.message,
    });
  }
};

export const deletePost = (id, page) => async (dispatch) => {
  try {
    let { data } = await axios.delete(`http://localhost:3000/post/${id}`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    if (data) dispatch(getAllMyPosts(page));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.response.data.message,
    });
  }
};

export const selectPosts = (state) => state.post.posts;
export const selectMyPosts = (state) => state.post.myPosts;
export const selectPost = (state) => state.post.post;

export default postSlice.reducer;
