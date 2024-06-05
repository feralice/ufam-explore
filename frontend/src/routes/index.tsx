import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./tab.routes";
import { PostScreenExtend } from "../pages/Extend_Post";
export const Routes = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
