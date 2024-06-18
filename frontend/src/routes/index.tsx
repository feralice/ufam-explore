import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./stack/stackAuth.routes";
export const Routes = () => {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};
