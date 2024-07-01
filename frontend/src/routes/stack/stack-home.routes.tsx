import { createStackNavigator } from "@react-navigation/stack";
import { AddTagScreen } from "../../pages/add-tags";
import CreateEventScreen from "../../pages/create-event";
import { CreatePostScreen } from "../../pages/create-post";
import { EditPostScreen } from "../../pages/edit-post";
import { PostScreenExtend } from "../../pages/extend-post";
import { FeedScreen } from "../../pages/feed";
import { RootStackParamList } from "../types";
import { ProfileScreen } from "../../pages/edit-profile";
const HomeStack = createStackNavigator<RootStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={FeedScreen} />
      <HomeStack.Screen name="Post" component={CreatePostScreen} />
      <HomeStack.Screen name="ExtendPost" component={PostScreenExtend} />
      <HomeStack.Screen name="EditPost" component={EditPostScreen} />
      <HomeStack.Screen name="AddTag" component={AddTagScreen} />
      <HomeStack.Screen name="CreateEvent" component={CreateEventScreen} />
      <HomeStack.Screen name="informationUser" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
};
