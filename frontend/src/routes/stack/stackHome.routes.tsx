import { createStackNavigator } from "@react-navigation/stack";
import { FeedScreen } from "../../pages/feed";
import { CreatePostScreen } from "../../pages/postagem";
import { RootStackParamList } from "../types";

const HomeStack = createStackNavigator<RootStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={FeedScreen} />
      <HomeStack.Screen name="Post" component={CreatePostScreen} />
    </HomeStack.Navigator>
  );
};
