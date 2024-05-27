import { postSlice } from ".";
import { store } from "..";
import { IPost, IPostRequest } from "./types";

export const setPostData = (post: IPostRequest) => {
  store.dispatch(postSlice.actions.setPostData(post));
};

export const setAllPosts = (posts: IPost[]) => {
  store.dispatch(postSlice.actions.setAllPosts(posts));
};


//export const setUpvote = (upvote: number) => {
// store.dispatch(postSlice.actions.setUpvote(upvote));
//};

//export const setDownvote = (downvote: number) => {
// store.dispatch(postSlice.actions.setDownvote(downvote));
//};
