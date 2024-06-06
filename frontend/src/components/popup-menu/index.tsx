import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Option } from "./types";
import { FeedScreenNavigationProp } from "../../pages/create-post/type";
import { useNavigation } from "@react-navigation/native";

const PopupMenu = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const options: Option[] = [
    {
      title: "Adicionar ao calendário",
      icon: "calendar",
      action: () => alert("calendario"),
    },
    {
      title: "Editar post",
      icon: "edit",
      action: () => navigation.navigate("EditPost"),
    },
    {
      title: "Salvar post",
      icon: "save",
      action: () => alert("Salvando post"),
    },
    {
      title: "Excluir post",
      icon: "delete",
      action: () => alert("Excluindo post"),
    },
  ];

  return (
    <View style={styles.popupContainer}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <AntDesign name="ellipsis1" size={24} color="darkblue" />
      </TouchableOpacity>

      <Modal transparent visible={visible}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setVisible(false)}>
          <SafeAreaView style={{ flex: 1 }} />

          <View style={styles.popup}>
            {options.map((op, i) => (
              <TouchableOpacity key={i} onPress={op.action}>
                <View style={styles.option}>
                  <AntDesign name={op.icon} size={24} color="darkblue" />
                  <Text>{op.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PopupMenu;
