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
      .addCase(createProgram.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.programs.data.push(action.payload.data);
      })

      // update program data
      .addCase(updateProgram.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.programs.data[
          state.programs.data.findIndex(
            (program) => program.id === action.payload.data.id
          )
        ] = action.payload.data;
      })

      // delete program data
      .addCase(deleteProgram.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.programs = {
          ...state.programs,
          data: state.programs.data.filter(
            (program) => program.id !== action.payload.data.id
          ),
        };
      })

      // all program
      .addCase(getAllProgram.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllProgram.fulfilled, (state, action) => {
        state.programs = action.payload;
      });
  },
});

// selectors

// actions
export const { setMessageEmpty } = programSlice.actions;

// exports
export default programSlice.reducer;
