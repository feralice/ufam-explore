import { ViewStyle } from "react-native";

export interface BlueButtonProps {
  onPress: () => void;
  loading?: boolean;
  text: string;
  style?: ViewStyle;
}
