import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { ConfirmationModalProps } from "./types";

const ConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  loading = false,
  text,
  children,
}: ConfirmationModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>

          <View>
            {children}
          </View>

          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.modalButtonTextCancel}>NÃO</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.modalButtonConfirm]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.modalButtonTextConfirm}>SIM</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
