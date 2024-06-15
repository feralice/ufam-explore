import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { FeedScreenNavigationProp } from "../../pages/create-post/type";
import { getEventById } from "../../services/api";
import { IStore } from "../../store";
import { setEventData } from "../../store/event/actions";
import { updateCurrentPost } from "../../store/post/actions";
import { useVoteHandlers } from "../../utils/votes/useVoteHandlers";
import { HashtagInPost } from "../hashtags";
import { styles } from "./styles";
import { PostCardProps } from "./types";

const profileImage = require("../../assets/img_test.jpg");

export const PostCard = ({ post }: PostCardProps) => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { evento } = useSelector((state: IStore) => state.event);

  const {
    handleUpvote,
    handleDownvote,
    upvoted,
    downvoted,
    currentUpvote,
    currentDownvote,
  } = useVoteHandlers(post.id);

  const handleClick = () => {
    updateCurrentPost(post);
    navigation.navigate("ExtendPost");
  };

  useEffect(() => {
    const fetchEventById = async (eventId: string) => {
      try {
        const event = await getEventById(eventId);
        setEventData(event.data);
      } catch (error) {
        console.error("Erro ao buscar evento por ID:", error);
      }
    };

    if (post.eventoId) {
      fetchEventById(post.eventoId);
    }
  }, [post.eventoId]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Pressable onPress={handleClick}>
          <View style={styles.userInfo}>
            <Image style={styles.imagePerfil} source={profileImage} />
            <Text>@{post.usuario?.username}</Text>
          </View>

          <View style={styles.alignItems}>
            {post.imagemUrl ? (
              <Image
                style={styles.imageStyle}
                source={{ uri: post.imagemUrl }}
              />
            ) : null}
            <Text style={styles.title}>{post.titulo}</Text>
            <Text style={styles.text} numberOfLines={5}>
              {post.texto}
            </Text>
            {post.tags && post.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {post.tags.map((tag) => (
                  <HashtagInPost key={tag.id} name={tag.nome} />
                ))}
              </View>
            )}
            {evento.titulo && (
              <View style={styles.eventContainer}>
                <Text style={styles.eventText}>Evento: {evento.titulo}</Text>
              </View>
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
