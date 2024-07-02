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
    },
    setUpvote: (state, action: PayloadAction<IUpvote>) => {
      const { postId, quantidade } = action.payload;
      state.upvotes[postId] = quantidade;
    },
    setUserUpvoted: (
      state,
      action: PayloadAction<{
        postId: string;
        userId: string;
        upvoted: boolean;
      }>
    ) => {
      const { postId, upvoted } = action.payload;
      state.userUpvoted[postId] = upvoted;
    },
    setUserDownvoted: (
      state,
      action: PayloadAction<{
        postId: string;
        userId: string;
        downvoted: boolean;
      }>
    ) => {
      const { postId, downvoted } = action.payload;
      state.userDownvoted[postId] = downvoted;
    },
    setUserSaved: (
      state,
      action: PayloadAction<{
        postId: string;
        saved: boolean;
      }>
    ) => {
      const { postId, saved } = action.payload;
      state.userSaved[postId] = saved;

      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.isSaved = saved;
      }

      if (state.currentPost?.id === postId) {
        state.currentPost.isSaved = saved;
      }
    },
    setCurrentPost: (state, action: PayloadAction<IPost>) => {
      state.currentPost = action.payload;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    setTag: (state, action: PayloadAction<{ postId: string; tag: Tag }>) => {
      const { postId, tag } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.tags ? post.tags.push(tag) : (post.tags = [tag]);
      } else {
        if (state.tagsForNewPost) {
          state.tagsForNewPost.push(tag);
        } else {
          state.tagsForNewPost = [tag];
        }
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

    setTagsForNewPost: (state, action: PayloadAction<Tag[]>) => {
      state.tagsForNewPost = action.payload;
    },
  },
});

export default postSlice.reducer;
