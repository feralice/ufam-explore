import { AxiosResponse } from 'axios';
import * as FileSystem from 'expo-file-system';
import { IComment } from '../store/comment/types';
import { IEvent } from '../store/event/types';
import { IPost, Tag } from '../store/post/types';
import { IUser } from '../store/user/types';
import { api } from './config';
import {
  ICreatePostRequest,
  ICreateUserRequest,
  IDownvoteResponse,
  IEditPostRequest,
  ILoginRequest,
  ILoginResponse,
  ISavePostRequest,
  ITagResponse,
  IUpdateUserRequest,
  IUpvoteResponse,
} from './types';

export const login = async (
  data: ILoginRequest
): Promise<AxiosResponse<ILoginResponse>> => {
  const response = await api.post<ILoginResponse>('/login', data);
  return response;
};

export const createUser = async (
  data: ICreateUserRequest
): Promise<AxiosResponse<IUser>> => {
  const response = await api.post('/user/create', data);
  return response;
};

export const createPost = async (
  userId: string,
  body: ICreatePostRequest,
  fileUri?: string
): Promise<AxiosResponse<ICreatePostRequest>> => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('titulo', body.titulo);
  formData.append('texto', body.texto);
  if (body.eventoId) {
    formData.append('eventoId', body.eventoId);
  }
  if (body.tags) {
    body.tags.forEach((tag) => formData.append('tags[]', tag.nome));
  }
  if (fileUri) {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const fileType = fileUri.substring(fileUri.lastIndexOf('.') + 1);
      const fileBlob = {
        uri: fileUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      };
      formData.append('file', fileBlob as any);
    }
  }
  const response = await api.post('/create-post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const editPost = async (
  postId: string,
  body: IEditPostRequest,
  fileUri?: string
): Promise<AxiosResponse<IPost>> => {
  const formData = new FormData();

  if (body.titulo) {
    formData.append('titulo', body.titulo);
  }

  if (body.texto) {
    formData.append('texto', body.texto);
  }

  if (body.eventoId) {
    formData.append('eventoId', body.eventoId);
  }

  if (body.tags && body.tags.length > 0) {
    body.tags.forEach((tag) => formData.append('tags', tag));
  }

  if (fileUri) {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const fileType = fileUri.substring(fileUri.lastIndexOf('.') + 1);
      const fileBlob = {
        uri: fileUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      };
      formData.append('file', fileBlob as any);
    }
  }

  const response = await api.patch(`/edit/${postId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
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
  const response = await api.get('/tag/all');
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
  const response = await api.post('/evento', data);
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
  return await api.post('/save-post', data);
};

export const deleteUser = async (userId: string) => {
  return await api.post(`/user/delete/${userId}`);
};

export const editUser = async (
  userId: string,
  data: IUpdateUserRequest,
  fileUri?: string
): Promise<AxiosResponse<IUser>> => {
  const formData = new FormData();
  formData.append('nome', data.nome || '');
  formData.append('username', data.username || '');
  formData.append('email', data.email || '');
  formData.append('curso', data.curso || '');
  if (fileUri) {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const fileType = fileUri.substring(fileUri.lastIndexOf('.') + 1);
      const fileBlob = {
        uri: fileUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      };
      formData.append('file', fileBlob as any);
    }
  }
  const response = await api.patch(`/user/update/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const upsertEvent = async (
  eventId: string | null,
  data: IEvent
): Promise<AxiosResponse<IEvent>> => {
  if (eventId) {
    const response = await api.put(`/evento/${eventId}`, data);
    return response;
  } else {
    const response = await api.post('/evento', data);
    return response;
  }
};

export const createComment = async (
  commentData: IComment
): Promise<AxiosResponse<IComment>> => {
  const response = await api.post('/comments/create', commentData);
  return response;
};

export const getCommentsByPost = async (postId: string) => {
  const response = await api.get(`/comments/by-post/${postId}`);
  return response;
};

export const deleteComment = async (commentId: string) => {
  return await api.delete(`/comments/delete/${commentId}`);
};

export const getFilteredPosts = async (
  area?: string,
  curso?: string,
  tempo?: string,
  searchText?: string
) => {
  return await api.get('/filtered-posts', {
    params: {
      area,
      curso,
      tempo,
      searchText,
    },
  });
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await api.post('/forgot-password', { email });
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error('Usuário não encontrado.');
    } else {
      throw new Error('Erro ao enviar email de redefinição de senha.');
    }
  }
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}): Promise<void> => {
  try {
    await api.post('/reset-password', data);
  } catch (error: any) {
    throw new Error('Erro ao redefinir a senha.');
  }
};
