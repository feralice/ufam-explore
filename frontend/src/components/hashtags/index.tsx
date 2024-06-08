import { Text, View } from "react-native";
import { styles } from "./styles";
import { TagProps } from "./types";

export const HashtagInPost = ({ name }: TagProps) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>#{name}</Text>
    </View>
  );
};
