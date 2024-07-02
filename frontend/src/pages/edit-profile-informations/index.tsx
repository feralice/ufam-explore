import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import PopupEdit from "../../components/popup-edit";
import { FeedScreenNavigationProp } from "../../routes/types";
import { IStore } from "../../store";
import { styles } from "./style";
import { useState } from "react";
import { BlueButton } from "../../components/blue-button";

export const EditProfileInformation = () => {
  const user = useSelector((state: IStore) => state.user.user);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const handleProfilePicturePress = () => {
    // Implementar a lógica para alterar a foto de perfil aqui
    console.log("Alterar foto de perfil");
  };
  const [name, setName] = useState("OIIIIIIIIIIIIII");

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Pressable
          onPress={handleProfilePicturePress}
          style={styles.profileImageContainer}
        >
          <MaterialCommunityIcons name="account" size={80} color="#000" />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="#F0F0F0" />
        </Pressable>

        <Text style={styles.profileName}>{user.username}</Text>
      </View>

      <View style={{}}>
        <Text style={styles.texto}>NOME</Text>
        <View style={[styles.texto, styles.BoxInput]}>
          <TextInput
            defaultValue={user.nome}
            onChangeText={setName}
            testID="Name"
          />
        </View>
        <Text style={styles.texto}>NOME DE USUÁRIO</Text>
        <View style={[styles.texto, styles.BoxInput]}>
          <TextInput
            defaultValue={user.username}
            onChangeText={setName}
            testID="NameUser"
          />
        </View>
        <Text style={styles.texto}>E-MAIL</Text>
        <Text style={styles.textoAlternativo}>{user.email}</Text>
        {user.perfilId === 1 && (
          <>
            <Text style={styles.texto}>CURSO</Text>
            <Text style={styles.textoAlternativo}>{user.curso}</Text>
          </>
        )}
      </View>
      <BlueButton
        onPress={function (): void {
          Alert.alert("OMG this is a button that go to main menu");
          navigation.navigate("Home");
        }}
        text={"Confirmar"}
        style={{ width: "40%", position: "absolute", bottom: 20 }}
      ></BlueButton>
    </View>
  );
};
