export interface Tag {
  id: string;
  nome: string;
}

export interface IPost {
  id: string;
  titulo: string;
  texto: string;
  imagemUrl?: string;
  eventoId?: string;
  tags?: Tag[];
  upvotes: number;
  downvotes: number;
  userUpvoted: boolean;
  userDownvoted: boolean;
  usuario: {
    id: string;
    username: string;
  };
}

export interface IPostRequest {
  titulo: string;
  texto: string;
  imagemUrl?: string;
  eventoId?: string;
}

export interface IDownvote {
  postId: string;
  userId: string;
  quantidade: number;
}

export interface IUpvote {
  postId: string;
  userId: string;
  quantidade: number;
}

export interface PostInitialStateType {
  downvotes: Record<string, number>;
  upvotes: Record<string, number>;
  post: IPostRequest;
  posts: IPost[];
  userUpvoted: Record<string, boolean>;
  userDownvoted: Record<string, boolean>;
  tags: Tag[];
  tagsForNewPost: Tag[]; // Adicionando tagsForNewPost aqui
  editingPost: IPost | null;
}
