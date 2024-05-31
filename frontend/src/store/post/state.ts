import { PostInitialStateType } from "./types";

export const PostInitialState: PostInitialStateType = {
  post: {
    titulo: "",
    texto: "",
    imagemUrl: "",
    eventoId: "",
  },
  posts: [],
  downvotes: {},
  upvotes: {},
};
