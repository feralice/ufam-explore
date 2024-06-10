import AntDesign from "@expo/vector-icons/AntDesign";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ImagePickerComponent } from "../../components/image-picker";
import { CustomInput } from "../../components/inputs";
import { createPost } from "../../services/api";
import { IStore } from "../../store";
import { setTagsForNewPost } from "../../store/post/actions";
import { PostInitialState } from "../../store/post/state";
import { IPostRequest, Tag } from "../../store/post/types";
import { createPostSchema } from "../../utils/schemas/create-post-schema";
import styles from "./style";
import { FeedScreenNavigationProp } from "./type";

const img_perfil = require("../../assets/img_test.jpg");

export const CreatePostScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostRequest>({
    defaultValues: {
      titulo: PostInitialState.post.titulo,
      texto: PostInitialState.post.texto,
    },
    resolver: yupResolver(createPostSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const tagsForNewPost = useSelector(
    (state: IStore) => state.post.tagsForNewPost
  );
  const dispatch = useDispatch();

  const [image, setImage] = useState<string | any>(null);

  const handleClick = handleSubmit(async (data) => {
    const userId = "1151183c-0355-43a2-91d0-f9f3453faf27";
    const postData = { ...data, tags: tagsForNewPost };

    setLoading(true);
    try {
      await createPost(userId, postData, image);
      setLoading(false);
      setTagsForNewPost([]);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  const handleImagePicker = async () => {
    // Solicitar permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Desculpe, precisamos da permissão para acessar a galeria para que isso funcione!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
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

          <ImagePickerComponent image={image} onPress={handleImagePicker} />

          <Controller
            control={control}
            name="titulo"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="Título..."
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.titulo && (
            <Text style={styles.errorText}>{errors.titulo.message}</Text>
          )}

          <Controller
            control={control}
            name="texto"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="Digite seu texto..."
                multiline
                height={200}
                style={[styles.input, styles.textArea]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.texto && (
            <Text style={styles.errorText}>{errors.texto.message}</Text>
          )}

          <View style={styles.icones}>
            <Pressable
              style={styles.iconeWrapper}
              onPress={() => navigation.navigate("AddTag")}
            >
              <AntDesign name="tago" size={24} color="darkblue" />
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
