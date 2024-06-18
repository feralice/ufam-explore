import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
import { styles } from "./style";

const img_ufam = require("../../assets/lupa.png");
const img = require("../../assets/UfamExplore.png");

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<FeedScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      const { accessToken } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      console.log("Token saved:", accessToken);

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
            <TextInput
              placeholder="nome@domínio.com"
              style={[styles.input, styles.textArea]}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.text}>SENHA</Text>
            <View style={[styles.input, { flexDirection: "row" }]}>
              <TextInput
                placeholder="Insira sua senha"
                secureTextEntry={hidePassword}
                style={[{ width: "75%", color: "darkblue" }]}
                maxLength={16}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons
                  name={hidePassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <View />

            <BlueButton onPress={handleLogin} text={"ENTRAR"} />
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
