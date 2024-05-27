import { TextInput } from "react-native";
import { styles } from "./styles";
import { CustomInputProps } from "./types";

export const CustomInput = (props: CustomInputProps) => {
  const {
    height,
    multiline,
    style,
    autoComplete,
    ...rest
  } = props;

  return (
    <TextInput
      style={[
        styles.input,
        multiline && styles.textArea,
        height ? { height } : {},
        style,
      ]}
      multiline={multiline}
      {...rest}
    />
  );
};
