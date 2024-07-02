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
import { cursos } from "../../utils/courses";
import SelectDropdown from "react-native-select-dropdown";

export const EditProfileInformation = () => {
  const user = useSelector((state: IStore) => state.user.user);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const handleProfilePicturePress = () => {
    // Implementar a lógica para alterar a foto de perfil aqui
    console.log("Alterar foto de perfil");
  };
  const [course, setCourse] = useState("");
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
        <Text style={[styles.texto, { paddingTop: 20 }]}>NOME DE USUÁRIO</Text>
        <View style={[styles.texto, styles.BoxInput]}>
          <TextInput
            defaultValue={user.username}
            onChangeText={setName}
            testID="NameUser"
          />
        </View>
        <Text style={[styles.texto, { paddingTop: 20 }]}>E-MAIL</Text>

        <View style={[styles.texto, styles.BoxInput]}>
          <TextInput
            defaultValue={user.email}
            onChangeText={setName}
            testID="EmailUser"
          />
        </View>
        {user.perfilId === 1 && (
          <>
            <Text style={[styles.texto, { paddingTop: 20 }]}>CURSO</Text>
            <View style={styles.boxInput}>
              <SelectDropdown
                data={cursos}
                onSelect={(selectedItem, index) => {
                  setCourse(selectedItem);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {selectedItem ? selectedItem : "Modifique seu curso"}
                      </Text>
                      <MaterialCommunityIcons
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && { backgroundColor: "#D2D9DF" }),
                      }}
                    >
                      <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                    </View>
                  );
                }}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>
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
