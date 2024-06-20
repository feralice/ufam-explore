import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { Routes } from "./src/routes";
import { store } from "./src/store";
import { setUser } from "./src/store/user/actions";

export default function App() {
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);
  return (
    <Provider store={store}>
            <Routes />   {" "}
    </Provider>
  );
}
