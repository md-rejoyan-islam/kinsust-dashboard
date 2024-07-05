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
      .addCase(getSubscribers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getSubscribers.fulfilled, (state, action) => {
        state.subscribers = action.payload.data;
      })

      // delete subscriber
      .addCase(deleteSubscriber.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.subscribers = state.subscribers.filter(
          (subscriber) => subscriber.id !== action.payload.data.id
        );
      })

      // update subscriber
      .addCase(updateSubscriber.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateSubscriber.fulfilled, (state, action) => {
        state.message = action.payload.message;
        const index = state.subscribers.findIndex(
          (subscriber) => subscriber.id === action.payload.data.id
        );
        state.subscribers[index] = action.payload.data;
      });
  },
});

// selectors

// actions
export const { setMessageEmpty } = subscriberSlice.actions;

// exports
export default subscriberSlice.reducer;
