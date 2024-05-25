import { userSlice } from ".";
import { store } from "..";
import { IProfile, IUser } from "./types";

export const setProfile = (profile: IProfile) => {
  store.dispatch(userSlice.actions.setProfile(profile));
};

export const setUser = (user: IUser) => {
  store.dispatch(userSlice.actions.setUser(user));
};
