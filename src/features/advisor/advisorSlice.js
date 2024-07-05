import { createSlice } from "@reduxjs/toolkit";
import {
  createAdvisor,
  deleteAdvisor,
  getAllAdvisors,
  updateAdvisor,
} from "./advisorApiSlice";

// initial state
export const initialState = {
  advisors: [],
  error: null,
  message: null,
};

const advisorSlice = createSlice({
  name: "advisor",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // all advisors
      .addCase(getAllAdvisors.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllAdvisors.fulfilled, (state, action) => {
        state.advisors = action.payload.data;
      })

      // create advisor
      .addCase(createAdvisor.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createAdvisor.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.advisors = [...state.advisors, action.payload.data];
      })

      // update advisor data
      .addCase(updateAdvisor.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateAdvisor.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.advisors[
          state.advisors.findIndex(
            (advisor) => advisor.id === action.payload.data.id
          )
        ] = action.payload.data;
      })

      // delete advisor data
      .addCase(deleteAdvisor.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteAdvisor.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.advisors = state.advisors.filter(
          (advisor) => advisor.id !== action.payload.data.id
        );
      });
  },
});

// selectors

// actions
export const { setMessageEmpty } = advisorSlice.actions;

// exports
export default advisorSlice.reducer;
