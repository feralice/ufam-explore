import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { IStore } from "../../store";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CommentProp } from "./type";

export const Comments = ({ name, photo, text, action }: CommentProp) => {
  return (
    <View style={styles.container}>
      {photo ? (
        <Image style={styles.imagePerfil} source={{ uri: photo }} />
      ) : (
        <MaterialCommunityIcons name="account" size={30} color="#000" />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.username}>@{name}</Text>
          <Pressable onPress={action}>
            <MaterialCommunityIcons name="trash-can" size={25} color="#000" />
          </Pressable>
        </View>
        <Text style={styles.message}>{text}</Text>
      </View>
    </View>
  );
};