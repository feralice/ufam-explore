import axios from "axios";

const TOKEN_KEY = "accessToken";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

