import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostInitialState } from "./state";
import { IPost, IPostRequest } from "./types";

export const postSlice = createSlice({
  name: "post",
  initialState: PostInitialState,
  reducers: {
    setPostData: (state, action: PayloadAction<IPostRequest>) => {
      state.post = action.payload;
      return state;
    },
    setAllPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      return state;
    },
  },
  //setUpvote: (state, action: PayloadAction<number>) => {
  //state.post.upvote = action.payload;
  // return state;

  // setDownvote: (state, action: PayloadAction<number>) => {
  // state.post.downvote = action.payload;
  //return state;
  //},
  //},
});
