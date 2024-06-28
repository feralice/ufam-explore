import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import PopupEdit from "../../components/popup-edit";

export const ProfileScreen = () => {
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

          <Text style={styles.profileName}>Caesoft</Text>
            <PopupEdit />
      </View>

      <View styles={styles.sectionInformation}>
          <Text style={styles.texto}>NOME</Text>
          <Text style={styles.textoAlternativo}>nome nome nome</Text>
          <Text style={styles.texto}>NOME DE USUÁRIO</Text>
          <Text style={styles.textoAlternativo}>nome_user nome_user nome_user</Text>
          <Text style={styles.texto}>E-MAIL</Text>
          <Text style={styles.textoAlternativo}>e-mail e-mail e-mail</Text>
          <Text style={styles.texto}>CURSO</Text>
          <Text style={styles.textoAlternativo}>curso curso curso</Text>
        </View>

    </View>
  );
};
