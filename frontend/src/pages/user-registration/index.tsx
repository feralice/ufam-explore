import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { BlueButton } from "../../components/blue-button";

export const UserRegistration = () => {
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const equalPassword = passwordValidation == password;
  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const handleIconPress = () => {
    setIsFirstIcon(!isFirstIcon);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.textStyle, { marginTop: 20 }]}>Nome</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={{ padding: 10, width: "100%" }}
            placeholder="Digite seu Nome"
            value={name}
            onChangeText={setName}
          ></TextInput>
        </View>
        <Text style={styles.textStyle}>Nome do Usuário</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={{ padding: 10, width: "100%" }}
            placeholder="Digite seu  Nome de Usuário"
            value={userName}
            onChangeText={setUserName}
          ></TextInput>
        </View>
        <Text style={styles.textStyle}>Email</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={{ padding: 10, width: "100%" }}
            placeholder="Digite seu  email"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>
        <Text style={styles.textStyle}>Senha</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={{ padding: 10, width: "80%" }}
            secureTextEntry={hidePassword}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            maxLength={16}
          ></TextInput>
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
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
              backgroundColor: equalPassword
                ? "rgba(0, 0, 139, 0.2)"
                : "rgba(255, 0, 0, 0.2)",
            },
          ]}
        >
          <TextInput
            style={{ padding: 10, width: "80%" }}
            secureTextEntry={hidePassword}
            placeholder="Digite sua senha"
            value={passwordValidation}
            onChangeText={setPasswordValidation}
            maxLength={16}
          ></TextInput>
          {equalPassword ? null : (
            <Text style={{ color: "red" }}>Senha diferente</Text>
          )}
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleIconPress}
            style={{ flexDirection: "column" }}
          >
            {isFirstIcon ? (
              <Ionicons name="checkbox-outline" />
            ) : (
              <Ionicons name="checkbox" />
            )}
          </TouchableOpacity>
          <Text>Concordo com os termos de uso</Text>
        </View>
        <BlueButton
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"CRIAR CONTA"}
        />
      </View>
    </ScrollView>
  );
};
