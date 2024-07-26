import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { styles } from "./styles";
import { BlueButton } from "../../../components/blue-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FeedScreenNavigationProp } from "../../../routes/types";
import { isPasswordValid } from "../../../utils/validations-utils";
import PasswordRequirements from "../../../components/password-validations";

export const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REDEFINIR SUA SENHA</Text>
      <Text style={styles.subHeader}>Preencha os campos abaixo:</Text>
      <Text style={styles.textStyle}>Senha</Text>
      <View style={styles.boxInput}>
        <TextInput
          placeholder="Digite sua Senha"
          value={password}
          onFocus={() => {
            setShowPasswordRules(true);
            setIsPasswordFocused(true);
          }}
          onBlur={() => {
            setShowPasswordRules(false);
            setIsPasswordFocused(false);
          }}
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

      <BlueButton
        onPress={() => {}}
        loading={false}
        text={"ENTRAR"}
      ></BlueButton>
    </View>
  );
};
