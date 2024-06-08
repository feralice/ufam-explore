import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
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
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Deseja cancelar a edição?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonTextCancel}>NÃO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => {
                  onCancel();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonTextConfirm}>SIM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FooterWithModals;
