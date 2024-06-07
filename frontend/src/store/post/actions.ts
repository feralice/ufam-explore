import { postSlice } from ".";
import { store } from "..";
import { IDownvote, IPost, IPostRequest, IUpvote, Tag } from "./types";

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

export const setAllTags = (tags: Tag[]) => {
  store.dispatch(postSlice.actions.setAllTags(tags));
};

export const setTag = (postId: string, tag: Tag) => {
  store.dispatch(postSlice.actions.setTag({ postId, tag }));
};

export const removeTag = (postId: string, tagId: string) => {
  store.dispatch(postSlice.actions.removeTag({ postId, tagId }));
};

export const setEditingPost = (post: IPost) => {
  store.dispatch(postSlice.actions.setEditingPost(post));
};

export const clearEditingPost = () => {
  store.dispatch(postSlice.actions.clearEditingPost());
};

export const setTagsForNewPost = (tags: Tag[]) => {
  store.dispatch(postSlice.actions.setTagsForNewPost(tags));
};
