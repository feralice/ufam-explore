import { useState } from "react";
import { View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import ConfirmationModal from "../confirm-modal";
import styles from "./styles";

const DeleteModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  const [isSelected, setSelection] = useState(false);

  const toggleCheckbox = () => {
    setSelection(!isSelected);
  };

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={visible}
        onClose={onClose}
        onConfirm={() => {
          // chamar endpoint de excluir aqqq
          onClose();
        }}
        loading={false}
        text="Deseja desativar sua conta?"
      >
        <View style={styles.modalContent}>
          <Checkbox.Item
            label="Sim, desejo desativar minha conta."
            status={isSelected ? "checked" : "unchecked"}
            onPress={toggleCheckbox}
          />
          {isSelected && (
            <Text style={styles.checkboxText}>
              Essa ação não pode ser desfeita.
            </Text>
          )}
        </View>
      </ConfirmationModal>
    </View>
  );
};

export default DeleteModal;
