import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://ufam-explore.vercel.app/",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        "Token adicionado aos cabeçalhos:",
        config.headers.Authorization
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
