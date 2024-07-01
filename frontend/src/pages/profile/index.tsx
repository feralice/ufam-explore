import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { LoginScreenNavigationProp } from "../../routes/types";
import { IStore } from "../../store";
import { setUser } from "../../store/user/actions";
import { styles } from "./styles";

export const ProfileScreen = () => {
  const handleProfilePicturePress = () => {
    // Implementar a lógica para alterar a foto de perfil aqui
    console.log("Alterar foto de perfil");
  };
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { username } = useSelector((state: IStore) => state.user.user);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setUser({
      id: "",
      nome: "",
      email: "",
      username: "",
      perfilId: 0,
      isAuthenticated: false,
    });
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
        <Text style={styles.profileName}>{username}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons
            name="save-alt"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Publicações salvas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
            navigation.navigate("informationUser");
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
