import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { CustomInput } from "../../components/inputs";
import { createPost } from "../../services/api";
import { IStore } from "../../store";
import { setPostData, setTagsForNewPost } from "../../store/post/actions";
import { PostInitialState } from "../../store/post/state";
import { IPostRequest, Tag } from "../../store/post/types";
import styles from "./style";
import { FeedScreenNavigationProp } from "./type";

const img = require("../../assets/adicionar_foto.png");
const img_perfil = require("../../assets/img_test.jpg");

export const CreatePostScreen = () => {
  const { setValue, handleSubmit } = useForm<IPostRequest>({
    defaultValues: {
      titulo: PostInitialState.post.titulo,
      texto: PostInitialState.post.texto,
    },
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const tagsForNewPost = useSelector(
    (state: IStore) => state.post.tagsForNewPost
  );

  const handleClick = handleSubmit(async (data) => {
    const userId = "1151183c-0355-43a2-91d0-f9f3453faf27";
    const postData = { ...data, tags: tagsForNewPost };

    setPostData(postData);
    console.log("postData", postData);
    setLoading(true);
    try {
      await createPost(userId, postData); // Ajuste aqui para lidar com file sendo null
      setLoading(false);
      setTagsForNewPost([]); // Limpar as tags após a criação do post
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  const [image, setImage] = useState(img);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            setTagsForNewPost([]);
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.card}>
          <View style={styles.perfil}>
            <Image source={img_perfil} style={styles.imagePerfil} />
            <Text>@nickname</Text>
          </View>

          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={typeof image === "string" ? { uri: image } : image}
              style={{ width: 300, height: 200 }}
            />
          </TouchableOpacity>
          <CustomInput
            placeholder="Título..."
            style={styles.input}
            onChangeText={(text) => setValue("titulo", text)}
          />
          <CustomInput
            placeholder="Digite seu texto..."
            multiline
            height={200}
            style={[styles.input, styles.textArea]}
            onChangeText={(text) => setValue("texto", text)}
          />
          <View style={styles.icones}>
            <Pressable
              style={styles.iconeWrapper}
              onPress={() => navigation.navigate("AddTag")}
            >
              <AntDesign name="tag" size={24} color="darkblue" />
              <Text style={styles.iconeText}>Adicionar tag</Text>
            </Pressable>
            <Pressable style={styles.iconeWrapper}>
              <AntDesign name="calendar" size={24} color="darkblue" />
              <Text style={styles.iconeText}>Adicionar evento</Text>
            </Pressable>
          </View>
          <View style={styles.tagContainer}>
            {tagsForNewPost.map((tag: Tag) => (
              <View key={tag.id} style={styles.tagWrapper}>
                <AntDesign name="tag" size={14} color="white" />
                <Text style={styles.tagText}>{tag.nome}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable
          style={styles.publicarButton}
          onPress={handleClick}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.publicarButtonText}>Publicar</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};
