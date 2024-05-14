import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { BottomNavigation } from "./components/bottom-navigation";

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  );
}
