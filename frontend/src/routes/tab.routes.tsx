import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FilteredFeed from '../pages/filtered-posts/filtered-feed';
import { HomeStackNavigator } from './stack/stack-home.routes';
import { ProfileStackNavigator } from './stack/stack-profile.routes';
import { FilteredPostsStackNavigator } from './stack/stack-filtered-posts.routes';

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
          tabBarLabel: 'Home',
          tabBarIcon: () => <MaterialCommunityIcons name="home" size={26} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={FilteredPostsStackNavigator}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="text-search" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: () => <MaterialCommunityIcons name="account" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};
