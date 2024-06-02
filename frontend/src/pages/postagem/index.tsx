import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { CustomInput } from "../../components/inputs";
import { createPost } from "../../services/api";
import { setPostData } from "../../store/post/actions";
import { PostInitialState } from "../../store/post/state";
import { IPostRequest } from "../../store/post/types";
import styles from "./style";
import { FeedScreenNavigationProp } from "./type";
import PopupMenu from "../../components/opcoes";
import {useState} from 'react';

const img = require("../../assets/img_test.jpg");

export const CreatePostScreen = () => {
  const { setValue, handleSubmit } = useForm<IPostRequest>({
    defaultValues: {
      titulo: PostInitialState.post.titulo,
      texto: PostInitialState.post.texto,
    },
  });
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const handleClick = handleSubmit(async (data) => {
    //TODO: Remover depois isso aqui apos o login, está mockado para melhor desenvolvimento
    const userId = "1151183c-0355-43a2-91d0-f9f3453faf27";
    setPostData(data);
    try {
      const resposta = await createPost(userId, data);
      console.log(resposta.data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.card}>
          <View style={styles.perfil}>
            <Image source={img} style={styles.imagePerfil} />
            <Text>@nickname</Text>
            <PopupMenu/>
          </View>
          //vai ficar a imagem
          <Image source={img} style={styles.imagem} />
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

        <Pressable style={styles.publicarButton} onPress={handleClick}>
          <Text style={styles.publicarButtonText}>Publicar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
