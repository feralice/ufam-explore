import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { CustomInput } from "../../components/inputs";
import { createPost } from "../../services/api";
import { setPostData } from "../../store/post/actions";
import { PostInitialState } from "../../store/post/state";
import { IPostRequest } from "../../store/post/types";
import styles from "./style";
import { FeedScreenNavigationProp } from "../create-post/type";

const img = require("../../assets/img_test.jpg");

export const EditPostScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();
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
          </View>
          <Image source={img} style={styles.imagem} />
          <CustomInput
            placeholder="Título..."
            style={styles.input}
            //onChangeText={(text) => setValue("titulo", text)}
          />
          <CustomInput
            placeholder="Digite seu texto..."
            multiline
            height={200}
            style={[styles.input, styles.textArea]}
            //onChangeText={(text) => setValue("texto", text)}
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
          // onPress={handleClick}
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
