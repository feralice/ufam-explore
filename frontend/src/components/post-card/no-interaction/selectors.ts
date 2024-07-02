import { createSelector } from "reselect";
import { IStore } from "../../../store";

const getPosts = (state: IStore) => state.post.posts;
const getUserSaved = (state: IStore) => state.post.userSaved;

export const getSavedPosts = createSelector(
  [getPosts, getUserSaved],
  (posts, userSaved) =>
    posts.filter((post: { id: string | number }) => userSaved[post.id])
);
