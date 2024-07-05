import { createSlice } from "@reduxjs/toolkit";
import { allNews, createNews, deleteNews, updateNews } from "./newsApiSlice";
// initial state
export const initialState = {
  news: null,
  error: null,
  message: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create news
      .addCase(createNews.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.news = action.payload.data;
      })

      // update news data
      .addCase(updateNews.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.news = action.payload.data;
      })

      // delete news data
      .addCase(deleteNews.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(deleteNews.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.news = action.payload.data;
      })

      // all news
      .addCase(allNews.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(allNews.fulfilled, (state, action) => {
        state.news = action.payload.data;
      });
  },
});

// selectors

// actions
export const { setMessageEmpty } = newsSlice.actions;

// exports
export default newsSlice.reducer;
