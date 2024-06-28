import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
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

const PopupEdit = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  

  const handleDeleteAccount = () => {
    alert("Excluindo conta");
    console.log("Excluindo");
  };

  const handleEditAccount = () => {
    alert("Editando conta");
    console.log("Editando");
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
      <Pressable onPress={() => setVisible(!visible)}>
        <MaterialCommunityIcons
          name="cog"
          size={30}
          color="#000"
          style={styles.cogIcon}
        />
      </Pressable>

      <Modal transparent visible={visible} onRequestClose={() => setVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
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
 