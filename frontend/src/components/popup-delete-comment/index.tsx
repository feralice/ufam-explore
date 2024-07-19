import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { deleteComment } from '../../services/api';
import { removeComment } from '../../store/comment/actions';
import { styles } from './styles';
import { PopupCommentProps } from './types';

const PopupComment = ({
  id,
  position,
  visible,
  onClose,
}: PopupCommentProps) => {
  const handleDeleteComment = async () => {
    try {
      await deleteComment(id);
      removeComment(id);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o comentário');
    } finally {
      Toast.show('Comentário excluído com sucesso!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      onClose();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <SafeAreaView style={styles.safeAreaView} />
        <View style={[styles.popup, { top: position.y, left: position.x }]}>
          <Pressable onPress={handleDeleteComment}>
            <View style={styles.option}>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color="darkblue"
              />
              <Text style={styles.optionText}>Deletar comentário</Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default PopupComment;
