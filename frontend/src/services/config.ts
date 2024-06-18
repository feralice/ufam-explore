import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.5.181:3000",
 // withCredentials: true,
});

//

