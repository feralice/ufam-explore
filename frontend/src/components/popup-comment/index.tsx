import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Pressable, SafeAreaView, Text, View } from 'react-native';
import { styles } from './styles';
import { PopupCommentProps } from './types';

const PopupComment = ({ position, visible, onClose }: PopupCommentProps) => {
  const handleDeleteComment = () => {
    console.log('Deletando comentário');
    onClose();
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
