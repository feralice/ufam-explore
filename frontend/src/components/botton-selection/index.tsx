import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from "./styles";

export const BottomSelection = () => {
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
