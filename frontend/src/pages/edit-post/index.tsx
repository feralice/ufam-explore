import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { BlueButton } from "../../components/blue-button";
import ConfirmationModal from "../../components/confirm-modal";
import { CustomInput } from "../../components/inputs";
import { editPost } from "../../services/api";
import { IStore } from "../../store";
import { FeedScreenNavigationProp } from "../create-post/type";
import { styles } from "./style";

const img = require("../../assets/img_test.jpg");

export const EditPostScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const post = useSelector((state: IStore) => state.post.editingPost);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.titulo || "");
      setText(post.texto || "");
    }
  }, [post]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post não encontrado.</Text>
      </View>
    );
  }

  const handleClick = async () => {
    setLoading(true);
    try {
      const updatePostDto = {
        titulo: title,
        texto: text,
      };
      await editPost(post.id, updatePostDto);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <ConfirmationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleClick}
          loading={loading}
          text="Você tem certeza que deseja fazer essas alterações?"
        />
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.card}>
          <View style={styles.perfil}>
            <Image source={img} style={styles.imagePerfil} />
            <Text>@{post.usuario.username}</Text>
          </View>
          {post.imagemUrl ? (
            <Image source={{ uri: post.imagemUrl }} style={styles.imagem} />
          ) : null}
          <CustomInput
            placeholder="Título..."
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <CustomInput
            placeholder="Digite seu texto..."
            multiline
            height={200}
            style={[styles.input, styles.textArea]}
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <View style={styles.icones}>
            <AntDesign name="tago" size={24} color="darkblue" />
            <AntDesign name="calendar" size={24} color="darkblue" />
          </View>
        </View>

        <BlueButton
          onPress={() => setModalVisible(true)}
          loading={loading}
          text="Salvar Edição"
        />
      </View>
    </ScrollView>
  );
};
