import { profileSlice } from ".";
import { store } from "..";
import { ProfileType } from "./types";

export const setProfile = (profile: ProfileType) => {
  store.dispatch(profileSlice.actions.setProfile(profile));
};
