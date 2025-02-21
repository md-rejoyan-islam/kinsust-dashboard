import { createSlice } from "@reduxjs/toolkit";
import { loggedInUser, userLogin, userLogout } from "./authApiSlice";

// initial state
export const initialState = {
  user: localStorage?.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  message: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      // logout
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("user");
      })

      // logged in user
      .addCase(loggedInUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(loggedInUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.message = null;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      });
  },
});

// selectors
export const getAuthData = (state) => state.auth;

// actions
export const { setMessageEmpty } = authSlice.actions;

// exports
export default authSlice.reducer;
