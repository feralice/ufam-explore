export interface IComment {
  id?: string;
  conteudo: string;
  usuarioId: string;
  postagemId: string;
}

export interface ICommentState {
  comments: IComment[];
}
