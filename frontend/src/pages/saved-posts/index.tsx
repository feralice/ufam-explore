import { FlatList, Text, View, SafeAreaView, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { PostCardNoInteraction } from "../../components/post-card/no-interaction";
import { getSavedPosts } from "../../components/post-card/no-interaction/selectors";
import { styles } from "./styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FeedScreenNavigationProp } from "../../routes/types";
import { useNavigation } from "@react-navigation/native";


const SavedPostsScreen = () => {
  const savedPosts = useSelector(getSavedPosts);
  const navigation = useNavigation<FeedScreenNavigationProp>();


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

      <Text style={styles.title}>Posts Salvos</Text>
      <FlatList
        data={savedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCardNoInteraction post={item} />}
      />
   </SafeAreaView>
  );
};

export default SavedPostsScreen;
