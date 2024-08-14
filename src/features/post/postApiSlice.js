import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const ApiURL = import.meta.env.VITE_SERVER_URL;

// create post
export const createPost = createAsyncThunk("post/createPost", async (data) => {
  try {
    const response = await axios.post(`${ApiURL}/api/v1/posts`, data, {
      withCredentials: true,
    });
    toast.success(response?.data?.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    throw new Error(error.response.data.error.message);
  }
});

// update post data
export const updatePost = createAsyncThunk("post/updatePost", async (data) => {
  try {
    const id = data.get("id");

    const response = await axios.patch(`${ApiURL}/api/v1/posts/${id}`, data, {
      withCredentials: true,
    });
    toast.success(response?.data?.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    throw new Error(error.response.data.error.message);
  }
});

// delete post data
export const deletePost = createAsyncThunk("post/deletePost", async (slug) => {
  try {
    const response = await axios.delete(`${ApiURL}/api/v1/posts/${slug}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// all posts
export const allPosts = createAsyncThunk("post/allPosts", async (query) => {
  try {
    const response = await axios.get(
      `${ApiURL}/api/v1/posts?sort=-date${query ? "&" + query : ""}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});
