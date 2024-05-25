import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "./event";
import { IEvent } from "./event/types";
import { postSlice } from "./post";
import { IPost, PostInitialStateType } from "./post/types";
import { userSlice } from "./user";
import { IUser } from "./user/types";

export interface IStore {
  post: PostInitialStateType;
  event: IEvent;
  user: IUser;
}
export const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    event: eventSlice.reducer,
    user: userSlice.reducer,
  },
});
