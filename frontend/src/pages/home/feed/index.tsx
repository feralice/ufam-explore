import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSelection } from '../../../components/botton-selection';
import { PostCard } from '../../../components/post-card';
import { RootStackParamList } from '../../../routes/types';
import { getAllPosts } from '../../../services/api';
import { IStore } from '../../../store';
import { setEventData } from '../../../store/event/actions';
import { ClearEventData } from '../../../store/event/state';
import { setAllPosts } from '../../../store/post/actions';
import { IPost } from '../../../store/post/types';
import { feedStyles } from './styles';

const logoPhoto = require('../../../assets/UfamExplore.png');

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const MemoizedPostCard = React.memo(PostCard);

export const FeedScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { id, curso, perfilId } = useSelector(
    (state: IStore) => state.user.user
  );
  const allPosts = useSelector((state: IStore) => state.post.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allPosts.length === 0) {
      fetchAllPosts();
    } else {
      setLoading(false);
    }
  }, [allPosts]);

  const sortPostsByVotes = useCallback((posts: IPost[]) => {
    return posts.sort(
      (a, b) => b.upvotes - a.upvotes || b.downvotes - a.downvotes
    );
  }, []);

  const fetchAllPosts = useCallback(async () => {
    try {
      const response = await getAllPosts(id);
      const sortedPosts = sortPostsByVotes(response.data);
      setAllPosts(sortedPosts);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, dispatch, sortPostsByVotes]);

  const filteredPosts = useMemo(() => {
    if (selectedTab === 0) {
      return allPosts;
    }
    return allPosts.filter((post: IPost) =>
      post.tags?.some((tag) => tag.nome === curso)
    );
  }, [allPosts, selectedTab, curso]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllPosts();
  }, [fetchAllPosts]);

  useFocusEffect(
    useCallback(() => {
      setEventData(ClearEventData.evento);
      setLoading(true);
      fetchAllPosts();
      const interval = setInterval(() => {
        fetchAllPosts();
      }, 20000);
      return () => clearInterval(interval);
    }, [fetchAllPosts])
  );

  const renderPost: ListRenderItem<IPost> = useMemo(
    () =>
      ({ item }) =>
        <MemoizedPostCard key={item.id} post={item} />,
    []
  );

  if (loading) {
    return (
      <View style={feedStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <Pressable
              style={feedStyles.bell}
              onPress={() => {
                navigation.navigate('Notification');
              }}
            >
              <MaterialCommunityIcons
                name={'bell-outline'}
                size={26}
                color={'black'}
              />
            </Pressable>
            <View style={feedStyles.container}>
              <Image source={logoPhoto} style={feedStyles.logo} />
            </View>
            {perfilId !== 2 && (
              <View style={feedStyles.bottomSelectionContainer}>
                <BottomSelection setTab={setSelectedTab} />
              </View>
            )}
          </>
        }
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View style={feedStyles.emptyContainer}>
            <Text style={feedStyles.emptyText}>
              Não há postagens no seu curso.
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingTop: 20 }}
      />
      <View style={feedStyles.fabContainer}>
        <FAB
          style={feedStyles.fab}
          icon={() => (
            <MaterialCommunityIcons name="pencil" size={24} color="white" />
          )}
          onPress={() => navigation.navigate('Post')}
        />
      </View>
    </View>
  );
};

const arePostsEqual = (newPosts: IPost[], oldPosts: IPost[]) => {
  if (newPosts.length !== oldPosts.length) {
    return false;
  }

  return !newPosts.some(
    (newPost, index) =>
      newPost.id !== oldPosts[index].id ||
      newPost.titulo !== oldPosts[index].titulo
  );
};
