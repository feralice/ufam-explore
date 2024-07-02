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
import { BlueButton } from "../../components/blue-button";
import TermsModal from "../../components/modals/terms-modal";
import PasswordRequirements from "../../components/password-validations";
import { LoginScreenNavigationProp } from "../../routes/types";
import { createUser } from "../../services/api";
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
  isUsernameValid,
  passwordsMatch,
} from "../../utils/validations-utils";
import { styles } from "./styles";

const ExternalSignUpScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    setNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!isNameValid(name)) {
      setNameError("Por favor, insira um nome válido (apenas letras).");
      return;
    }

    if (!isUsernameValid(username)) {
      setUsernameError("Por favor, insira um nome de usuário válido.");
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError("Por favor, insira um email válido.");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError(
        "A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais."
      );
      return;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      setConfirmPasswordError("As senhas não coincidem.");
      return;
    }

    if (!isFirstIcon) {
      Alert.alert("Erro", "Você deve aceitar os termos de uso.");
      return;
    }

    setIsLoading(true);

    try {
      const profileId = 2;
      const userData = {
        perfilId: profileId,
        nome: name,
        username,
        email,
        senha: password,
      };

      await createUser(userData);

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsFirstIcon(false);
      setIsLoading(false);
      setModalVisible(false);

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    } catch (error) {
      setShowPasswordRules(true);
      console.error("Erro ao criar usuário:", error);
      Alert.alert(
        "Erro",
        "Erro ao criar usuário. Por favor, tente novamente mais tarde."
      );
      setIsLoading(false);
    } finally {
      navigation.navigate("Login");
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
        <Text style={styles.title}>Criação de Conta</Text>

        {/* Nome */}
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

        {/* Nome de Usuário */}
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

        {/* E-mail */}
        <Text style={styles.textStyle}>E-mail</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(
                isEmailValid(text) ? "" : "Por favor, insira um email válido."
              );
            }}
            style={styles.inputField}
          />
        </View>
        {emailError ? (
          <Text style={styles.errorMessage}>{emailError}</Text>
        ) : null}

        {/* Senha */}
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
            <MaterialCommunityIcons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {showPasswordRules && <PasswordRequirements password={password} />}
        {passwordError ? (
          <Text style={styles.errorMessage}>{passwordError}</Text>
        ) : null}

        {/* Confirmar a Senha */}
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
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={hideConfirmPassword}
            style={styles.inputField}
          />
          <Pressable
            onPress={toggleConfirmPasswordVisibility}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons
              name={hideConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {confirmPasswordError ? (
          <Text style={styles.errorMessage}>{confirmPasswordError}</Text>
        ) : null}
        {password !== confirmPassword && confirmPassword.length > 0 && (
          <Text style={styles.passwordMismatch}>As senhas não coincidem.</Text>
        )}

        {/* Checkbox dos termos */}
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

        {/* Botão de Registro */}
        <BlueButton
          onPress={handleSignUp}
          text={isLoading ? "Carregando..." : "Criar Conta"}
        />

        {/* Modal de Termos de Uso */}
        <TermsModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

export default ExternalSignUpScreen;
