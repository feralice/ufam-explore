// Profile.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../routes/types";
import { setUser } from "../../store/user/actions";

//Ajustar depois td isso, apenas casos de teste

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setUser({
      id: "",
      nome: "",
      email: "",
      username: "",
      perfilId: 0,
    });
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Perfil do Usuário</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
