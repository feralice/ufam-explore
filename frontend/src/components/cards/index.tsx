import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { IStore } from "../../store";
import {
  postDownvotesByPostId,
  postUpvotesByPostId,
  setDownvote,
  setUpvote,
} from "../../store/post/actions";
import { getVotesInAPost } from "../../store/post/getVotesInAPost";
import { IDownvote, IUpvote } from "../../store/post/types";
import { styles } from "./styles";
import { PostCardProps } from "./types";

const profileImage = require("../../assets/img_test.jpg");

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const userId = "1151183c-0355-43a2-91d0-f9f3453faf27"; // O ID do usuário deve ser dinâmico
  const upvotes = useSelector((store: IStore) => store.post.upvotes);
  const downvotes = useSelector((store: IStore) => store.post.downvotes);

  const currentUpvote = upvotes[post.id] || 0;
  const currentDownvote = downvotes[post.id] || 0;

  const handleUpvote = async () => {
    try {
      const response = await postUpvotesByPostId(userId, post.id);
      const upvoteData: IUpvote = {
        postId: post.id,
        userId,
        quantidade: response.data.upvotesCount,
      };
      setUpvote(upvoteData);
      setUpvoted(response.data.userUpvoted);
      if (downvoted) {
        setDownvoted(false);
      }
    } catch (error) {
      console.error("Failed to update upvotes", error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await postDownvotesByPostId(userId, post.id);
      const downvoteData: IDownvote = {
        postId: post.id,
        userId,
        quantidade: response.data.downvotesCount,
      };
      setDownvote(downvoteData);
      setDownvoted(response.data.userDownvoted);
      if (upvoted) {
        setUpvoted(false);
      }
    } catch (error) {
      console.error("Failed to update downvotes", error);
    }
  };

  const getVotes = async () => {
    try {
      const votes = await getVotesInAPost(userId, post.id);
      const upvoteData: IUpvote = {
        postId: post.id,
        userId,
        quantidade: votes.data.upvotes,
      };
      const downvoteData: IDownvote = {
        postId: post.id,
        userId,
        quantidade: votes.data.downvotes,
      };
      setUpvote(upvoteData);
      setDownvote(downvoteData);
      setUpvoted(votes.data.userUpvoted);
      setDownvoted(votes.data.userDownvoted);
    } catch (error) {
      console.error("Failed to fetch votes", error);
    }
  };

  useEffect(() => {
    getVotes();
  }, [post.id]);

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
