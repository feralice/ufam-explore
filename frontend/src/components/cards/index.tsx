import { Ionicons } from "@expo/vector-icons"; // Importar Ionicons do expo
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { PostCardProps } from "./types";

const profileImage = require("../../assets/img_test.jpg");

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="chatbubbles-outline" size={25} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Ionicons name="arrow-up-outline" size={25} />
            <Text>{post.upvote}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Ionicons name="arrow-down-outline" size={25} />
            <Text>{post.downvote}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Ionicons name="bookmark-outline" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
