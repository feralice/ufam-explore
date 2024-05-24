import { postSlice } from ".";
import { store } from "..";
import { PostType } from "./types";

export const setPostData = (post: PostType) => {
  store.dispatch(postSlice.actions.setPostData(post));
};

export const setUpvote = (upvote: number) => {
  store.dispatch(postSlice.actions.setUpvote(upvote));
};

export const setDownvote = (downvote: number) => {
  store.dispatch(postSlice.actions.setDownvote(downvote));
};
