import { createStackNavigator } from "@react-navigation/stack";
import { EditProfileInformation } from "../../pages/edit-profile-informations";
import { ProfileScreen } from "../../pages/profile";
import { ProfileInformationScreen } from "../../pages/profile-informations";
import SavedPostsScreen from "../../pages/saved-posts";
import { UserPostsScreen } from "../../pages/user-posts";
import { RootStackParamList } from "../types";

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
      <ProfileStack.Screen
        name="EditProfileInformation"
        component={EditProfileInformation}
      />
    </ProfileStack.Navigator>
  );
};
