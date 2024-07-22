import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FeedScreenNavigationProp } from '../../routes/types';
import { savePost } from '../../services/api';
import { ISavePostRequest } from '../../services/types';
import { IStore } from '../../store';
import { updateCurrentPost, updateUserSaved } from '../../store/post/actions';
import { useVoteHandlers } from '../../utils/votes/useVoteHandlers';
import { HashtagInPost } from '../hashtags';
import { styles } from './styles';
import { PostCardProps } from './types';

export const PostCard = ({ post }: PostCardProps) => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const saved = useSelector((state: IStore) => state.post.userSaved[post.id]);
  const { id } = useSelector((state: IStore) => state.user.user);

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
    navigation.navigate('ExtendPost');
  };

  // Função para salvar o post
  const handleSave = async () => {
    try {
      if (!saved) {
        await handleActualSave();
      } else {
        await handleUnsave();
      }
      updateUserSaved(post.id, !saved);
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
      postagemId: post.id,
    };
    await savePost(data);
  };

  const handleUnsave = async () => {
    const data: ISavePostRequest = {
      usuarioId: id,
      postagemId: post.id,
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
    <Pressable style={styles.cardContainer} onPress={handleClick}>
      <View style={styles.userInfo}>
        {post.usuario.fotoPerfil ? (
          <Image
            style={styles.imagePerfil}
            source={{ uri: post.usuario.fotoPerfil }}
          />
        ) : (
          <MaterialCommunityIcons name="account" size={24} color="#000" />
        )}
        <Text>@{post.usuario.username}</Text>
      </View>

      {post.imagemUrl && (
        <Image style={styles.imageStyle} source={{ uri: post.imagemUrl }} />
      )}

      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {post.titulo}
      </Text>
      <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
        {post.texto}
      </Text>

      {post.tags && post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.slice(0, 3).map((tag) => (
            <HashtagInPost key={tag.id} name={tag.nome} />
          ))}
          {post.tags.length > 3 && (
            <Text style={styles.moreTags}>+{post.tags.length - 3}</Text>
          )}
        </View>
      )}

      <View style={styles.interaction}>
        <Pressable
          style={styles.icon}
          onPress={() => {
            navigation.navigate('ExtendPost');
          }}
        >
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
    </Pressable>
  );
};
