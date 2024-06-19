import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BlueButton } from "../../components/blue-button";
import { FeedScreenNavigationProp } from "../../routes/types";
import { login } from "../../services/api";
import { setUser } from "../../store/user/actions";
import { styles } from "./style";
import { FormData } from "./types";

const img_ufam = require("../../assets/lupa.png");
const img = require("../../assets/UfamExplore.png");

const Login = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { control, handleSubmit } = useForm<FormData>();
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async (data: FormData) => {
    try {
      const response = await login(data);
      const {
        accessToken,
        id,
        perfilId,
        nome,
        email: userEmail,
        username,
      } = response.data;

      const perfilIdNumber = Number(perfilId);

      await AsyncStorage.setItem("accessToken", accessToken);
      console.log("Token saved:", accessToken);

      setUser({
        id,
        perfilId: perfilIdNumber,
        nome,
        email: userEmail,
        username,
      });

      navigation.navigate("Home");
    } catch (error) {
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

            <Text style={styles.text}>SENHA</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.input, { flexDirection: "row" }]}>
                  <TextInput
                    placeholder="Insira sua senha"
                    secureTextEntry={hidePassword}
                    style={[{ width: "75%", color: "darkblue" }]}
                    maxLength={16}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}
                  >
                    <Ionicons
                      name={hidePassword ? "eye-off" : "eye"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />

            <BlueButton onPress={handleSubmit(handleLogin)} text={"ENTRAR"} />
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("UserOption")}>
              <Text style={styles.textAbaixo}>Criar conta</Text>
            </TouchableOpacity>
            <Text style={styles.textAbaixo}>Esqueci minha senha</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
