import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState } from "./state";
import { ProfileType, UserType } from "./types";

export const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload;
      return state;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      return state;
    },
  },
});
