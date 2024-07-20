import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FilteredFeed from '../../pages/filtered-posts/filtered-feed';
import { PostScreenExtend } from '../../pages/home/extend-post';
import { RootStackParamList } from '../types';

const FilteredPostsStack = createStackNavigator<RootStackParamList>();

const FilteredPostsStackNavigator: React.FC = () => {
  return (
    <FilteredPostsStack.Navigator screenOptions={{ headerShown: false }}>
      <FilteredPostsStack.Screen name="FilteredFeed" component={FilteredFeed} />
      <FilteredPostsStack.Screen
        name="ExtendPostFiltered"
        component={PostScreenExtend}
      />
    </FilteredPostsStack.Navigator>
  );
};

export default FilteredPostsStackNavigator;
