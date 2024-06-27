import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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

  const handleSignUp = () => {
    // Implementação da lógica de cadastro aqui
    if (!isNameValid()) {
      setNameError("Por favor, insira um nome válido (apenas letras).");
      return;
    } else {
      setNameError("");
    }

    if (!isUsernameValid()) {
      setUsernameError("Por favor, insira um nome de usuário válido.");
      return;
    } else {
      setUsernameError("");
    }

    if (!isEmailValid()) {
      setEmailError("Por favor, insira um email válido.");
      return;
    } else {
      setEmailError("");
    }

    if (!isPasswordValid()) {
      setPasswordError(
        "A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais."
      );
      return;
    } else {
      setPasswordError("");
    }

    if (!passwordsMatch()) {
      setConfirmPasswordError("As senhas não coincidem.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    // Lógica de cadastro bem-sucedida
    alert("Cadastro realizado com sucesso!");
    // Redirecionar ou outra ação necessária após o cadastro
  };

  const isNameValid = () => {
    return /^[a-zA-Z ]+$/.test(name);
  };

  const isUsernameValid = () => {
    // Exemplo básico de validação de nome de usuário
    return /^[a-zA-Z0-9_]{4,}$/.test(username);
  };

  const isEmailValid = () => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email);
  };

  const isPasswordValid = () => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  const passwordsMatch = () => {
    return password === confirmPassword;
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
        <Text style={styles.title}>Criação de Conta</Text>

        <Text style={styles.textStyle}>Nome</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite seu Nome"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError(
                isNameValid()
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
                isUsernameValid()
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

        <Text style={styles.textStyle}>E-mail</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(
                isEmailValid() ? "" : "Por favor, insira um email válido."
              );
            }}
            style={styles.inputField}
          />
        </View>
        {emailError ? (
          <Text style={styles.errorMessage}>{emailError}</Text>
        ) : null}

        <Text style={styles.textStyle}>Senha</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite sua Senha"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(
                isPasswordValid()
                  ? ""
                  : "A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais."
              );
            }}
            secureTextEntry={hidePassword}
            style={styles.inputField}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorMessage}>{passwordError}</Text>
        ) : null}

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
                passwordsMatch() ? "" : "As senhas não coincidem."
              );
            }}
            secureTextEntry={hideConfirmPassword}
            style={styles.inputField}
          />
          <TouchableOpacity
            onPress={toggleConfirmPasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={hideConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? (
          <Text style={styles.errorMessage}>{confirmPasswordError}</Text>
        ) : null}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity>
            <Ionicons name="checkbox-outline" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>Concordo com os termos de uso</Text>
        </View>

        <TouchableOpacity onPress={handleSignUp}>
          <Text>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExternalSignUpScreen;
