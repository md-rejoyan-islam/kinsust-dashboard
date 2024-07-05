import { createSlice } from "@reduxjs/toolkit";
import {
  createSlider,
  deleteSlider,
  getAllSlider,
  updateSlider,
} from "./sliderApiSlice";

// initial state
export const initialState = {
  slider: localStorage.getItem("slider")
    ? JSON.parse(localStorage.getItem("slider"))
    : null,
  error: null,
  message: null,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create slider
      .addCase(createSlider.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createSlider.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.slider = [...state.slider, action.payload.data];
      })

      // update slider data
      .addCase(updateSlider.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateSlider.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.slider[
          state.slider.findIndex((data) => data.id === action.payload.data.id)
        ] = action.payload.data;
      })

      // delete slider data
      .addCase(deleteSlider.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.slider = state.slider.filter(
          (data) => data.id !== action.payload.data.id
        );
      })

      // all slider
      .addCase(getAllSlider.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllSlider.fulfilled, (state, action) => {
        state.slider = action.payload.data;
      });
  },
});

// selectors

// actions
export const { setMessageEmpty } = sliderSlice.actions;

// exports
export default sliderSlice.reducer;
