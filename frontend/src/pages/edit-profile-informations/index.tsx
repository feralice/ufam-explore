import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { BlueButton } from "../../components/blue-button";
import { ProfileScreenNavigationProp } from "../../routes/types";
import { editUser } from "../../services/api";
import { IStore } from "../../store";
import { setUser } from "../../store/user/actions";
import { cursos } from "../../utils/courses";
import { styles } from "./style";
import { useValidation } from "./validations";

export const EditProfileInformation = () => {
  const user = useSelector((state: IStore) => state.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [curso, setCourse] = useState("");
  const [nome, setName] = useState(user.nome);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const { nameError, usernameError, emailError } = useValidation(
    nome,
    username,
    email,
    user.perfilId
  );

  const handleProfilePicturePress = () => {
    Alert.alert("Alterar foto de perfil", "Em breve...");
  };

  const handleClickConfirm = async () => {
    if (nameError || usernameError || emailError) {
      Alert.alert("Erro", "Corrija os erros antes de confirmar.");
      return;
    }

    try {
      const updatedUser = { nome, username, email, curso };
      await editUser(user.id, updatedUser);

      setUser({
        id: user.id,
        nome: nome,
        email: email,
        username: username,
        curso: curso,
        perfilId: user.perfilId,
        isAuthenticated: true,
      });

      Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
      navigation.goBack();
    } catch (error: any) {
      if (error.response.status === 409) {
        Alert.alert("Erro", "Nome de usuário ou email já cadastrados.");
        return;
      }
      Alert.alert(
        "Erro",
        `Não foi possível atualizar as informações: ${error}`
      );
    }
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <Pressable
            onPress={handleProfilePicturePress}
            style={styles.profileImageContainer}
          >
            <MaterialCommunityIcons name="account" size={80} color="#000" />
            <View style={styles.cameraIconContainer}>
              <MaterialCommunityIcons name="camera" size={24} color="#FFF" />
            </View>
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

        <View style={styles.editableSection}>
          <Text style={styles.texto}>NOME</Text>
          <View style={styles.BoxInput}>
            <TextInput
              value={nome}
              onChangeText={setName}
              testID="Name"
              style={styles.inputField}
            />
          </View>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <Text style={styles.texto}>NOME DE USUÁRIO</Text>
          <View style={styles.BoxInput}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              testID="NameUser"
              style={styles.inputField}
            />
          </View>
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}

          <Text style={styles.texto}>E-MAIL</Text>
          <View style={styles.BoxInput}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              testID="EmailUser"
              style={styles.inputField}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {user.perfilId === 1 && (
            <>
              <Text style={styles.texto}>CURSO</Text>
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
      </View>
      <View style={styles.confirmButtonContainer}>
        <BlueButton
          onPress={handleClickConfirm}
          text={"Confirmar"}
          style={styles.confirmButton}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
