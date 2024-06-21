import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { BottomSelectionProps } from "./interface";
import { ButtonStyles } from "./styles";

export const BottomSelection = ({ setTab }: BottomSelectionProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const styles = ButtonStyles(selectedTab);

  const handleTabPress = (tab: number) => {
    setSelectedTab(tab);
    setTab(tab);
  };

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.background}>
        <Pressable style={styles.borderLeft} onPress={() => handleTabPress(0)}>
          <Text style={styles.leftText}>Geral</Text>
        </Pressable>
        <Pressable style={styles.borderRight} onPress={() => handleTabPress(1)}>
          <Text style={styles.rightText}>Curso</Text>
        </Pressable>
      </View>
    </View>
  );
};
