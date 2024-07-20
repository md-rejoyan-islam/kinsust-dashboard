import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const ApiURL = import.meta.env.VITE_SERVER_URL;

// get all advisors
export const getAllAdvisors = createAsyncThunk(
  "advisor/getAllAdvisors",
  async () => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/advisors`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// create advisor
export const createAdvisor = createAsyncThunk(
  "advisor/createAdvisor",
  async (data) => {
    try {
      const response = await axios.post(`${ApiURL}/api/v1/advisors`, data, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      throw new Error(error.response.data.error.message);
    }
  }
);

// update advisor data
export const updateAdvisor = createAsyncThunk(
  "advisor/updateAdvisor",
  async (data) => {
    try {
      const { id } = Object.fromEntries(data);

      const response = await axios.patch(
        `${ApiURL}/api/v1/advisors/${id}`,
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

// delete advisor data
export const deleteAdvisor = createAsyncThunk(
  "advisor/deleteAdvisor",
  async (id) => {
    try {
      const response = await axios.delete(`${ApiURL}/api/v1/advisors/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);
