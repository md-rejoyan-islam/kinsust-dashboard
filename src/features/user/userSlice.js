import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  allUsers,
  banUser,
  unbannedUser,
  updateUser,
  updateUserRole,
} from "./userApiSlice";

// initial state
export const initialState = {
  users: [],
  error: null,
  message: null,
  pagination: null,
  loading: true,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // all users
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      // add user
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.users = [...state.users, action.payload.data];
      })

      // update user
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.users[
          state.users.findIndex((user) => user.id === action.payload.data.id)
        ] = action.payload.data;
      })

      // banned user
      .addCase(banUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(banUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.users[
          state.users.findIndex((user) => user.id === action.payload.data.id)
        ] = action.payload.data;
      })

      // unbanned user
      .addCase(unbannedUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(unbannedUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.users[
          state.users.findIndex((user) => user.id === action.payload.data.id)
        ] = action.payload.data;
      })

      // role update
      .addCase(updateUserRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.users[
          state.users.findIndex((user) => user.id === action.payload.data.id)
        ] = action.payload.data;
      });
  },
});

// selectors
// export const getAuthData = (state) => state.auth;

// actions
export const { setMessageEmpty } = usersSlice.actions;

// exports
export default usersSlice.reducer;
