import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventInitialState } from "./state";
import { IEvent } from "./types";

export const eventSlice = createSlice({
  name: "event",
  initialState: EventInitialState,
  reducers: {
    setEventData: (state, action: PayloadAction<IEvent>) => {
      state.evento = action.payload;
      return state;
    },
  },
});
