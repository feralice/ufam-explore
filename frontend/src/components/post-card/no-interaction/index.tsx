import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import { FeedScreenNavigationProp } from '../../../routes/types';
import { updateCurrentPost } from '../../../store/post/actions';
import { HashtagInPost } from '../../hashtags';
import { styles } from '../styles';
import { PostCardProps } from '../types';

export const PostCardNoInteraction = ({ post }: PostCardProps) => {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const handleClick = () => {
    updateCurrentPost(post);
    navigation.navigate('ExtendPostProfile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Pressable onPress={handleClick}>
          <View style={styles.userInfo}>
            {post.usuario.fotoPerfil ? (
              <Image
                style={styles.imagePerfil}
                source={{ uri: post.usuario.fotoPerfil }}
              />
            ) : (
              <MaterialCommunityIcons name="account" size={24} color="#000" />
            )}
            <Text>@{post.usuario?.username}</Text>
          </View>

          {post.imagemUrl && (
            <Image style={styles.imageStyle} source={{ uri: post.imagemUrl }} />
          )}

          <Text style={styles.title}>{post.titulo}</Text>
          <Text style={styles.text} numberOfLines={5}>
            {post.texto}
          </Text>
          {post.eventoId && (
            <MaterialCommunityIcons
              name="calendar-check"
              size={20}
              color="darkblue"
              style={styles.eventIconNoInteraction}
            />
          )}
          {post.tags && post.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {post.tags.map((tag) => (
                <HashtagInPost key={tag.id} name={tag.nome} />
              ))}
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};
