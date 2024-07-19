import { Pressable, Text, View } from 'react-native';
import ConfirmationModal from '../confirm-modal';
import styles from './styles';
import { ModalProps } from './types';

export const SaveToCalendarModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={visible}
        onClose={onClose}
        onConfirm={onClose}
        loading={false}
        text="Evento salvo no calendário de seu celular :D"
        showButtons={false}
      >
        <Pressable style={styles.botao} onPress={onClose}>
          <Text style={styles.textoBotao}>OK</Text>
        </Pressable>
      </ConfirmationModal>
    </View>
  );
};
