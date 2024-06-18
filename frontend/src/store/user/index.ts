import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState } from "./state";
import { IProfile, IUser } from "./types";

export const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
      return state;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      return state;
    },
  },
});
