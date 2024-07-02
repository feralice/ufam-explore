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

export const setCurrentPost = (post: IPost) => {
  store.dispatch(postSlice.actions.setCurrentPost(post));
};

export const clearCurrentPost = () => {
  store.dispatch(postSlice.actions.clearCurrentPost());
};

export const setTagsForNewPost = (tags: Tag[]) => {
  store.dispatch(postSlice.actions.setTagsForNewPost(tags));
};
export const updateDownvote = (downvote: IDownvote) => {
  store.dispatch(postSlice.actions.setDownvote(downvote));
};

export const updateUpvote = (upvote: IUpvote) => {
  store.dispatch(postSlice.actions.setUpvote(upvote));
};

export const updateUserUpvoted = (
  postId: string,
  userId: string,
  upvoted: boolean
) => {
  store.dispatch(postSlice.actions.setUserUpvoted({ postId, userId, upvoted }));
};

export const updateUserDownvoted = (
  postId: string,
  userId: string,
  downvoted: boolean
) => {
  store.dispatch(
    postSlice.actions.setUserDownvoted({ postId, userId, downvoted })
  );
};

export const updateCurrentPost = (post: IPost) => {
  store.dispatch(postSlice.actions.setCurrentPost(post));
};

export const clearPost = () => {
  store.dispatch(postSlice.actions.clearCurrentPost());
};

export const updateUserSaved = (postId: string, saved: boolean) => {
  store.dispatch(postSlice.actions.setUserSaved({ postId, saved }));
};
