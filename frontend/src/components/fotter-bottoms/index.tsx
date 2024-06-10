import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ConfirmationModal from "../confirm-modal";
import { styles } from "./styles";

interface FooterWithModalsProps {
  onCancel: () => void;
  onSave: () => void;
}

const FooterWithModals = ({ onCancel, onSave }: FooterWithModalsProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <View style={styles.footerContainer}>
      <Pressable style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </Pressable>
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </Pressable>

      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={onCancel}
        text="Deseja cancelar a edição?"
      />
    </View>
  );
};

export default FooterWithModals;
