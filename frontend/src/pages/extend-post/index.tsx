import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { HashtagInPost } from "../../components/hashtags";
import PopupMenu from "../../components/popup-menu";
import { getEventById } from "../../services/api";
import { IStore } from "../../store";
import { setEventData } from "../../store/event/actions";
import { ClearEventData } from "../../store/event/state";
import { useVoteHandlers } from "../../utils/votes/useVoteHandlers";
import { styles } from "./style";

const img = require("../../assets/img_test.jpg");

export const PostScreenExtend = () => {
  const navigation = useNavigation();
  const currentPost = useSelector((state: IStore) => state.post.currentPost);
  const event = useSelector((state: IStore) => state.event.evento);

  useFocusEffect(
    useCallback(() => {
      if (!currentPost) {
        navigation.goBack();
      }

      return () => {
        setEventData(ClearEventData.evento);
      };
    }, [currentPost, navigation])
  );

  useEffect(() => {
    const fetchEventById = async (eventId: string) => {
      try {
        const event = await getEventById(eventId);
        setEventData(event.data);
      } catch (error) {
        console.error("Erro ao buscar evento por ID:", error);
      }
    };

    if (currentPost?.eventoId) {
      fetchEventById(currentPost.eventoId);
    }
  }, [currentPost]);

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
  } = useVoteHandlers(currentPost.id);

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

            {event.titulo && (
              <View style={styles.eventInfoContainer}>
                <Text style={styles.eventTitle}>{event.titulo}</Text>
                {event.descricao && <Text>{event.descricao}</Text>}
                <Text>Localização: {event.localizacao}</Text>
                <Text>
                  Data e Hora de Início:
                  {`${new Date(
                    event.dataInicio
                  ).toLocaleDateString()} ${new Date(
                    event.dataInicio
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
                </Text>
                <Text>
                  Data de Término:
                  {`${new Date(
                    event.dataFinal
                  ).toLocaleDateString()} ${new Date(
                    event.dataFinal
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}{" "}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
