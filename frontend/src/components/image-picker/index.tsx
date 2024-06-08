import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ImagePickerProps } from "./types";

export const ImagePickerComponent = ({ image, onPress }: ImagePickerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.imagePicker}>
      {image ? (
        <Image source={{ uri: image }} style={styles.imagem} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <MaterialCommunityIcons
            name="camera-plus-outline"
            size={50}
            color="gray"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
