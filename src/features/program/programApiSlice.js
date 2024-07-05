import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const ApiURL = import.meta.env.VITE_SERVER_URL;

// get all program
export const getAllProgram = createAsyncThunk(
  "program/getAllProgram",
  async (query) => {
    try {
      const response = await axios.get(
        `${ApiURL}/api/v1/programs?sort=-start_date&${query}`,
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

// create program
export const createProgram = createAsyncThunk(
  "program/createProgram",
  async (data) => {
    try {
      const response = await axios.post(`${ApiURL}/api/v1/programs`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// update program data
export const updateProgram = createAsyncThunk(
  "program/updateProgram",
  async (data) => {
    const { id } = Object.fromEntries(data);
    try {
      const response = await axios.patch(
        `${ApiURL}/api/v1/programs/${id}`,
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

// delete program data
export const deleteProgram = createAsyncThunk(
  "program/deleteProgram",
  async (id) => {
    try {
      const response = await axios.delete(`${ApiURL}/api/v1/programs/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);
