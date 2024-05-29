import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import { BottomSelection } from "../../components/botton-selection";
import { PostCard } from "../../components/cards/index";
import { RootStackParamList } from "../../routes/types";
import { getAllPosts } from "../../services/api";
import { IStore } from "../../store";
import { setAllPosts } from "../../store/post/actions";
import { IPost } from "../../store/post/types";
import { feedStyles } from "./styles";

const logoPhoto = require("../../assets/UfamExplore.png");

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export const FeedScreen = () => {
  const post = useSelector((store: IStore) => store.post.posts);
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const fetchAllPosts = async () => {
    try {
      const response = await getAllPosts();
      setAllPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View style={feedStyles.container}>
            <Image source={logoPhoto}></Image>
          </View>

          <View style={feedStyles.bottomSelectionContainer}>
            <BottomSelection />
          </View>

          <View>
            {post.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </View>
        </View>
      </ScrollView>
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
