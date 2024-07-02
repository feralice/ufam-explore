import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";
import { Option } from "./types";
import { useNavigation } from "@react-navigation/native";
import { FeedScreenNavigationProp } from "../../routes/types";

const PopupEdit = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert("Excluindo conta");
    console.log("Excluindo");
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
    </View>
  );
};

export default PopupEdit;
