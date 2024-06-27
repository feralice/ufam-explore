import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export const ProfileScreen = () => {
  const handleProfilePicturePress = () => {
    // Implementar a lógica para alterar a foto de perfil aqui
    console.log("Alterar foto de perfil");
  };

  const handleCogPress = () => {
    // Implementar a lógica para iniciar o popup
    console.log("Configurações");
  };

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

        <TouchableOpacity
          onPress={handleCogPress}
          style={styles.cogIcon}
        >
          
          <MaterialCommunityIcons name="cog" size={30} color="#000"/>
        </TouchableOpacity>
      </View>


      
    </View>
  );
};
