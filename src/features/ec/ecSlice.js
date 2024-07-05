import { createSlice, current } from "@reduxjs/toolkit";
import {
  addEc,
  addMemberToEc,
  allEc,
  deleteEc,
  removeMemberFromEc,
  singleEcData,
  updateEc,
  updateMemberFromEc,
} from "./ecApiSlice";

// initial state
export const initialState = {
  ec: [],
  error: null,
  message: null,
  singleEc: {},
  loading: true,
};

const newsSlice = createSlice({
  name: "ecs",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all ec
      .addCase(allEc.pending, (state) => {
        state.loading = true;
      })
      .addCase(allEc.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(allEc.fulfilled, (state, action) => {
        state.ec = action.payload.data;
        state.loading = false;
      })

      // add ec
      .addCase(addEc.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addEc.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.ec.push(action.payload.data);
      })

      //delete ec
      .addCase(deleteEc.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteEc.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.ec = state.ec.filter((ec) => ec.id !== action.payload.data.id);
      })

      // update ec
      .addCase(updateEc.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateEc.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.ec[state.ec.findIndex((ec) => ec.id === action.payload.data.id)] =
          action.payload.data;
      })

      // add member to ec
      .addCase(addMemberToEc.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addMemberToEc.fulfilled, (state, action) => {
        state.message = action.payload.data.message;

        const index = state.ec.findIndex(
          (item) => item.id === action.payload.data.data.id
        );

        state.ec[index] = action.payload.data.data;
      })

      // single ec data
      .addCase(singleEcData.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleEcData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(singleEcData.fulfilled, (state, action) => {
        state.singleEc = action.payload.data;
        state.loading = false;
      })

      // remove member from ec
      .addCase(removeMemberFromEc.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeMemberFromEc.fulfilled, (state, action) => {
        state.ec[state.ec.findIndex((ec) => ec.id === action.payload.data.id)] =
          action.payload.data;
      })

      // update member from ec
      .addCase(updateMemberFromEc.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateMemberFromEc.fulfilled, (state, action) => {
        state.ec = current(state.ec).map((ec) => {
          if (ec.id === action.payload.data.id) {
            return action.payload.data;
          }
          return ec;
        });
      });
  },
});

// selectors

// actions
export const { setMessageEmpty } = newsSlice.actions;

// exports
export default newsSlice.reducer;
