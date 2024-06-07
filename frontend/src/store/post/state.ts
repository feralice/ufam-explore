import { PostInitialStateType } from "./types";

export const PostInitialState: PostInitialStateType = {
  post: {
    titulo: "",
    texto: "",
  },
  posts: [],
  upvotes: {},
  downvotes: {},
  userUpvoted: {},
  userDownvoted: {},
  tags: [],
  tagsForNewPost: [],
  editingPost: null,
};
