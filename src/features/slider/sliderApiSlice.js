import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiURL from "../../components/apiURL/ApiURL";

// get all slider
export const getAllSlider = createAsyncThunk(
  "slider/getAllSlider",
  async () => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/sliders`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// create slider
export const createSlider = createAsyncThunk(
  "slider/createSlider",
  async (data) => {
    try {
      const response = await axios.post(
        `${ApiURL}/api/v1/sliders`,
        data,
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

// update slider data
export const updateSlider = createAsyncThunk(
  "slider/updateSlider",
  async (data) => {
    try {
      const {id}=Object.fromEntries(data.entries())
      const response = await axios.patch(
         `${ApiURL}/api/v1/sliders/${id}`,
        data,
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

// delete slider data
export const deleteSlider = createAsyncThunk(
  "slider/deleteSlider",
  async (id) => {
    try {
      const response = await axios.delete(
        `${ApiURL}/api/v1/sliders/${id}`,
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
