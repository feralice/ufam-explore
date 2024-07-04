import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as Calendar from "expo-calendar";
import { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { FeedScreenNavigationProp } from "../../routes/types";
import { deletePost } from "../../services/api";
import { IStore } from "../../store";
import ConfirmationModal from "../modals/confirm-modal";
import { styles } from "./styles";
import { Option } from "./types";

const PopupMenu = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const post = useSelector((state: IStore) => state.post.currentPost);
  const currentUser = useSelector((state: IStore) => state.user.user);
  const event = useSelector((state: IStore) => state.event.evento);
  const isPostOwner = post?.usuario.id === currentUser.id;

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
      setVisible(false);
    }
  };

  const handleSavePost = () => {
    setVisible(false);
    alert("Salvando post");
  };

  const handleAddToCalendar = async () => {
    setVisible(false);
    if (!post?.eventoId) {
      Alert.alert("Erro", "Nenhum evento associado ao post.");
      return;
    }

    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      let defaultCalendarSource: Calendar.Source;
      let calendarId: string;

      if (Platform.OS === "ios") {
        const defaultCalendar = await Calendar.getDefaultCalendarAsync();
        defaultCalendarSource = defaultCalendar.source;
        calendarId = defaultCalendar.id;
      } else {
        defaultCalendarSource = {
          isLocalAccount: true,
          name: "Ufam Explore Calendar",
          type: Calendar.SourceType.LOCAL,
        };
        calendarId = await Calendar.createCalendarAsync({
          title: "Ufam Explore Calendar",
          color: "blue",
          entityType: Calendar.EntityTypes.EVENT,
          source: defaultCalendarSource,
          name: "internalCalendarName",
          ownerAccount: "personal",
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
      }

      const newEvent = {
        title: event.titulo,
        startDate: new Date(event.dataInicio),
        endDate: new Date(event.dataFinal),
        timeZone: "GMT-4",
        location: event.localizacao,
        notes: event.descricao,
      };

      try {
        await Calendar.createEventAsync(calendarId, newEvent);
        Alert.alert("Sucesso", "Evento adicionado ao calendário!");
      } catch (error) {
        console.error("Erro ao criar evento no calendário:", error);
        Alert.alert(
          "Erro",
          "Não foi possível adicionar o evento ao calendário."
        );
      }
    } else {
      Alert.alert("Permissão negada", "Não foi possível acessar o calendário.");
    }
  };

  const options: Option[] = [
    {
      title: "Salvar post",
      icon: "content-save",
      action: handleSavePost,
    },
    {
      title: "Adicionar ao calendário",
      icon: "calendar",
      action: handleAddToCalendar,
    },
  ];

  if (isPostOwner) {
    options.unshift(
      {
        title: "Editar post",
        icon: "pencil",
        action: () => {
          setVisible(false);
          navigation.navigate("EditPost");
        },
      },
      {
        title: "Excluir post",
        icon: "delete",
        action: () => {
          setModalVisible(true);
        },
      }
    );
  }

  return (
    <View style={styles.popupContainer}>
      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeletePost}
        text="Você tem certeza que deseja apagar o post?"
        loading={loading}
      />
      <Pressable onPress={() => setVisible(!visible)}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={32}
          color="darkblue"
        />
      </Pressable>

      <Modal transparent visible={visible}>
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

export default PopupMenu;
