import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { HashtagInPost } from "../../components/hashtags";
import PopupMenu from "../../components/popup-menu";
import { getPostById } from "../../services/api";
import { IStore } from "../../store";
import { setEditingPost } from "../../store/post/actions";
import { useVoteHandlers } from "../../utils/votes/useVoteHandlers";
import { styles } from "./style";

const img = require("../../assets/img_test.jpg");

export const PostScreenExtend = () => {
  const navigation = useNavigation();
  const currentPost = useSelector((state: IStore) => state.post.editingPost);

  const fetchPost = async (postId: string) => {
    try {
      const newPost = await getPostById(postId);
      setEditingPost(newPost.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const postId = currentPost?.id;
      if (postId) {
        fetchPost(postId);
      }
    }, [currentPost?.id])
  );

  if (!currentPost) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const {
    handleUpvote,
    handleDownvote,
    upvoted,
    downvoted,
    currentUpvote,
    currentDownvote,
  } = useVoteHandlers(currentPost);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.cardContainer}>
          <View style={styles.userInfo}>
            <Image style={styles.imagePerfil} source={img} />
            <Text>@{currentPost.usuario.username}</Text>
            <PopupMenu />
          </View>
          <View style={styles.alignItems}>
            {currentPost.imagemUrl ? (
              <Image
                style={styles.imageStyle}
                source={{ uri: currentPost.imagemUrl }}
              />
            ) : null}
            <Text style={styles.title}>{currentPost.titulo}</Text>
          </View>
          <View style={styles.interaction}>
            <Pressable style={styles.icon}>
              <Ionicons name="chatbubbles-outline" size={25} />
            </Pressable>

            <Pressable style={styles.icon} onPress={handleUpvote}>
              <MaterialCommunityIcons
                name={upvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
                size={upvoted ? 26 : 24}
                color={upvoted ? "green" : "black"}
              />
              <Text>{currentUpvote}</Text>
            </Pressable>

            <Pressable style={styles.icon} onPress={handleDownvote}>
              <MaterialCommunityIcons
                name={downvoted ? "arrow-down-bold" : "arrow-down-bold-outline"}
                size={downvoted ? 26 : 24}
                color={downvoted ? "red" : "black"}
              />
              <Text>{currentDownvote}</Text>
            </Pressable>

            <Pressable style={styles.icon}>
              <Ionicons name="bookmark-outline" size={25} />
            </Pressable>
          </View>
          <ScrollView>
            <Text style={styles.text}>{currentPost.texto}</Text>
            {currentPost.tags && currentPost.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {currentPost.tags.map((tag) => (
                  <HashtagInPost key={tag.id} name={tag.nome} />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
