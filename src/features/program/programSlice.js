import { createSlice } from "@reduxjs/toolkit";
import {
  createProgram,
  deleteProgram,
  getAllProgram,
  updateProgram,
} from "./programApiSlice";

// initial state
export const initialState = {
  programs: { data: [], pagination: {} },
  error: null,
  message: null,
  loading: true,
};

const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create program
      .addCase(createProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.programs.data.push(action.payload.data);
        state.loading = false;
      })

      // update program data
      .addCase(updateProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.programs.data[
          state.programs.data.findIndex(
            (program) => program.id === action.payload.data.id
          )
        ] = action.payload.data;
      })

      // delete program data
      .addCase(deleteProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.programs = {
          ...state.programs,
          data: state.programs.data.filter(
            (program) => program.id !== action.payload.data.id
          ),
        };
      })

      // all program
      .addCase(getAllProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
      });
  },
});

// actions
export const { setMessageEmpty } = programSlice.actions;

// exports
export default programSlice.reducer;
