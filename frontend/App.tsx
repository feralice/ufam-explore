import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { BottomNavigation } from "./src/components/bottom-navigation";
import { store } from "./src/data";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </Provider>
  );
}
