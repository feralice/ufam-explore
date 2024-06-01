import { AxiosResponse } from "axios";
import { IPostRequest } from "../store/post/types";
import { api } from "./config";
import {
  ICreatePostRequest,
  IDownvoteResponse,
  ILoginRequest,
  ILoginResponse,
  IUpvoteResponse,
} from "./types";

export const login = async (
  data: ILoginRequest
): Promise<AxiosResponse<ILoginResponse>> => {
  const response = await api.post<ILoginResponse>("/login", data);
  //setToken(response.data.accessToken);
  return response;
};

export const createPost = async (
  userId: string,
  body: ICreatePostRequest
): Promise<AxiosResponse<IPostRequest>> => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("titulo", body.titulo);
  formData.append("texto", body.texto);

  const response = await api.post("/create-post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getAllPosts = async (userId: string) => {
  const response = await api.get(`/all-posts/${userId}`);
  return response;
};

export const postUpvoteByPostId = async (
  userId: string,
  postId: string
): Promise<AxiosResponse<IUpvoteResponse>> => {
  const response = await api.post(`${postId}/upvote`, {
    userId,
  });
  return response;
};

export const removeUpvoteByPostId = async (
  userId: string,
  postId: string
): Promise<AxiosResponse<void>> => {
  const response = await api.delete(`${postId}/upvote`, { data: { userId } });
  return response;
};

export const postDownvoteByPostId = async (
  userId: string,
  postId: string
): Promise<AxiosResponse<IDownvoteResponse>> => {
  const response = await api.post(`${postId}/downvote`, {
    userId,
  });
  return response;
};

export const removeDownvoteByPostId = async (
  userId: string,
  postId: string
): Promise<AxiosResponse<void>> => {
  const response = await api.delete(`${postId}/downvote`, { data: { userId } });
  return response;
};
