import { createStackNavigator } from '@react-navigation/stack';
import { CreatePostScreen } from '../../pages/home/create-post';
import AddTagScreen from '../../pages/home/create-post/add-tags';
import CreateEventScreen from '../../pages/home/create-post/create-event';
import { EditPostScreen } from '../../pages/home/edit-post';
import EditEventScreen from '../../pages/home/edit-post/edit-event';
import { PostScreenExtend } from '../../pages/home/extend-post';
import { FeedScreen } from '../../pages/home/feed';
import { RootStackParamList } from '../types';
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
      <HomeStack.Screen name="EditEventScreen" component={EditEventScreen} />
    </HomeStack.Navigator>
  );
};
