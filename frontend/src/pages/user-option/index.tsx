import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { BlueButton } from "../../components/blue-button";
import { LoginScreenNavigationProp } from "../../routes/types";
import { setProfile } from "../../store/user/actions";
import { Profiles } from "../../store/user/types";
import { ButtonStyles } from "./styles";

const people = require("../../assets/equipe.png");
const option2 = require("../../assets/professores.png");

export const UserOption = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const styles = ButtonStyles(selectedTab);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleConfirm = () => {
    let profileName = Profiles.INTERNO;
    let idProfile = 1;
    if (selectedTab === 2) {
      idProfile = 2;
      profileName = Profiles.EXTERNO;
    }
    setProfile({ id: idProfile, nome: profileName });
    navigation.navigate("UserRegistration");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButtonIcon}
      >
        <Ionicons name="arrow-back" size={24} color="darkblue" />
      </TouchableOpacity>
      <View style={styles.background}>
        <Pressable
          style={styles.leftBox}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Image source={option2} />
          <Text style={styles.leftText}>Sou de dentro da UFAM</Text>
        </Pressable>
        <View style={styles.space}></View>
        <Pressable
          style={styles.rightBox}
          onPress={() => {
            setSelectedTab(2);
          }}
        >
          <Image source={people} />
          <Text style={styles.rightText}>Sou de fora da UFAM</Text>
        </Pressable>
      </View>
      <BlueButton onPress={handleConfirm} text={"Confirmar"} />
    </View>
  );
};
