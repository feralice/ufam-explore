export type Tag = {
  id: string;
  nome: string;
};

export type PostType = {
  titulo: string;
  texto: string;
  imagemUrl?: string;
  eventoId?: string;
  tags?: Tag[];
  upvote: number;
  downvote: number;
};

export type PostInitialStateType = {
  post: PostType;
};
