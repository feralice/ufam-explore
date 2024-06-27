import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../routes/types";
import { ButtonStyles } from "./styles"; // Importe os estilos de botão

type ChooseUserTypeScreenProp = StackNavigationProp<
  RootStackParamList,
  "UserOption"
>;

export const UserOption: React.FC = () => {
  const navigation = useNavigation<ChooseUserTypeScreenProp>();

  const navigateToInternalSignUp = () => {
    navigation.navigate("InternalSignUp");
  };

  const navigateToExternalSignUp = () => {
    navigation.navigate("ExternalSignUp");
  };

  return (
    <View style={styles.container}>
      <View style={ButtonStyles(1).background}>
        <View style={ButtonStyles(1).leftBox}>
          <Image source={require("../../assets/equipe.png")} />
          <Button title="Usuário Interno" onPress={navigateToInternalSignUp} />
        </View>
        <View style={ButtonStyles(2).rightBox}>
          <Image source={require("../../assets/professores.png")} />
          <Button title="Usuário Externo" onPress={navigateToExternalSignUp} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
