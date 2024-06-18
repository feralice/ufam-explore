import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { BlueButton } from "../../components/blue-button";
import TermsModal from "../../components/modals/terms-modal";
import { IStore } from "../../store";
import { styles } from "./styles";

export const UserRegistration = () => {
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstIcon, setIsFirstIcon] = useState(true);

  const passwordsMatch = passwordValidation === password;

  const profile = useSelector((state: IStore) => state.user.profile.id);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleCreateAccount = () => {
    //logica pra mandar pro back
    console.log("Criar conta com os dados:", {
      name,
      userName,
      email,
      password,
      passwordValidation,
      agreedToTerms: isFirstIcon,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Nome</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.inputField}
            placeholder="Digite seu Nome"
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.textStyle}>Nome do Usuário</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.inputField}
            placeholder="Digite seu Nome de Usuário"
            value={userName}
            onChangeText={setUserName}
          />
        </View>

        {profile === 1 ? (
          <>
            <Text style={styles.textStyle}>Email institucional</Text>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.inputField}
                placeholder="Digite seu email institucional"
                value={userName}
                onChangeText={setUserName}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.textStyle}>Email</Text>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.inputField}
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </>
        )}

        <Text style={styles.textStyle}>Senha</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.inputField}
            secureTextEntry={hidePassword}
            placeholder="Digite sua Senha"
            value={password}
            onChangeText={setPassword}
            maxLength={16}
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

        <Text style={styles.textStyle}>Confirmar Senha</Text>
        <View
          style={[
            styles.boxInput,
            {
              backgroundColor: passwordsMatch
                ? "rgba(0, 0, 139, 0.1)"
                : "rgba(255, 0, 0, 0.1)",
            },
          ]}
        >
          <TextInput
            style={styles.inputField}
            secureTextEntry={hidePassword}
            placeholder="Digite sua Senha novamente"
            value={passwordValidation}
            onChangeText={setPasswordValidation}
            maxLength={16}
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

        {!passwordsMatch && (
          <Text style={styles.passwordMismatch}>As senhas não coincidem.</Text>
        )}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsFirstIcon(!isFirstIcon)}>
            <Ionicons
              name={isFirstIcon ? "checkbox-outline" : "checkbox"}
              size={30}
              color={isFirstIcon ? "gray" : "blue"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.checkboxText}>
              Concordo com os termos de uso
            </Text>
          </TouchableOpacity>
        </View>

        <BlueButton onPress={handleCreateAccount} text="CRIAR CONTA" />
      </View>

      <TermsModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};
