import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiURL from "../../components/apiURL/ApiURL";


// get all organization member  data
export const getAllOrgData = createAsyncThunk(
  "orgMembersData/getAllOrgData",
  async () => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/org-members`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// create organization member data
export const createOrgData = createAsyncThunk(
  "orgMembersData/createOrgData",
  async (data) => {
    try {
      const response = await axios.post(`${ApiURL}/api/v1/org-members`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// find single organization member data
export const singleOrgData = createAsyncThunk(
  "orgMembersData/singleOrgData",
  async (id) => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/org-members/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);


// update organization member data
export const updateOrgData = createAsyncThunk(
  "orgMembersData/updateOrgData",
  async (data) => {
    try {
      const { id } = Object.fromEntries(data);

      const response = await axios.patch(
        `${ApiURL}/api/v1/org-members/${id}`,
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

// delete organization member data
export const deleteOrgData = createAsyncThunk(
  "orgMembersData/deleteOrgData",
  async (id) => {
    try {
      const response = await axios.delete(`${ApiURL}/api/v1/org-members/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);
