export interface IComment {
  id?: string;
  conteudo: string;
  usuarioId: string;
  postagemId: string;
  usuario?: {
    username: string;
    fotoPerfil: string;
  };
}

export interface ICommentState {
  comments: IComment[];
}
