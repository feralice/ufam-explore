import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { BlueButton } from "../../components/blue-button";
import TermsModal from "../../components/modals/terms-modal";
import PasswordRequirements from "../../components/password-validations";
import { LoginScreenNavigationProp } from "../../routes/types";
import { createUser } from "../../services/api";
import { cursos } from "../../utils/courses";
import {
  isEmailValidUfam,
  isNameValid,
  isPasswordValid,
  isUsernameValid,
  passwordsMatch,
} from "../../utils/validations-utils";
import { styles } from "./styles";

const InternalSignUpScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isFirstIcon, setIsFirstIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleSignUp = async () => {
    setShowPasswordRules(true);
    setNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate inputs
    let hasError = false;

    if (!isNameValid(name)) {
      setNameError("Por favor, insira um nome válido (apenas letras).");
      hasError = true;
    }

    if (!isUsernameValid(username)) {
      setUsernameError("Por favor, insira um nome de usuário válido.");
      hasError = true;
    }

    if (!isEmailValidUfam(email)) {
      setEmailError(
        "Por favor, insira um email válido que contenha 'ufam' após '@'."
      );
      hasError = true;
    }

    if (!isPasswordValid(password)) {
      setPasswordError(
        "A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais."
      );
      hasError = true;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      setConfirmPasswordError("As senhas não coincidem.");
      hasError = true;
    }

    if (course === "" || hasError) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      hasError = true;
    }

    if (!isFirstIcon) {
      Alert.alert("Erro", "Você deve aceitar os termos de uso.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const userData = {
        perfilId: 1,
        nome: name,
        username: username,
        email: email,
        curso: course,
        senha: password,
      };

      setIsLoading(true);

      await createUser(userData);

      setName("");
      setUsername("");
      setEmail("");
      setCourse("");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setIsLoading(false);
      Alert.alert(
        "Erro",
        "Erro ao criar usuário. Por favor, tente novamente mais tarde."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButtonIcon}
        >
          <Ionicons name="arrow-back" size={24} color="darkblue" />
        </Pressable>
        <Text style={styles.title}>Criação de Conta Interna</Text>

        <Text style={styles.textStyle}>Nome</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite seu Nome"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError(
                isNameValid(text)
                  ? ""
                  : "Por favor, insira um nome válido (apenas letras)."
              );
            }}
            style={styles.inputField}
          />
        </View>
        {nameError ? (
          <Text style={styles.errorMessage}>{nameError}</Text>
        ) : null}

        <Text style={styles.textStyle}>Nome de Usuário</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite seu Nome de Usuário"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setUsernameError(
                isUsernameValid(text)
                  ? ""
                  : "Por favor, insira um nome de usuário válido."
              );
            }}
            style={styles.inputField}
          />
        </View>
        {usernameError ? (
          <Text style={styles.errorMessage}>{usernameError}</Text>
        ) : null}

        <Text style={styles.textStyle}>Email Institucional</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite seu email institucional"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(
                isEmailValidUfam(text)
                  ? ""
                  : "Por favor, insira um email válido e institucional."
              );
            }}
            style={styles.inputField}
          />
        </View>
        {emailError ? (
          <Text style={styles.errorMessage}>{emailError}</Text>
        ) : null}

        <Text style={styles.textStyle}>Curso</Text>
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
                    {selectedItem ? selectedItem : "Selecione seu curso"}
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

        <Text style={styles.textStyle}>Senha</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite sua Senha"
            value={password}
            onFocus={() => setShowPasswordRules(true)}
            onBlur={() => setShowPasswordRules(false)}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(
                isPasswordValid(text)
                  ? ""
                  : "A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais."
              );
            }}
            secureTextEntry={hidePassword}
            style={styles.inputField}
          />
          <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {showPasswordRules && <PasswordRequirements password={password} />}

        <Text style={styles.textStyle}>Confirmar a Senha</Text>
        <View
          style={[
            styles.boxInput,
            password !== confirmPassword ? styles.confirmPasswordInput : null,
          ]}
        >
          <TextInput
            placeholder="Digite sua Senha novamente"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError(
                passwordsMatch(password, text) ? "" : "As senhas não coincidem."
              );
            }}
            secureTextEntry={hideConfirmPassword}
            style={styles.inputField}
          />
          <Pressable
            onPress={toggleConfirmPasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={hideConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {confirmPasswordError ? (
          <Text style={styles.errorMessage}>{confirmPasswordError}</Text>
        ) : null}

        <View style={styles.checkboxContainer}>
          <Pressable onPress={() => setIsFirstIcon(!isFirstIcon)}>
            <MaterialCommunityIcons
              name={isFirstIcon ? "checkbox-marked" : "checkbox-blank-outline"}
              size={30}
              color={isFirstIcon ? "blue" : "darkgray"}
            />
          </Pressable>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.checkboxText}>
              Concordo com os termos de uso
            </Text>
          </Pressable>
        </View>

        <BlueButton
          onPress={handleSignUp}
          text={isLoading ? "Carregando..." : "Criar Conta"}
        />

        <TermsModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

export default InternalSignUpScreen;
