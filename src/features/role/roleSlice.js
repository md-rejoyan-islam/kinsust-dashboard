import { createSlice } from "@reduxjs/toolkit";
import {
  getAdmins,
  getSuperAdmins,
  removeFromAdmin,
  updateRole,
} from "./roleApiSlice";

// initial state
export const initialState = {
  admins: [],
  superAdmins: [],
  error: null,
  message: null,
  loading: true,
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all admins
      .addCase(getAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmins.rejected, (state) => {
        state.loading = false;
        state.admins = [];
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.data;
      })
      //get all superadmin
      .addCase(getSuperAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSuperAdmins.rejected, (state) => {
        state.loading = false;
        state.superAdmins = [];
      })
      .addCase(getSuperAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.superAdmins = action.payload.data;
      })
      // update role
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRole.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.admins =
          action.payload.data.role === "admin"
            ? [...state.admins, action.payload.data]
            : state.admins;
      })
      // remove from admin
      .addCase(removeFromAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromAdmin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeFromAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload.data.id
        );
      });
  },
});

// actions
export const { setMessageEmpty } = roleSlice.actions;

// exports
export default roleSlice.reducer;
