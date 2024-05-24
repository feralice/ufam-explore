import { PostInitialStateType } from "./types";

export const PostInitialState: PostInitialStateType = {
  post: {
    titulo: "",
    texto: "",
    imagemUrl: "",
    eventoId: "",
    tags: [],
    upvote: 0,
    downvote: 0,
  },
};
