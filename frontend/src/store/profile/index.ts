import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileInitialState } from "./state";
import { ProfileType } from "./types";

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileType>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      return state;
    },
  },
});
