import axios from "axios";

const TOKEN_KEY = "accessToken";

export const api = axios.create({
  baseURL: "https://ufam-explore.vercel.app/",
});

console.log("API", api);
