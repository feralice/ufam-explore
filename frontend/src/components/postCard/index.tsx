import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { PostCardProps } from "./types";
import { useVoteHandlers } from "./useVoteHandlers";

const profileImage = require("../../assets/img_test.jpg");

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
        <View style={styles.userInfo}>
          <Image style={styles.imagePerfil} source={profileImage} />
          <Text>@{post.usuario.username}</Text>
        </View>

        <View style={styles.alignItems}>
          {post.imagemUrl ? (
            <Image style={styles.imageStyle} source={{ uri: post.imagemUrl }} />
          ) : (
            <>
              <Text style={styles.title}>{post.titulo}</Text>
              <Text style={styles.text}>{post.texto}</Text>
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
      </View>
    </View>
  );
};
