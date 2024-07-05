import { createSlice } from "@reduxjs/toolkit";
import { allPosts, createPost, deletePost, updatePost } from "./postApiSlice";
// initial state
export const initialState = {
  posts: { data: [], pagination: {} },
  error: null,
  message: null,
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
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.posts.data = [...state.posts.data, action.payload.data];
      })

      // update post data
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.posts.data[
          state.posts.data.findIndex(
            (post) => post.id === action.payload.data.id
          )
        ] = action.payload.data;
      })

      // delete post data
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.posts.data = state.posts.data.filter(
          (post) => post.id !== action.payload.data.id
        );
      })

      // all post
      .addCase(allPosts.rejected, (state, action) => {
        // state.error = action.error.message;
      })
      .addCase(allPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      });
  },
});

// selectors

// actions
export const { setMessageEmpty } = postSlice.actions;

// exports
export default postSlice.reducer;
