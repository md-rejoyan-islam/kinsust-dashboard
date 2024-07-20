import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const ApiURL = import.meta.env.VITE_SERVER_URL;

// all ec data
export const allEc = createAsyncThunk("ecs/allEc", async (_, { dispatch }) => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/ec`, {
      withCredentials: true,
    });

    dispatch(
      singleEcData(response.data.data[response.data.data.length - 1].id)
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// add ec data
export const addEc = createAsyncThunk("ecs/addEc", async (data) => {
  try {
    const response = await axios.post(`${ApiURL}/api/v1/ec`, data, {
      withCredentials: true,
    });
    toast.success(response?.data?.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error?.message);
    throw new Error(error.response.data.error.message);
  }
});

// update ec data
export const updateEc = createAsyncThunk("ecs/updateEc", async (data) => {
  try {
    const response = await axios.patch(
      `${ApiURL}/api/v1/ec/${data.id}`,
      data.data,
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

// delete ec data
export const deleteEc = createAsyncThunk("ecs/deleteEc", async (id) => {
  try {
    const response = await axios.delete(`${ApiURL}/api/v1/ec/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// add member to ec
export const addMemberToEc = createAsyncThunk(
  "ecs/addMemberToEc",
  async (data) => {
    try {
      const response = await axios.post(
        `${ApiURL}/api/v1/ec/member-add-in-ec`,
        data.data,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      return {
        data: response.data,
        id: data.id,
      };
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      throw new Error(error.response.data.error.message);
    }
  }
);

// find ec data by id
export const singleEcData = createAsyncThunk("ecs/singleEcData", async (id) => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/ec/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// delete member by id from ec
export const removeMemberFromEc = createAsyncThunk(
  "ecs/removeMemberFromEc",
  async (id) => {
    try {
      const response = await axios.delete(
        `${ApiURL}/api/v1/ec/remove-member/${id}`,

        {
          withCredentials: true,
        }
      );
      return {
        data: response.data,
        itemId: id,
      };
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// update member by id from ec
export const updateMemberFromEc = createAsyncThunk(
  "ecs/updateMemberFromEc",
  async (data) => {
    try {
      const response = await axios.patch(
        `${ApiURL}/api/v1/ec/update-member/${data.id}`,
        {
          ...data.data,
        },
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
