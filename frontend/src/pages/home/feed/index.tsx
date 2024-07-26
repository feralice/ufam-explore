import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';
import { FAB } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { useSelector } from 'react-redux';
import { BottomSelection } from '../../../components/botton-selection';
import { PostCard } from '../../../components/post-card';
import { RootStackParamList } from '../../../routes/types';
import { getAllPosts, getPostByTag } from '../../../services/api';
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
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const { id, curso, perfilId } = useSelector(
    (state: IStore) => state.user.user
  );
  const previousPosts = useRef<IPost[]>([]);

  const sortPostsByVotes = useCallback((posts: IPost[]) => {
    return posts.sort((a, b) => {
      if (b.upvotes !== a.upvotes) {
        return b.upvotes - a.upvotes;
      } else {
        return b.downvotes - a.downvotes;
      }
    });
  }, []);

  const fetchAllPosts = useCallback(async () => {
    try {
      const response = await getAllPosts(id);
      const sortedPosts = sortPostsByVotes(response.data);
      setPosts(sortedPosts);
      setAllPosts(sortedPosts);

      if (
        !loading &&
        !refreshing &&
        !arePostsEqual(sortedPosts, previousPosts.current)
      ) {
        Toast.show('Novas postagens disponíveis', {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }

      previousPosts.current = sortedPosts;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, loading, refreshing, sortPostsByVotes]);

  const fetchPostsByCourse = useCallback(async () => {
    try {
      setSelectedTab(1);
      const response = await getPostByTag(curso ?? '');
      const sortedPosts = sortPostsByVotes(response.data);
      setPosts(sortedPosts);
      setAllPosts(sortedPosts);

      if (
        !loading &&
        !refreshing &&
        !arePostsEqual(sortedPosts, previousPosts.current)
      ) {
        Toast.show('Novas postagens disponíveis', {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }

      previousPosts.current = sortedPosts;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [curso, loading, refreshing, sortPostsByVotes]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (selectedTab === 0) {
      fetchAllPosts();
    } else {
      fetchPostsByCourse();
    }
  }, [fetchAllPosts, fetchPostsByCourse, selectedTab]);

  useFocusEffect(
    useCallback(() => {
      setEventData(ClearEventData.evento);
      if (selectedTab === 0) {
        fetchAllPosts();
      } else {
        fetchPostsByCourse();
      }
      const id = setInterval(() => {
        if (selectedTab === 0) {
          fetchAllPosts();
        } else {
          fetchPostsByCourse();
        }
      }, 20000);
      setIntervalId(id);

      return () => {
        if (id) clearInterval(id);
      };
    }, [fetchAllPosts, fetchPostsByCourse, selectedTab])
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
              <MaterialCommunityIcons name={'bell'} size={30} color={'black'} />
            </Pressable>
            <View style={[feedStyles.container]}>
              <Image source={logoPhoto} />
            </View>
            {perfilId !== 2 && (
              <View style={feedStyles.bottomSelectionContainer}>
                <BottomSelection setTab={setSelectedTab} />
              </View>
            )}
          </>
        }
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
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

  for (let i = 0; i < newPosts.length; i++) {
    if (
      newPosts[i].id !== oldPosts[i].id ||
      newPosts[i].titulo !== oldPosts[i].titulo
    ) {
      return false;
    }
  }

  return true;
};
