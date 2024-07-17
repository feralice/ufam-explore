import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, Pressable, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IStore } from '../../../store';
import { CustomInput } from '../../inputs';
import { styles } from './styles';

export const CommentSection = () => {
  const [commentInput, setCommentInput] = useState('');
  const currentUser = useSelector((state: IStore) => state.user);

  const handleCommentSubmit = () => {
    Alert.alert('Enviar comentário', commentInput);
    setCommentInput('');
  };

  return (
    <View style={styles.CommentsBox}>
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
        style={styles.BoxInputComment}
        value={commentInput}
        onChangeText={setCommentInput}
      />
      <Pressable onPress={handleCommentSubmit}>
        <MaterialCommunityIcons
          name="chevron-right-circle-outline"
          size={30}
          color="#000"
        />
      </Pressable>
    </View>
  );
};
