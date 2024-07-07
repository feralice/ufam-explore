import { useState } from "react";
import { Alert, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { deleteUser } from "../../../services/api";
import { IStore } from "../../../store";
import { handleLogout } from "../../../utils/logout";
import ConfirmationModal from "../confirm-modal";
import styles from "./styles";

const DeleteCommentModal = ({
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

  const removeComment = async () => {
    if (!isSelected) {
      Alert.alert("Erro", "Você deve marcar o checkbox para confirmar.");
      return;
    }

    console.log("apagando...")

    onClose();
  };

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={visible}
        onClose={onClose}
        onConfirm={removeComment}
        loading={false}
        text="Deseja apagar esse comentário?"
      >
        <View style={styles.modalContent}>
          <Checkbox.Item
            label="Sim, desejo apagar comentário."
            status={isSelected ? "checked" : "unchecked"}
            onPress={toggleCheckbox}
          />
          {isSelected && (
            <Text style={styles.checkboxText}>
              Essa ação não poderá ser desfeita.
            </Text>
          )}
        </View>
      </ConfirmationModal>
    </View>
  );
};

export default DeleteCommentModal;