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
import { getAllPosts } from "../../services/api";
import { IStore } from "../../store";
import { setAllPosts } from "../../store/post/actions";
import { IPost } from "../../store/post/types";
import { feedStyles } from "./styles";

const logoPhoto = require("../../assets/UfamExplore.png");

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export const FeedScreen = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const { id } = useSelector((state: IStore) => state.user.user);

  const fetchAllPosts = useCallback(async () => {
    console.log("Fetching all posts", id);
    try {
      const response = await getAllPosts(id);
      setPosts(response.data);
      setAllPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllPosts();
      const id = setInterval(fetchAllPosts, 20000);
      setIntervalId(id);

      return () => {
        if (id) clearInterval(id);
      };
    }, [fetchAllPosts])
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
            <View style={feedStyles.bottomSelectionContainer}>
              <BottomSelection />
            </View>
          </>
        }
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />
      <View style={feedStyles.fabContainer}>
        <FAB
          style={feedStyles.fab}
          icon="pencil"
          color="white"
          onPress={() => navigation.navigate("Post")}
        />
      </View>
    </View>
  );
};
