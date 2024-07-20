import { createSlice } from "@reduxjs/toolkit";
import {
  allAdvisorsPhoto,
  allPostPhoto,
  allProgramsPhoto,
  allUsersPhoto,
} from "./galleryApiSlice";

// initial state
export const initialState = {
  programs: [],
  posts: [],
  users: [],
  advisors: [],
  loading: true,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  extraReducers: (builder) => {
    builder
      // all program photo
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
      // all post photo
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
      // all advisors photo
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
      // all users photo
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
export default gallerySlice.reducer;
