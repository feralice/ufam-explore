import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { FeedScreenNavigationProp } from "../../pages/create-post/type";
import { deletePost } from "../../services/api";
import { IStore } from "../../store";
import { styles } from "./styles";
import { Option } from "./types";

const PopupMenu = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const post = useSelector((state: IStore) => state.post.editingPost);

  const handleDeletePost = async () => {
    setLoading(true);
    try {
      const response = await deletePost(post?.id ?? "");
      if (response.status === 200) {
        Alert.alert("Sucesso", "Post excluído com sucesso");
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o post");
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const options: Option[] = [
    {
      title: "Adicionar ao calendário",
      icon: "calendar",
      action: () => alert("calendario"),
    },
    {
      title: "Editar post",
      icon: "edit",
      action: () => {
        setVisible(false);
        navigation.navigate("EditPost");
      },
    },
    {
      title: "Salvar post",
      icon: "save",
      action: () => alert("Salvando post"),
    },
    {
      title: "Excluir post",
      icon: "delete",
      action: () => {
        setModalVisible(true);
      },
    },
  ];

  return (
    <View style={styles.popupContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Você tem certeza que deseja apagar o post?
            </Text>
            <View style={styles.containerButton}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleDeletePost}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.textStyle}>Sim</Text>
                )}
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Não</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
