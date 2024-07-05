// create auth slice
import { createSlice } from "@reduxjs/toolkit";
import {
  createOrgData,
  getAllOrgData,
  singleOrgData,
} from "./organizationApiSlice";
import { deleteOrgData, updateOrgData } from "./organizationApiSlice";

const organizationsSlice = createSlice({
  name: "organizations",
  initialState: {
    orgMembers: [],
    error: null,
    message: null,
    singleOrg: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all organization member data
      .addCase(getAllOrgData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllOrgData.fulfilled, (state, action) => {
        state.orgMembers = action.payload.data;
      })

      // create organization member data
      .addCase(createOrgData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createOrgData.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.orgMembers = [...state.orgMembers, action.payload.data];
      })

      // find single organization member data
      .addCase(singleOrgData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(singleOrgData.fulfilled, (state, action) => {
        state.singleOrg = action.payload.data;
      })

      // update organization member data
      .addCase(updateOrgData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateOrgData.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.orgMembers[
          state.orgMembers.findIndex((org) => org.id === action.payload.data.id)
        ] = action.payload.data;
      })

      // delete organization member data
      .addCase(deleteOrgData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteOrgData.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.orgMembers = state.orgMembers.filter(
          (org) => org.id !== action.payload.data.id
        );
      });
  },
});

// selectors
export const getProgramsData = (state) => state.advisors;

// actions
export const { setMessageEmpty } = organizationsSlice.actions;
// exports
export default organizationsSlice.reducer;
