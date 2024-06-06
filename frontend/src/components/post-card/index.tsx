import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FeedScreenNavigationProp } from "../../pages/create-post/type";
import { useVoteHandlers } from "../../utils/votes/useVoteHandlers";
import { styles } from "./styles";
import { PostCardProps } from "./types";

const profileImage = require("../../assets/img_test.jpg");

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const {
    handleUpvote,
    handleDownvote,
    upvoted,
    downvoted,
    currentUpvote,
    currentDownvote,
  } = useVoteHandlers(post);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Pressable onPress={() => navigation.navigate("ExtendPost", { post })}>
          <View style={styles.userInfo}>
            <Image style={styles.imagePerfil} source={profileImage} />
            <Text>@{post.usuario.username}</Text>
          </View>

          <View style={styles.alignItems}>
            {post.imagemUrl ? (
              <Image
                style={styles.imageStyle}
                source={{ uri: post.imagemUrl }}
              />
            ) : (
              <>
                <Text style={styles.title}>{post.titulo}</Text>
                <Text style={styles.text} numberOfLines={5}>
                  {post.texto}
                </Text>
              </>
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
        </Pressable>
      </View>
    </View>
  );
};
