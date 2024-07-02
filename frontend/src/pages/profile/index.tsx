import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { ProfileScreenNavigationProp } from "../../routes/types";
import { IStore } from "../../store";
import { handleLogout } from "../../utils/logout";
import { styles } from "./styles";

export const ProfileScreen = () => {
  const handleProfilePicturePress = () => {
    // Implementar a lógica para alterar a foto de perfil aqui
    console.log("Alterar foto de perfil");
  };
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { username } = useSelector((state: IStore) => state.user.user);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity
          onPress={handleProfilePicturePress}
          style={styles.profileImageContainer}
        >
          <MaterialCommunityIcons name="account" size={80} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileName}>{username}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SavedPostsScreen")}
        >
          <MaterialIcons
            name="save-alt"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Publicações salvas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("UserPosts");
          }}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Minhas publicações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("DataUser");
          }}
        >
          <MaterialIcons
            name="account-circle"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Informações da conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <MaterialIcons
            name="logout"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
