import { useState } from "react";
import { Alert, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { deleteUser } from "../../../services/api";
import { IStore } from "../../../store";
import { handleLogout } from "../../../utils/logout";
import ConfirmationModal from "../confirm-modal";
import styles from "./styles";

const DeleteModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { id } = useSelector((state: IStore) => state.user.user);
  const [isSelected, setSelection] = useState(false);

  const toggleCheckbox = () => {
    setSelection(!isSelected);
  };

  const removeUser = async () => {
    if (!isSelected) {
      Alert.alert("Erro", "Você deve marcar o checkbox para confirmar.");
      return;
    }

    try {
      await deleteUser(id);
      Alert.alert("Sucesso", "Conta desativada com sucesso");
      handleLogout();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível excluir a conta");
    }
    onClose();
  };

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={visible}
        onClose={onClose}
        onConfirm={removeUser}
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
