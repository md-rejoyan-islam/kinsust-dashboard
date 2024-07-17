import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const ApiURL = import.meta.env.VITE_SERVER_URL;

export const getAdmins = createAsyncThunk("roles/getAdmins", async () => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/users?role=admin`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

export const getSuperAdmins = createAsyncThunk(
  "roles/getSuperAdmins",
  async () => {
    try {
      const response = await axios.get(
        `${ApiURL}/api/v1/users?role=superAdmin`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// password update
export const updatePasswordBySuperAdmin = createAsyncThunk(
  "roles/updatePasswordBySuperAdmin",
  async (data) => {
    try {
      const response = await axios.patch(
        `${ApiURL}/api/v1/users/update-password/${data.id}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// role update
export const updateRole = createAsyncThunk("roles/updateRole", async (data) => {
  try {
    const response = await axios.patch(
      `${ApiURL}/api/v1/users/update-role-by-email`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(response?.data?.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    throw new Error(error.response.data.error.message);
  }
});

// remove from admin
export const removeFromAdmin = createAsyncThunk(
  "roles/removeFromAdmin",
  async (data) => {
    try {
      const response = await axios.patch(
        `${ApiURL}/api/v1/users/update-role-by-email`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      throw new Error(error.response.data.error.message);
    }
  }
);
