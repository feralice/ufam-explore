import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HomeStackNavigator } from "./stack/stackHome.routes";
import Login from "../pages/login";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <MaterialCommunityIcons name="home" size={26} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Login}
        options={{
          tabBarLabel: "Pesquisa",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="text-search" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: () => <MaterialCommunityIcons name="account" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};
