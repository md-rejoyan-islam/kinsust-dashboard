import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const ApiURL = import.meta.env.VITE_SERVER_URL;

// get all subscribers
export const getSubscribers = createAsyncThunk(
  "subscriber/getSubscribers",
  async (query) => {
    try {
      const response = await axios.get(
        `${ApiURL}/api/v1/subscribers${query ? query : ""}`,
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

// delete subscriber
export const deleteSubscriber = createAsyncThunk(
  "subscriber/deleteSubscriber",
  async (id) => {
    try {
      const response = await axios.delete(
        `${ApiURL}/api/v1/subscribers/${id}`,
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

// update subscriber
export const updateSubscriber = createAsyncThunk(
  "subscriber/updateSubscriber",
  async (data) => {
    try {
      const response = await axios.patch(
        `${ApiURL}/api/v1/subscribers/${data.id}`,
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
