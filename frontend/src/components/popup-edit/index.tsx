import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Modal, Pressable, SafeAreaView, Text, View } from "react-native";
import { FeedScreenNavigationProp } from "../../routes/types";
import DeleteModal from "../modals/delete-modal";
import { styles } from "./styles";
import { Option } from "./types";

const PopupEdit = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(true);
    hideModal();
  };

  const handleEditAccount = () => {
    navigation.navigate("EditProfileInformation");
  };

  const options: Option[] = [
    {
      title: "Editar conta",
      icon: "pencil",
      action: handleEditAccount,
    },
    {
      title: "Excluir conta",
      icon: "delete",
      action: handleDeleteAccount,
    },
  ];

  return (
    <View style={styles.popupContainer}>
      <Pressable onPress={showModal}>
        <MaterialCommunityIcons
          name="cog"
          size={24}
          color="#F0F0F0"
          style={styles.cogIcon}
        />
      </Pressable>

      <Modal
        transparent
        visible={visible}
        onRequestClose={hideModal}
        animationType="fade"
      >
        <Pressable style={styles.modalOverlay} onPress={hideModal}>
          <SafeAreaView style={styles.safeAreaView} />
          <View style={styles.popup}>
            {options.map((op, i) => (
              <Pressable key={i} onPress={op.action}>
                <View style={styles.option}>
                  <MaterialCommunityIcons
                    name={op.icon}
                    size={24}
                    color="darkblue"
                  />
                  <Text style={styles.optionText}>{op.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
      />
    </View>
  );
};

export default PopupEdit;
