import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "./event";
import { postSlice } from "./post";
import { userSlice } from "./user";

export const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    event: eventSlice.reducer,
    user: userSlice.reducer,
  },
});
