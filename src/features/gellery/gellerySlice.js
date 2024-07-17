import { createSlice } from "@reduxjs/toolkit";
import {
  allAdvisorsPhoto,
  allPostPhoto,
  allProgramsPhoto,
  allUsersPhoto,
} from "./gelleryApiSlice";

// initial state
export const initialState = {
  programs: [],
  posts: [],
  users: [],
  advisors: [],
  loading: true,
};

const gellerySlice = createSlice({
  name: "gellery",
  initialState,
  extraReducers: (builder) => {
    builder

      // program
      .addCase(allProgramsPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProgramsPhoto.rejected, (state) => {
        state.loading = false;
      })
      .addCase(allProgramsPhoto.fulfilled, (state, action) => {
        state.programs = action.payload.images;
        state.loading = false;
      })
      // post
      .addCase(allPostPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(allPostPhoto.rejected, (state) => {
        state.loading = false;
      })
      .addCase(allPostPhoto.fulfilled, (state, action) => {
        state.posts = action.payload.images;
        state.loading = false;
      })
      // advisors
      .addCase(allAdvisorsPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(allAdvisorsPhoto.rejected, (state) => {
        state.loading = false;
      })
      .addCase(allAdvisorsPhoto.fulfilled, (state, action) => {
        state.advisors = action.payload.images;
        state.loading = false;
      })
      // users
      .addCase(allUsersPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUsersPhoto.rejected, (state) => {
        state.loading = false;
      })
      .addCase(allUsersPhoto.fulfilled, (state, action) => {
        state.users = action.payload.images;
        state.loading = false;
      });
  },
});

// selectors

// exports
export default gellerySlice.reducer;
