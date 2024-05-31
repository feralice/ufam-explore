import { postSlice } from ".";
import { store } from "..";
import { api } from "../../services/config";
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

export const postUpvotesByPostId = async (userId: string, postId: string) => {
  const response = await api.post(`/${postId}/upvote`, { usuarioId: userId });
  return response;
};

export const postDownvotesByPostId = async (userId: string, postId: string) => {
  const response = await api.post(`/${postId}/downvote&postId=${userId}`);
  return response;
};

export const getVotesInAPost = async (userId: string, postId: string) => {
  const response = await api.get(`/${postId}/votes/count`);
  return response;
};
