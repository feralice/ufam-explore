import { Tag } from '../store/post/types';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  id: string;
  perfilId: string;
  nome: string;
  email: string;
  username: string;
  fotoPerfil?: string;
  curso?: string;
}

export interface ICreateUserRequest {
  perfilId: number;
  nome: string;
  username: string;
  email: string;
  senha: string;
  curso?: string;
}

export interface IUpdateUserRequest {
  nome?: string;
  username?: string;
  email?: string;
  curso?: string;
}
export interface ICreatePostRequest {
  titulo: string;
  texto: string;
  eventoId?: string;
  tags?: Tag[];
}

export interface IDownvoteResponse {
  id: string;
  usuarioId: string;
  postagemId: string;
}

export interface IUpvoteResponse {
  id: string;
  usuarioId: string;
  postagemId: string;
}

export interface ITagResponse {
  id: string;
  nome: string;
}

export interface IEditPostRequest {
  titulo?: string;
  texto?: string;
  eventoId?: string;
  tags?: string[];
}

export interface ISavePostRequest {
  usuarioId: string;
  postagemId: string;
}
