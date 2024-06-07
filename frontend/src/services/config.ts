import axios from "axios";

const TOKEN_KEY = "accessToken";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

console.log("API", api);
