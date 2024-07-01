import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import PopupEdit from "../../components/popup-edit";
import { useNavigation } from "@react-navigation/native";
import {
  FeedScreenNavigationProp,
  LoginScreenNavigationProp,
} from "../../routes/types";
import { useSelector } from "react-redux";
import { IStore } from "../../store";

export const ProfileScreen = () => {
  const currentPost = useSelector((state: IStore) => state.user);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const handleProfilePicturePress = () => {
    // Implementar a lógica para alterar a foto de perfil aqui
    console.log("Alterar foto de perfil");
  };

  /*const handleCogPress = () => {
    // Implementar a lógica para iniciar o popup
    console.log("Configurações");
  };*/

  /*<TouchableOpacity
          onPress={handleCogPress}
          style={styles.cogIcon}

        <MaterialCommunityIcons name="cog" size={30} color="#000"/>
        </TouchableOpacity>
        */

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity
          onPress={handleProfilePicturePress}
          style={styles.profileImageContainer}
        >
          <MaterialCommunityIcons name="account" size={80} color="#000" />
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>

        <Text style={styles.profileName}>Caesoft</Text>
        <PopupEdit />
      </View>

      <View>
        <Text style={styles.texto}>NOME</Text>
        <Text style={styles.textoAlternativo}>{currentPost.user.nome}</Text>
        <Text style={styles.texto}>NOME DE USUÁRIO</Text>
        <Text style={styles.textoAlternativo}>{currentPost.user.username}</Text>
        <Text style={styles.texto}>E-MAIL</Text>
        <Text style={styles.textoAlternativo}>{currentPost.user.email}</Text>
        <Text style={styles.texto}>CURSO</Text>
        <Text style={styles.textoAlternativo}>{currentPost?.user.curso}</Text>
      </View>
    </View>
  );
};
