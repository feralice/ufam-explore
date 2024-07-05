import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { BlueButton } from "../../components/blue-button";
import { FeedScreenNavigationProp } from "../../routes/types";
import { login } from "../../services/api";
import { setUser } from "../../store/user/actions";
import { LoginSchema } from "../../utils/schemas/login.schema";
import { styles } from "./style";
import { FormData } from "./types";

const img_ufam = require("../../assets/lupa.png");
const img = require("../../assets/UfamExplore.png");

const Login = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await login(data);
      const {
        accessToken,
        id,
        perfilId,
        nome,
        email: userEmail,
        username,
        curso,
        fotoPerfil,
      } = response.data;

      const perfilIdNumber = Number(perfilId);

      await AsyncStorage.setItem("accessToken", accessToken);

      setUser({
        id,
        perfilId: perfilIdNumber,
        nome,
        email: userEmail,
        username,
        curso,
        fotoPerfil,
        isAuthenticated: true,
      });
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erro", "E-mail ou senha inválidos.");
      console.error("Login failed:", error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
          <View style={styles.imagem}>
            <Image style={{ paddingTop: 20 }} source={img} />
            <Image source={img_ufam} />
          </View>

          <View>
            <Text style={styles.text}>E-MAIL</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="nome@domínio.com"
                  style={[styles.input, styles.textArea]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            <Text style={styles.text}>SENHA</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.input, styles.passwordInput]}>
                  <TextInput
                    placeholder="Insira sua senha"
                    secureTextEntry={hidePassword}
                    style={[styles.passwordTextInput]}
                    maxLength={16}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <Pressable onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons
                      name={hidePassword ? "eye-off" : "eye"}
                      size={24}
                      color="gray"
                    />
                  </Pressable>
                </View>
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}

            <BlueButton
              onPress={handleSubmit(handleLogin)}
              text={isLoading ? "Carregando..." : "ENTRAR"}
            />
          </View>

          <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("UserOption")}>
              <Text style={styles.textAbaixo}>Criar conta</Text>
            </Pressable>
            <Text style={styles.textAbaixo}>Esqueci minha senha</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
