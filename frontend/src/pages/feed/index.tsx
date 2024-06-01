import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect } from "react";
import { FlatList, Image, ListRenderItem, View } from "react-native";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { BottomSelection } from "../../components/botton-selection";
import { PostCard } from "../../components/postCard";
import { RootStackParamList } from "../../routes/types";
import { getAllPosts } from "../../services/api";
import { IStore } from "../../store";
import { setAllPosts } from "../../store/post/actions";
import { IPost } from "../../store/post/types";
import { feedStyles } from "./styles";

const logoPhoto = require("../../assets/UfamExplore.png");

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export const FeedScreen = () => {
  const posts = useSelector((store: IStore) => store.post.posts);
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const fetchAllPosts = useCallback(async () => {
    try {
      //TODO: mudar o id quando login for feito
      const response = await getAllPosts(
        "1151183c-0355-43a2-91d0-f9f3453faf27"
      );
      setAllPosts(response.data); 
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllPosts();
    const intervalId = setInterval(fetchAllPosts, 30000);
    return () => clearInterval(intervalId);
  }, [fetchAllPosts]);

  const renderPost: ListRenderItem<IPost> = useCallback(
    ({ item }) => <PostCard key={item.id} post={item} />,
    []
  );

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
