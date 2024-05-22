import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ButtonStyles } from "./styles";
import { useState } from "react";

export const Botton_navigation = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const styles = ButtonStyles(selectedTab);
  return (
    <View style={styles.ButtonContainer}>
      <View style={styles.Background}>
        <TouchableOpacity
          style={styles.BorderLeft}
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Text style={styles.textoEsquerda}> Geral</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BorderRight}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Text style={styles.textoDireita}> Curso </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
