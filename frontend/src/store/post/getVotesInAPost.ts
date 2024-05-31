import { api } from "../../services/config";

export const getVotesInAPost = async (userId: string, postId: string) => {
  const response = await api.get(`/${postId}/votes/count`);
  return response;
};
