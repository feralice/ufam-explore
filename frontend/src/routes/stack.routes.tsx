import { createStackNavigator } from "@react-navigation/stack";
import { FeedScreen } from "../pages/feed";
import { PostScreen } from "../pages/postagem";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={FeedScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
};
