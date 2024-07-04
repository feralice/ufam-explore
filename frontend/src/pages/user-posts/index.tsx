import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View,
  Pressable
} from "react-native";
import { useSelector } from "react-redux";
import { PostCardNoInteraction } from "../../components/post-card/no-interaction";
import { FeedScreenNavigationProp, ProfileScreenNavigationProp } from "../../routes/types";
import { IStore } from "../../store";
import { IPost } from "../../store/post/types";
import { feedStyles } from "../feed/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { styles }  from "./styles";
import AntDesign from "@expo/vector-icons/AntDesign";




export const UserPostsScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [myPosts, setMyPosts] = useState<IPost[]>([]);
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const { id: userId } = useSelector((state: IStore) => state.user.user);
  const allPosts = useSelector((state: IStore) => state.post.posts);

  useEffect(() => {
    
    const userPosts = allPosts.filter((post) => post.usuario.id === userId);
    setMyPosts(userPosts);
    setLoading(false);
  }, [allPosts, userId]);

  const renderPost: ListRenderItem<IPost> = useCallback(
    ({ item }) => <PostCardNoInteraction key={item.id} post={item}/>,
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
  <SafeAreaView style={styles.container}>

      <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="darkblue" />
        </Pressable> 

     <Text style={styles.title}>Meus Posts</Text>
    <View>
      <FlatList
        data={myPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />
    </View>
  </SafeAreaView>
  );
};
