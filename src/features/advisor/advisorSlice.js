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
  loading: true,
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
        state.loading = false;
      })
      .addCase(getAllAdvisors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAdvisors.fulfilled, (state, action) => {
        state.advisors = action.payload.data;
        state.loading = false;
      })

      // create advisor
      .addCase(createAdvisor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdvisor.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createAdvisor.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.advisors = [...state.advisors, action.payload.data];
      })

      // update advisor data
      .addCase(updateAdvisor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdvisor.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateAdvisor.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.advisors[
          state.advisors.findIndex(
            (advisor) => advisor.id === action.payload.data.id
          )
        ] = action.payload.data;
      })

      // delete advisor data
      .addCase(deleteAdvisor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdvisor.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteAdvisor.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.advisors = state.advisors.filter(
          (advisor) => advisor.id !== action.payload.data.id
        );
      });
  },
});

// actions
export const { setMessageEmpty } = advisorSlice.actions;

// exports
export default advisorSlice.reducer;
