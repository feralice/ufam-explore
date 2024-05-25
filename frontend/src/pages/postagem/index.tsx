import AntDesign from "@expo/vector-icons/AntDesign";
import { useForm } from "react-hook-form";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createPost } from "../../services/api";
import { setPostData } from "../../store/post/actions";
import { PostInitialState } from "../../store/post/state";
import { IPostRequest } from "../../store/post/types";
import styles from "./style";

const img = require("../../assets/img_test.jpg");

export const PostScreen = () => {
  const { setValue, handleSubmit } = useForm<IPostRequest>({
    defaultValues: {
      titulo: PostInitialState.post.titulo,
      texto: PostInitialState.post.texto,
    },
  });

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
      <View style={styles.card}>
        <View style={styles.Perfil}>
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
        <TextInput
          placeholder="Título..."
          style={styles.input}
          onChangeText={(text) => setValue("titulo", text)}
        />
        <TextInput
          placeholder="Digite seu texto..."
          multiline
          style={[styles.input, styles.textArea]}
          onChangeText={(text) => setValue("texto", text)}
        />

        <View style={styles.Icones}>
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

      <Button title="Publicar" color="darkblue" onPress={handleClick} />
    </View>
  );
};
