import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostInitialState } from "./state";
import { IDownvote, IPost, IPostRequest, IUpvote, Tag } from "./types";

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
      action.payload.forEach((post) => {
        state.upvotes[post.id] = post.upvotes;
        state.downvotes[post.id] = post.downvotes;
        state.userUpvoted[post.id] = post.userUpvoted;
        state.userDownvoted[post.id] = post.userDownvoted;
      });
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
    setTag: (state, action: PayloadAction<{ postId: string; tag: Tag }>) => {
      const { postId, tag } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.tags ? post.tags.push(tag) : (post.tags = [tag]);
      }
    },
    removeTag: (
      state,
      action: PayloadAction<{ postId: string; tagId: string }>
    ) => {
      const { postId, tagId } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post && post.tags) {
        post.tags = post.tags.filter((tag) => tag.id !== tagId);
      }
    },
    setAllTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    setEditingPost: (state, action: PayloadAction<IPost>) => {
      state.editingPost = action.payload;
    },
    clearEditingPost: (state) => {
      state.editingPost = null;
    },
  },
});

export const {
  setPostData,
  setAllPosts,
  setDownvote,
  setUpvote,
  setTag,
  removeTag,
  setAllTags,
} = postSlice.actions;

export default postSlice.reducer;
