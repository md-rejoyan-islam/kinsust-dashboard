import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create news
export const createNews = createAsyncThunk("news/createNews", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/news",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// update news data
export const updateNews = createAsyncThunk("news/updateNews", async (data) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/v1/news/${data.id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// delete news data
export const deleteNews = createAsyncThunk("news/deleteNews", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/news/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// all news
export const allNews = createAsyncThunk("news/allNews", async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/news", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});
