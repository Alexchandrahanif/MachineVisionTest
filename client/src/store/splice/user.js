import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  users: [],
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;

export const getAllUser = () => async (dispatch) => {
  try {
    let { data } = await axios.get(`http://localhost:3000/user`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    dispatch(setUsers(data));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = () => async (dispatch) => {
  try {
    let id = localStorage.getItem("userId");
    let { data } = await axios.get(`http://localhost:3000/user/${id}`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    // dispatch(setUser(data.data));
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = (dataDiri) => async (dispatch) => {
  Swal.fire({
    text: "Are you sure want to update this data?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let id = localStorage.getItem("userId");
        let { data } = await axios.put(
          `http://localhost:3000/user/${id}`,
          dataDiri,
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        dispatch(setUser(data));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit User Success!",
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
    }
  });
};

export const selectUsers = (state) => state.user.users;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
