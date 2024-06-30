import AntDesign from "@expo/vector-icons/AntDesign";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { BlueButton } from "../../components/blue-button";
import { ImagePickerComponent } from "../../components/image-picker";
import { CustomInput } from "../../components/inputs";
import { FeedScreenNavigationProp } from "../../routes/types";
import { createPost } from "../../services/api";
import { IStore } from "../../store";
import { setEventData } from "../../store/event/actions";
import { ClearEventData } from "../../store/event/state";
import { setTagsForNewPost } from "../../store/post/actions";
import { PostInitialState } from "../../store/post/state";
import { IPostRequest, Tag } from "../../store/post/types";
import { createPostSchema } from "../../utils/schemas/create-post-schema";
import { styles } from "./style";

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
  const event = useSelector((state: IStore) => state.event.evento);
  const userId = useSelector((state: IStore) => state.user.user.id);
  const currentPost = useSelector((state: IStore) => state.post.currentPost);

  const [image, setImage] = useState<string | any>(null);

  const handleClick = handleSubmit(async (data) => {
    const postData = { ...data, tags: tagsForNewPost, eventoId: event?.id };

    setLoading(true);
    try {
      await createPost(userId, postData, image);
      setTagsForNewPost([]);
      setEventData(ClearEventData.evento);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar o post. Tente novamente.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos da permissão para acessar a galeria para que isso funcione."
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
            setEventData(ClearEventData.evento);
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.card}>
          <View style={styles.perfil}>
            <Image source={img_perfil} style={styles.imagePerfil} />
            <Text>@{currentPost?.usuario.username}</Text>
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
            <Pressable
              style={styles.iconeWrapper}
              onPress={() => navigation.navigate("CreateEvent")}
            >
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

          {event.titulo && (
            <View style={styles.eventContainer}>
              <Text style={styles.eventTitle}>Evento Adicionado:</Text>
              <Text style={styles.eventText}>Título: {event.titulo}</Text>
              <Text style={styles.eventText}>
                Localização: {event.localizacao}
              </Text>
              <Text style={styles.eventText}>
                Data de Início:
                {new Date(event.dataInicio).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text style={styles.eventText}>
                Data de Fim:
                {new Date(event.dataFinal).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              {event.descricao && (
                <Text style={styles.eventText}>
                  Descrição: {event.descricao}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>

      <BlueButton onPress={handleClick} loading={loading} text="Publicar" />
    </ScrollView>
  );
};
