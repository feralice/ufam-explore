import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  View,
  Button,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { BlueButton } from "../../components/blue-button";
import { useState } from "react";

const img_ufam = require("../../assets/lupa.png");
const img = require("../../assets/UfamExplore.png");

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
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
            />

            <Text style={styles.text}>SENHA</Text>
            <View style={[styles.input, { flexDirection: "row" }]}>
              <TextInput
                placeholder="Insira sua senha"
                secureTextEntry={hidePassword}
                style={[{ width: "65%", color: "darkblue" }]}
                maxLength={16}
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

            <BlueButton
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
              text={"ENTRAR"}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.textAbaixo}>Criar conta</Text>
            <Text style={styles.textAbaixo}>Esqueci minha senha</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
