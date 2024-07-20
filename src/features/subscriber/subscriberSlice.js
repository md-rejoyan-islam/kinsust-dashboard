import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSubscriber,
  getSubscribers,
  updateSubscriber,
} from "./subscriberApiSlice";

// initial state
export const initialState = {
  subscribers: null,
  error: null,
  message: null,
  loading: true,
};

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all subscribers
      .addCase(getSubscribers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscribers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getSubscribers.fulfilled, (state, action) => {
        state.subscribers = action.payload.data;
        state.loading = false;
      })

      // delete subscriber
      .addCase(deleteSubscriber.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubscriber.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        state.subscribers = state.subscribers.filter(
          (subscriber) => subscriber.id !== action.payload.data.id
        );
      })

      // update subscriber
      .addCase(updateSubscriber.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubscriber.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateSubscriber.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
        const index = state.subscribers.findIndex(
          (subscriber) => subscriber.id === action.payload.data.id
        );
        state.subscribers[index] = action.payload.data;
      });
  },
});

// actions
export const { setMessageEmpty } = subscriberSlice.actions;

// exports
export default subscriberSlice.reducer;
