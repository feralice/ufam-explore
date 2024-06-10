import { ActivityIndicator, Pressable, Text } from "react-native";
import styles from "./styles";
import { BlueButtonProps } from "./types";

export const BlueButton = ({
  onPress,
  loading = false,
  text,
  style,
}: BlueButtonProps) => {
  return (
    <Pressable
      style={[styles.blueButton, style]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.blueButtonText}>{text}</Text>
      )}
    </Pressable>
  );
};
