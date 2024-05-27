import { TextInputProps } from "react-native-paper";

export interface CustomInputProps extends TextInputProps {
  multiline?: boolean;
  height?: number;
}
