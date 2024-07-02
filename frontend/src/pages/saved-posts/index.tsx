import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { PostCardNoInteraction } from "../../components/post-card/no-interaction";
import { getSavedPosts } from "../../components/post-card/no-interaction/selectors";
import { styles } from "./styles";

const SavedPostsScreen = () => {
  const savedPosts = useSelector(getSavedPosts);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts Salvos</Text>
      <FlatList
        data={savedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCardNoInteraction post={item} />}
      />
    </View>
  );
};

export default SavedPostsScreen;
