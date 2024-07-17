import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const ApiURL = import.meta.env.VITE_SERVER_URL;

//  user login
export const userLogin = createAsyncThunk("auth/userLogin", async (data) => {
  const { setLoading } = data;
  try {
    const response = await axios.post(
      `${ApiURL}/api/v1/auth/dashboard-login`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(response?.data?.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    if (
      error?.response?.data ===
      "Too many requests from this IP, please try again in after 10 min!"
    ) {
      toast.error(error.response.data);
    }
    throw new Error(error.response.data.error.message);
  } finally {
    setLoading(false);
  }
});

// logout  user
export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  try {
    const response = await axios.post(
      `${ApiURL}/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// logged in user
export const loggedInUser = createAsyncThunk("auth/loggedInUser", async () => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});
