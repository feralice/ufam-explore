import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventInitialState } from "./state";
import { EventType } from "./types";

export const eventSlice = createSlice({
  name: "event",
  initialState: EventInitialState,
  reducers: {
    setEventData: (state, action: PayloadAction<EventType>) => {
      state.data = action.payload.data;
      state.local = action.payload.local;
      state.texto = action.payload.texto;
      return state;
    },
  },
});
