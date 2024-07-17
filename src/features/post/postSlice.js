import { createSlice } from "@reduxjs/toolkit";
import { allPosts, createPost, deletePost, updatePost } from "./postApiSlice";
// initial state
export const initialState = {
  posts: { data: [], pagination: {} },
  error: null,
  message: null,
  loading: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.posts.data = [...state.posts.data, action.payload.data];
        state.loading = false;
      })

      // update post data
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.posts.data[
          state.posts.data.findIndex(
            (post) => post.id === action.payload.data.id
          )
        ] = action.payload.data;
      })

      // delete post data
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.posts.data = state.posts.data.filter(
          (post) => post.id !== action.payload.data.id
        );
      })

      // all post
      .addCase(allPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(allPosts.rejected, (state) => {
        // state.error = action.error.message;
        state.loading = false;
      })
      .addCase(allPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      });
  },
});

// selectors

// actions
export const { setMessageEmpty } = postSlice.actions;

// exports
export default postSlice.reducer;
