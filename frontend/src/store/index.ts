import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "./event";
import { IEventState } from "./event/types";
import { postSlice } from "./post";
import { PostInitialStateType } from "./post/types";
import { userSlice } from "./user";
import { IUser, UserInitialStateType } from "./user/types";

export interface IStore {
  post: PostInitialStateType;
  event: IEventState;
  user: UserInitialStateType;
}
export const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    event: eventSlice.reducer,
    user: userSlice.reducer,
  },
});
