import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FeedScreen } from "../../pages/feed";

const Tab = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FeedScreen}
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
