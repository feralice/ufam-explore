import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
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
import { ConfirmDeleteModal } from '../modals/delete-confirm-modal';
import { styles } from './styles';
import { PopupCommentProps } from './types';

const PopupComment = ({
  id,
  position,
  visible,
  onClose,
}: PopupCommentProps) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleDeleteComment = async () => {
    try {
      await deleteComment(id);
      removeComment(id);
      Toast.show('Comentário excluído com sucesso!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o comentário');
    } finally {
      setConfirmModalVisible(false);
      onClose();
    }
  };

  const handleConfirmAction = async () => {
    await handleDeleteComment();
  };

  return (
    <>
      <Modal
        transparent
        visible={visible}
        onRequestClose={onClose}
        animationType="fade"
      >
        <Pressable style={styles.modalOverlay} onPress={onClose}>
          <SafeAreaView style={styles.safeAreaView} />
          <View style={[styles.popup, { top: position.y, left: position.x }]}>
            <Pressable onPress={() => setConfirmModalVisible(true)}>
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
      <ConfirmDeleteModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirmAction={handleConfirmAction}
        confirmationText="Você realmente deseja excluir este comentário?"
        checkboxLabel="Eu confirmo que desejo excluir este comentário"
        additionalText="Essa ação é permanente e não poderá ser desfeita."
      />
    </>
  );
};

export default PopupComment;
