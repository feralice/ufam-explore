import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { useSelector } from 'react-redux';
import { Comments } from '..';
import { createComment } from '../../../services/api';
import { IStore } from '../../../store';
import { addComment } from '../../../store/comment/actions';
import { IComment } from '../../../store/comment/types';
import { CustomInput } from '../../inputs';
import { styles } from './styles';

export const CommentInput = () => {
  const [commentInput, setCommentInput] = useState('');
  const currentUser = useSelector((state: IStore) => state.user);
  const currentPost = useSelector((state: IStore) => state.post.currentPost);
  const comments = useSelector((state: IStore) => state.comment.comments);

  const handleCommentSubmit = async () => {
    if (commentInput.trim() === '') {
      Toast.show('O comentário não pode estar vazio.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      return;
    }

    const newComment: IComment = {
      conteudo: commentInput,
      usuarioId: currentUser.user.id,
      postagemId: currentPost?.id ?? '',
    };

    try {
      const createdComment = await createComment(newComment);
      addComment(createdComment.data);
      setCommentInput('');
    } catch (error) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao criar o comentário. Por favor, tente novamente.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.commentList}>
        {comments.map((comment: IComment) => (
          <Comments
            key={comment.id}
            username={currentUser.user.username}
            photo={currentUser.user.fotoPerfil ?? ''}
            text={comment.conteudo}
            action={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        {currentUser.user.fotoPerfil ? (
          <Image
            style={styles.imagePerfil}
            source={{ uri: currentUser.user.fotoPerfil }}
          />
        ) : (
          <MaterialCommunityIcons name="account" size={30} color="#000" />
        )}
        <CustomInput
          multiline
          id="comentario"
          placeholder="Adicione um comentário..."
          style={styles.BoxInputComment}
          value={commentInput}
          onChangeText={setCommentInput}
        />
        <Pressable onPress={handleCommentSubmit}>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            size={30}
            color="#000"
          />
        </Pressable>
      </View>
    </View>
  );
};
