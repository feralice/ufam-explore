import { createStackNavigator } from "@react-navigation/stack";
import { CreatePostScreen } from "../../pages/create-post";
import { PostScreenExtend } from "../../pages/extend_post";
import { FeedScreen } from "../../pages/feed";
import { RootStackParamList } from "../types";

const HomeStack = createStackNavigator<RootStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={FeedScreen} />
      <HomeStack.Screen name="Post" component={CreatePostScreen} />
      <HomeStack.Screen name="ExtendPost" component={PostScreenExtend} />
    </HomeStack.Navigator>
  );
};
