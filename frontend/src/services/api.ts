import { AxiosResponse } from "axios";
import * as FileSystem from "expo-file-system";
import { IEvent } from "../store/event/types";
import { IPost, Tag } from "../store/post/types";
import { IUser } from "../store/user/types";
import { api } from "./config";
import {
  ICreatePostRequest,
  ICreateUserRequest,
  IDownvoteResponse,
  IEditPostRequest,
  ILoginRequest,
  ILoginResponse,
  ISavePostRequest,
  ITagResponse,
  IUpvoteResponse,
} from "./types";

export const login = async (
  data: ILoginRequest
): Promise<AxiosResponse<ILoginResponse>> => {
  const response = await api.post<ILoginResponse>("/login", data);
  return response;
};

export const createUser = async (
  data: ICreateUserRequest
): Promise<AxiosResponse<IUser>> => {
  const response = await api.post("/user/create", data);
  return response;
};

export const createPost = async (
  userId: string,
  body: ICreatePostRequest,
  fileUri?: string
): Promise<AxiosResponse<ICreatePostRequest>> => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("titulo", body.titulo);
  formData.append("texto", body.texto);
  if (body.eventoId) {
    formData.append("eventoId", body.eventoId);
  }
  if (body.tags) {
    body.tags.forEach((tag) => formData.append("tags[]", tag.nome));
  }
  if (fileUri) {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const fileType = fileUri.substring(fileUri.lastIndexOf(".") + 1);
      const fileBlob = {
        uri: fileUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      };
      formData.append("file", fileBlob as any);
    }
  }
  const response = await api.post("/create-post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const editPost = async (
  postId: string,
  body: IEditPostRequest
): Promise<AxiosResponse<IPost>> => {
  const response = await api.patch(`/edit/${postId}`, body);
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

export const postTagByName = async (
  tagName: string
): Promise<AxiosResponse<ITagResponse>> => {
  const response = await api.get<ITagResponse>(`/tag/${tagName}`);
  return response;
};

export const getPostById = async (
  postId: string
): Promise<AxiosResponse<IPost>> => {
  const response = await api.get(`/post/${postId}`);
  return response;
};

export const getAllTags = async (): Promise<AxiosResponse<Tag[]>> => {
  const response = await api.get("/tag/all");
  return response;
};

export const getTagByName = async (
  tagName: string
): Promise<AxiosResponse<ITagResponse>> => {
  const response = await api.get(`/tag/tag-by-name/${tagName}`);
  return response;
};

export const deletePost = async (
  postId: string
): Promise<AxiosResponse<void>> => {
  const response = await api.delete(`/delete/${postId}`);
  return response;
};

export const createEvent = async (
  data: IEvent
): Promise<AxiosResponse<IEvent>> => {
  const response = await api.post("/evento", data);
  return response;
};

export const getEventById = async (
  eventId: string
): Promise<AxiosResponse<IEvent>> => {
  const response = await api.get(`/evento/${eventId}`);
  return response;
};

export const getPostByTag = async (tag: string) => {
  return await api.get(`/get-post-by-tag/${tag}`);
};

export const savePost = async (
  data: ISavePostRequest
): Promise<AxiosResponse<IPost>> => {
  return await api.post("/save-post", data);
};

export const deleteUser = async (userId: string) => {
  return await api.post(`/user/delete/${userId}`);
};
