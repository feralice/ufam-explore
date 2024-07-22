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
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { CommentInput } from '../../../components/Comments/comment-input';
import { HashtagInPost } from '../../../components/hashtags';
import { SaveToCalendarModal } from '../../../components/modals/save-to-calendar-modal';
import PopupMenu from '../../../components/popup-menu';
import {
  getCommentsByPost,
  getEventById,
  savePost,
} from '../../../services/api';
import { ISavePostRequest } from '../../../services/types';
import { IStore } from '../../../store';
import { setComments } from '../../../store/comment/actions';
import { setEventData } from '../../../store/event/actions';
import { ClearEventData } from '../../../store/event/state';
import { updateUserSaved } from '../../../store/post/actions';
import { handleAddToCalendar } from '../../../utils/calendar-utils';
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
  const [loadingComments, setLoadingComments] = useState(true);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [addedEvents, setAddedEvents] = useState<string[]>([]);
  const [fullImageVisible, setFullImageVisible] = useState(false);

  const {
    handleUpvote,
    handleDownvote,
    upvoted,
    downvoted,
    currentUpvote,
    currentDownvote,
  } = useVoteHandlers(currentPost?.id || '');

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

    const fetchCommentsByPost = async (postId: string) => {
      try {
        const response = await getCommentsByPost(postId);
        setComments(response.data);
      } catch (error) {
        console.error('Erro ao buscar comentários por ID da postagem:', error);
      } finally {
        setLoadingComments(false);
      }
    };

    if (currentPost) {
      if (currentPost.eventoId) {
        setLoadingEvent(true);
        fetchEventById(currentPost.eventoId);
      } else {
        setLoadingEvent(false);
      }

      setLoadingComments(true);
      fetchCommentsByPost(currentPost.id);
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
              <MaterialCommunityIcons name="account" size={40} color="#000" />
            )}
            <Text style={styles.usernameText}>
              @{currentPost.usuario.username}
            </Text>
            <PopupMenu />
          </View>
          <View style={styles.postContent}>
            {currentPost.imagemUrl && (
              <Pressable onPress={() => setFullImageVisible(true)}>
                <Image
                  style={styles.imageStyle}
                  source={{ uri: currentPost.imagemUrl }}
                />
              </Pressable>
            )}
            <Text style={styles.title}>{currentPost.titulo}</Text>
            <Text style={styles.text}>{currentPost.texto}</Text>
          </View>
          {currentPost.tags && currentPost.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {currentPost.tags.map((tag) => (
                <HashtagInPost key={tag.id} name={tag.nome} />
              ))}
            </View>
          )}
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
              <Text style={styles.voteText}>{currentUpvote}</Text>
            </Pressable>
            <Pressable style={styles.icon} onPress={handleDownvote}>
              <MaterialCommunityIcons
                name={downvoted ? 'arrow-down-bold' : 'arrow-down-bold-outline'}
                size={downvoted ? 26 : 24}
                color={downvoted ? 'red' : 'black'}
              />
              <Text style={styles.voteText}>{currentDownvote}</Text>
            </Pressable>
            <Pressable style={styles.icon} onPress={handleSave}>
              <MaterialCommunityIcons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={25}
                color={saved ? 'darkblue' : 'black'}
              />
            </Pressable>
          </View>
          {loadingEvent && currentPost.eventoId ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          ) : (
            event.titulo && (
              <View style={styles.eventInfoContainer}>
                <Text style={styles.eventTitle}>Evento Associado</Text>
                <Text style={styles.eventSubTitle}>{event.titulo}</Text>
                {event.descricao && (
                  <Text style={styles.eventText}>{event.descricao}</Text>
                )}
                <Text style={styles.eventText}>
                  Localização: {event.localizacao}
                </Text>
                <Text style={styles.eventText}>
                  Data e Hora de Início:{' '}
                  {`${new Date(
                    event.dataInicio
                  ).toLocaleDateString()} ${new Date(
                    event.dataInicio
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}
                </Text>
                <Text style={styles.eventText}>
                  Data de Término:{' '}
                  {`${new Date(
                    event.dataFinal
                  ).toLocaleDateString()} ${new Date(
                    event.dataFinal
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}
                </Text>
                <Pressable
                  style={styles.addToCalendarButton}
                  onPress={() =>
                    handleAddToCalendar(
                      currentPost,
                      event,
                      setCalendarModalVisible,
                      addedEvents,
                      setAddedEvents
                    )
                  }
                >
                  <Ionicons name="calendar-outline" size={20} color="blue" />
                  <Text style={styles.addToCalendarText}>
                    Adicionar ao Calendário
                  </Text>
                </Pressable>
              </View>
            )
          )}
          {loadingComments ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <CommentInput />
          )}
        </View>
        <SaveToCalendarModal
          visible={calendarModalVisible}
          onClose={() => setCalendarModalVisible(false)}
        />
      </View>
      <Modal
        visible={fullImageVisible}
        transparent={true}
        onRequestClose={() => setFullImageVisible(false)}
      >
        <View style={styles.fullImageContainer}>
          <Pressable
            onPress={() => setFullImageVisible(false)}
            style={styles.closeButton}
          >
            <AntDesign name="close" size={30} color="#fff" />
          </Pressable>
          <Image
            source={{ uri: currentPost.imagemUrl }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};
