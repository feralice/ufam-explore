import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { CommentSection } from '../../../components/Comments/comment-section';
import { HashtagInPost } from '../../../components/hashtags';
import PopupMenu from '../../../components/popup-menu';
import { getEventById, savePost } from '../../../services/api';
import { ISavePostRequest } from '../../../services/types';
import { IStore } from '../../../store';
import { setEventData } from '../../../store/event/actions';
import { ClearEventData } from '../../../store/event/state';
import { updateUserSaved } from '../../../store/post/actions';
import { useVoteHandlers } from '../../../utils/votes/useVoteHandlers';
import { styles } from './style';

export const PostScreenExtend = () => {
  const navigation = useNavigation();
  const currentPost = useSelector((state: IStore) => state.post.currentPost);
  const saved = useSelector(
    (state: IStore) => currentPost && state.post.userSaved[currentPost.id]
  );
  const event = useSelector((state: IStore) => state.event.evento);
  const { id } = useSelector((state: IStore) => state.user.user);
  const [loadingEvent, setLoadingEvent] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!currentPost) {
        navigation.goBack();
      }
    }, [currentPost, navigation])
  );

  useEffect(() => {
    const fetchEventById = async (eventId: string) => {
      try {
        const event = await getEventById(eventId);
        setEventData(event.data);
      } catch (error) {
        console.error('Erro ao buscar evento por ID:', error);
      } finally {
        setLoadingEvent(false);
      }
    };

    if (currentPost?.eventoId) {
      setLoadingEvent(true);
      fetchEventById(currentPost.eventoId);
    } else {
      setLoadingEvent(false);
    }
  }, [currentPost]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      const isNavigate = e.data.action.type === 'NAVIGATE';
      const navigateToEditEventScreen =
        isNavigate &&
        (e.data.action.payload as { name: string })?.name === 'EditEventScreen';

      if (!navigateToEditEventScreen) {
        setEventData(ClearEventData.evento);
      }
    });

    return unsubscribe;
  }, [navigation]);

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

  const handleSave = async () => {
    try {
      if (!saved) {
        await handleActualSave();
      } else {
        await handleUnsave();
      }
      updateUserSaved(currentPost.id, !saved);
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao salvar o post. Por favor, tente novamente.'
      );
    }
  };

  const handleActualSave = async () => {
    const data: ISavePostRequest = {
      usuarioId: id,
      postagemId: currentPost.id,
    };
    await savePost(data);
  };

  const handleUnsave = async () => {
    const data: ISavePostRequest = {
      usuarioId: id,
      postagemId: currentPost.id,
    };
    try {
      await savePost(data);
    } catch (error) {
      console.error('Erro ao desfazer salvar post:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao desfazer a ação de salvar o post. Por favor, tente novamente.'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            setEventData(ClearEventData.evento);
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.cardContainer}>
          <View style={styles.userInfo}>
            {currentPost.usuario.fotoPerfil ? (
              <Image
                style={styles.imagePerfil}
                source={{ uri: currentPost.usuario.fotoPerfil }}
              />
            ) : (
              <MaterialCommunityIcons name="account" size={30} color="#000" />
            )}
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
                name={upvoted ? 'arrow-up-bold' : 'arrow-up-bold-outline'}
                size={upvoted ? 26 : 24}
                color={upvoted ? 'green' : 'black'}
              />
              <Text>{currentUpvote}</Text>
            </Pressable>

            <Pressable style={styles.icon} onPress={handleDownvote}>
              <MaterialCommunityIcons
                name={downvoted ? 'arrow-down-bold' : 'arrow-down-bold-outline'}
                size={downvoted ? 26 : 24}
                color={downvoted ? 'red' : 'black'}
              />
              <Text>{currentDownvote}</Text>
            </Pressable>

            <Pressable style={styles.icon} onPress={handleSave}>
              <MaterialCommunityIcons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={25}
                color={saved ? 'darkblue' : 'black'}
              />
            </Pressable>
          </View>
          <Text style={styles.text}>{currentPost.texto}</Text>
          {currentPost.tags && currentPost.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {currentPost.tags.map((tag) => (
                <HashtagInPost key={tag.id} name={tag.nome} />
              ))}
            </View>
          )}

          {loadingEvent && currentPost.eventoId ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          ) : (
            event.titulo && (
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
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}
                </Text>
                <Text>
                  Data de Término:
                  {`${new Date(
                    event.dataFinal
                  ).toLocaleDateString()} ${new Date(
                    event.dataFinal
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}
                </Text>
              </View>
            )
          )}
        <CommentSection />
        </View>
      </View>
    </ScrollView>
  );
};