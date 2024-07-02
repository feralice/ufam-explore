import { createStackNavigator } from "@react-navigation/stack";
import { ProfileInformationScreen } from "../../pages/profile-informations";
import { ProfileScreen } from "../../pages/profile";
import SavedPostsScreen from "../../pages/saved-posts";
import { RootStackParamList } from "../types";
import { UserPostsScreen } from "../../pages/user-posts";

const ProfileStack = createStackNavigator<RootStackParamList>();

export const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="InformationUser" component={ProfileScreen} />
      <ProfileStack.Screen
        name="DataUser"
        component={ProfileInformationScreen}
      />
      <ProfileStack.Screen
        name="SavedPostsScreen"
        component={SavedPostsScreen}
      />
            <ProfileStack.Screen name="UserPosts" component={UserPostsScreen} />

    </ProfileStack.Navigator>
  );
};
