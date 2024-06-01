import { postSlice } from ".";
import { store } from "..";
import { IDownvote, IPost, IPostRequest, IUpvote } from "./types";

export const setPostData = (post: IPostRequest) => {
  store.dispatch(postSlice.actions.setPostData(post));
};

export const setAllPosts = (posts: IPost[]) => {
  store.dispatch(postSlice.actions.setAllPosts(posts));
};

export const setDownvote = (downvote: IDownvote) => {
  store.dispatch(postSlice.actions.setDownvote(downvote));
};

export const setUpvote = (upvote: IUpvote) => {
  store.dispatch(postSlice.actions.setUpvote(upvote));
};
