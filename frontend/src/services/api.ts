import { AxiosResponse } from "axios";
import { IPostRequest } from "../store/post/types";
import { api } from "./config";
import { ICreatePostRequest, ILoginRequest, ILoginResponse } from "./types";

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

export const getAllPosts = async () => {
  const response = await api.get("/all-posts");
  return response;
};
