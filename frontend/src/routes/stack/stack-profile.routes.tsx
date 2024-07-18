import { createStackNavigator } from '@react-navigation/stack';
import { PostScreenExtend } from '../../pages/home/extend-post';
import { EditProfileInformation } from '../../pages/profile/edit-profile-informations';
import { ProfileInformationScreen } from '../../pages/profile/profile-informations';
import { ProfileScreen } from '../../pages/profile/profile-screen';
import SavedPostsScreen from '../../pages/profile/saved-posts';
import { UserPostsScreen } from '../../pages/profile/user-posts';
import { RootStackParamList } from '../types';

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

      <ProfileStack.Screen
        name="ExtendPostProfile"
        component={PostScreenExtend}
      />
    </ProfileStack.Navigator>
  );
};
