import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = import.meta.env.VITE_SERVER_URL;

// all programs photo
export const allProgramsPhoto = createAsyncThunk(
  "gellery/allProgramsPhoto",
  async () => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/images/programs`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// all post photo
export const allPostPhoto = createAsyncThunk(
  "gellery/allPostPhoto",
  async () => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/images/posts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// all advisors photo
export const allAdvisorsPhoto = createAsyncThunk(
  "gellery/allAdvisorsPhoto",
  async () => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/images/advisors`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// all users photo
export const allUsersPhoto = createAsyncThunk(
  "gellery/allUsersPhoto",
  async () => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/images/users`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);
