import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../store/user/actions";

export const handleLogout = async () => {
  await AsyncStorage.removeItem("accessToken");
  setUser({
    id: "",
    nome: "",
    email: "",
    username: "",
    perfilId: 0,
    isAuthenticated: false,
  });
};
