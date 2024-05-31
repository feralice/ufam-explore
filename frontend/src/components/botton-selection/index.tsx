import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ButtonStyles } from "./styles";

export const BottomSelection = () => {
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
          <Text style={styles.textoEsquerda}> Geral</Text>
        </Pressable>
        <Pressable
          style={styles.BorderRight}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Text style={styles.textoDireita}> Curso </Text>
        </Pressable>
      </View>
    </View>
  );
};
