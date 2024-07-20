import { createStackNavigator } from '@react-navigation/stack';
import FilteredFeed from '../../pages/filtered-posts/filtered-feed';
import { PostScreenExtend } from '../../pages/home/extend-post';
import { RootStackParamList } from '../types';

const FilteredPosts = createStackNavigator<RootStackParamList>();

export const FilteredPostsStackNavigator = () => {
  return (
    <FilteredPosts.Navigator screenOptions={{ headerShown: false }}>
      <FilteredPosts.Screen name="FilteredFeed" component={FilteredFeed} />
      <FilteredPosts.Screen name="FilteredFeed" component={PostScreenExtend} />
    </FilteredPosts.Navigator>
  );
};
