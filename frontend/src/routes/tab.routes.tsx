import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import React from 'react';
import FilteredPostsStackNavigator from './stack/stack-filtered-posts.routes';
import HomeStackNavigator from './stack/stack-home.routes';
import ProfileStackNavigator from './stack/stack-profile.routes';

type Route = RouteProp<Record<string, object | undefined>, string>;

const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route: Route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  const hideOnScreens = [
    'Post',
    'ExtendPost',
    'EditPost',
    'AddTag',
    'CreateEvent',
    'EditEventScreen',
    'ExtendPostProfile',
    'EditProfileInformation',
    'InformationUser',
    'SavedPostsScreen',
    'UserPosts',
  ];

  if (hideOnScreens.includes(routeName)) {
    return 'none';
  }
  return 'flex';
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: getTabBarVisibility(route),
        },
        tabBarActiveTintColor: 'darkblue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FilteredPostsStack"
        component={FilteredPostsStackNavigator}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="text-search"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
