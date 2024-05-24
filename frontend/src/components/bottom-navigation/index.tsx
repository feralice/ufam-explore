import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FeedScreen } from "../../pages/feed";
import { PostScreen } from "../../pages/postagem";

const Tab = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={PostScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <MaterialCommunityIcons name="home" size={26} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={FeedScreen}
        options={{
          tabBarLabel: "Pesquisa",

          tabBarIcon: () => (
            <MaterialCommunityIcons name="text-search" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={FeedScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: () => <MaterialCommunityIcons name="account" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};
