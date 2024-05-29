import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CustomInput } from "../../components/inputs";
import { createPost } from "../../services/api";
import { setPostData } from "../../store/post/actions";
import { PostInitialState } from "../../store/post/state";
import { IPostRequest } from "../../store/post/types";
import styles from "./style";
import { FeedScreenNavigationProp } from "./type";

const img = require("../../assets/img_test.jpg");

export const PostScreen = () => {
  const { setValue, handleSubmit } = useForm<IPostRequest>({
    defaultValues: {
      titulo: PostInitialState.post.titulo,
      texto: PostInitialState.post.texto,
    },
  });
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const handleClick = handleSubmit(async (data) => {
    setPostData(data);
    const userId = "fd302e4c-e6f0-4bef-9171-42d5b2635f34";
    try {
      const resposta = await createPost(userId, data);
      console.log(resposta.data);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.perfil}>
          <Image source={img} style={styles.imagePerfil} />
          <Text> @nickname</Text>
          <AntDesign
            name="ellipsis1"
            size={24}
            color="darkblue"
            style={{ marginLeft: 150 }}
          />
        </View>
        <Image source={img} style={styles.imagem} />
        <CustomInput
          placeholder="Título..."
          onChangeText={(text) => setValue("titulo", text)}
        />
        <CustomInput
          placeholder="Digite seu texto..."
          multiline
          height={200}
          onChangeText={(text) => setValue("texto", text)}
        />
        <View style={styles.icones}>
          <TouchableOpacity>
            <AntDesign name="bars" size={24} color="darkblue" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="team" size={24} color="darkblue" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="calendar" size={24} color="darkblue" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="pushpino" size={24} color="darkblue" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="smileo" size={24} color="darkblue" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.publicarButton} onPress={handleClick}>
        <Text style={styles.publicarButtonText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
};