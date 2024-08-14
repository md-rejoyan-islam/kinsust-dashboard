import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const ApiURL = import.meta.env.VITE_SERVER_URL;

// all  users
export const allUsers = createAsyncThunk("users/allUsers", async (query) => {
  try {
    const response = await axios.get(
      `${ApiURL}/api/v1/users?${query ? query : ""}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// add user
export const addUser = createAsyncThunk("users/addUser", async (data) => {
  try {
    const response = await axios.post(`${ApiURL}/api/v1/users`, data, {
      withCredentials: true,
    });
    toast.success(response?.data?.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    throw new Error(error.response.data.error.message);
  }
});

// ban user
export const banUser = createAsyncThunk("users/bannedUser", async (id) => {
  try {
    const response = await axios.patch(
      `${ApiURL}/api/v1/users/ban/${id}`,
      {},
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

// unbanned user
export const unbannedUser = createAsyncThunk(
  "users/unbannedUser",
  async (id) => {
    try {
      const response = await axios.patch(
        `${ApiURL}/api/v1/users/unban/${id}`,
        {},
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

// update user
export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
  try {
    const { id } = Object.fromEntries(data.entries());

    const response = await axios.patch(`${ApiURL}/api/v1/users/${id}`, data, {
      withCredentials: true,
    });
    toast.success(response?.data?.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    throw new Error(error.response.data.error.message);
  }
});

// update user role
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async (data) => {
    const { id } = data;
    try {
      const response = await axios.patch(
        `${ApiURL}/api/v1/users/role-update/${id}`,
        { role: data.role },
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

// get user by email
export const getUserByEmail = createAsyncThunk(
  "users/getUserByEmail",
  async (email) => {
    try {
      const response = await axios.get(
        `${ApiURL}/api/v1/users?email=${email}`,
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
