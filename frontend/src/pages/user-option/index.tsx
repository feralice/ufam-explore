import { useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { ButtonStyles } from "./styles";
import { BlueButton } from "../../components/blue-button";
import { Ionicons } from "@expo/vector-icons";

const people = require("../../assets/equipe.png");
const option2 = require("../../assets/professores.png");

export const UserOption = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const styles = ButtonStyles(selectedTab);

  return (
    <View style={styles.ButtonContainer}>
      <View style={styles.Background}>
        <Pressable
          style={styles.BorderLeft}
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Image source={option2}></Image>
          <Text style={styles.textoEsquerda}> Interno</Text>
        </Pressable>
        <Pressable
          style={styles.BorderRight}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Image source={people}></Image>
          <Text style={styles.textoDireita}> Externo </Text>
        </Pressable>
      </View>
      <BlueButton
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
        text={"Confirmar"}
      />
    </View>
  );
};
