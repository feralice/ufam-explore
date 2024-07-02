import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { PostCardNoInteraction } from "../../components/post-card/no-interaction";
import { ProfileScreenNavigationProp } from "../../routes/types";
import { IStore } from "../../store";
import { IPost } from "../../store/post/types";
import { feedStyles } from "../feed/styles";

export const UserPostsScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [myPosts, setMyPosts] = useState<IPost[]>([]);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const { id: userId } = useSelector((state: IStore) => state.user.user);
  const allPosts = useSelector((state: IStore) => state.post.posts);

  useEffect(() => {
    console.log("User ID:", userId);
    console.log("All Posts:", allPosts);

    const userPosts = allPosts.filter((post) => post.usuario.id === userId);
    setMyPosts(userPosts);
    setLoading(false);
  }, [allPosts, userId]);

  const renderPost: ListRenderItem<IPost> = useCallback(
    ({ item }) => <PostCardNoInteraction key={item.id} post={item} />,
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
    <View style={feedStyles.container}>
      <FlatList
        data={myPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
