// reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostInitialState } from "./state";
import { IDownvote, IPost, IPostRequest, IUpvote } from "./types";

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
    setDownvote: (state, action: PayloadAction<IDownvote>) => {
      const { postId, quantidade } = action.payload;
      state.downvotes[postId] = quantidade;
      return state;
    },
    setUpvote: (state, action: PayloadAction<IUpvote>) => {
      const { postId, quantidade } = action.payload;
      state.upvotes[postId] = quantidade;
      return state;
    },
  },
});
