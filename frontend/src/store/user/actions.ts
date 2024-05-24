import { userSlice } from ".";
import { store } from "..";
import { ProfileType, UserType } from "./types";

export const setProfile = (profile: ProfileType) => {
  store.dispatch(userSlice.actions.setProfile(profile));
};

export const setUser = (user: UserType) => {
  store.dispatch(userSlice.actions.setUser(user));
};
