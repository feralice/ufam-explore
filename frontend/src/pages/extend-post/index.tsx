import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { HashtagInPost } from "../../components/hashtags";
import PopupMenu from "../../components/popup-menu";
import { useVoteHandlers } from "../../utils/votes/useVoteHandlers";
import { styles } from "./style";
import { PostDetailsScreenRouteProp } from "./types";

const img = require("../../assets/img_test.jpg");

export const PostScreenExtend = () => {
  const route = useRoute<PostDetailsScreenRouteProp>();
  const { post } = route.params;
  const navigation = useNavigation();

  const {
    handleUpvote,
    handleDownvote,
    upvoted,
    downvoted,
    currentUpvote,
    currentDownvote,
  } = useVoteHandlers(post);

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
            <Text>@{post.usuario.username}</Text>
            <PopupMenu />
          </View>
          <View style={styles.alignItems}>
            {post.imagemUrl ? (
              <Image
                style={styles.imageStyle}
                source={{ uri: post.imagemUrl }}
              />
            ) : (
              <Text style={styles.title}>{post.titulo}</Text>
            )}
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
            <Text style={styles.text}>{post.texto}</Text>
            {post.tags && post.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {post.tags.map((tag) => (
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
