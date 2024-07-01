import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  View,
} from "react-native";
import { FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import { BottomSelection } from "../../components/botton-selection";
import { PostCard } from "../../components/post-card";
import { RootStackParamList } from "../../routes/types";
import { getAllPosts, getPostByTag } from "../../services/api";
import { IStore } from "../../store";
import { setAllPosts } from "../../store/post/actions";
import { IPost } from "../../store/post/types";
import { feedStyles } from "./styles";

const logoPhoto = require("../../assets/UfamExplore.png");

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export const FeedScreen = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const { id, curso, perfilId } = useSelector(
    (state: IStore) => state.user.user
  );

  const fetchAllPosts = useCallback(async () => {
    try {
      const response = await getAllPosts(id);
      setPosts(response.data);
      setAllPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchPostsByCourse = useCallback(async () => {
    try {
      setSelectedTab(1);
      const response = await getPostByTag(curso ?? "");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [curso]);

  useFocusEffect(
    useCallback(() => {
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

  const renderPost: ListRenderItem<IPost> = useCallback(
    ({ item }) => <PostCard key={item.id} post={item} />,
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
            <View style={feedStyles.container}>
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
      />
      {perfilId !== 2 && (
        <View style={feedStyles.fabContainer}>
          <FAB
            style={feedStyles.fab}
            icon={() => (
              <MaterialCommunityIcons name="pencil" size={24} color="white" />
            )}
            color="white"
            onPress={() => navigation.navigate("Post")}
          />
        </View>
      )}
    </View>
  );
};
