import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  Modal,
  Alert,
} from "react-native";
import { CustomInput } from "../../components/inputs";
import { FeedScreenNavigationProp } from "../create-post/type";
import { useSelector } from "react-redux";
import { IStore } from "../../store";
import styles from "./style";

const img = require("../../assets/img_test.jpg");

export const EditPostScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const post = useSelector((state: IStore) => state.post.editingPost);

  const [value, setValue] = useState(post?.titulo);
  const [valor, setValor] = useState(post?.texto); //talvez tenha erro aqui

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Você tem certeza que deseja fazer essas alterações?
              </Text>
              <View style={styles.containerButton}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Sim</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Não</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.card}>
          <View style={styles.perfil}>
            <Image source={img} style={styles.imagePerfil} />
            <Text>@{post?.usuario.username}</Text>
          </View>
          <Image source={img} style={styles.imagem} />
          <CustomInput
            placeholder="Título..."
            style={styles.input}
            onChangeText={(text) => setValue(text)}
            value={value}
          />
          <CustomInput
            placeholder="Digite seu texto..."
            multiline
            height={200}
            style={[styles.input, styles.textArea]}
            onChangeText={(text) => setValor(text)}
            value={valor}
          />
          <View style={styles.icones}>
            <Pressable>
              <AntDesign name="bars" size={24} color="darkblue" />
            </Pressable>
            <Pressable>
              <AntDesign name="team" size={24} color="darkblue" />
            </Pressable>
            <Pressable>
              <AntDesign name="calendar" size={24} color="darkblue" />
            </Pressable>
            <Pressable>
              <AntDesign name="pushpino" size={24} color="darkblue" />
            </Pressable>
            <Pressable>
              <AntDesign name="smileo" size={24} color="darkblue" />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={styles.EditButton}
          onPress={() => setModalVisible(true)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.publicarButtonText}>Salvar Edição</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};
