import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";

const profileImage = require("../../../../frontend/assets/img_test.jpg");

export const PostCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.userInfo}>
          <Image style={styles.imagePerfil} source={profileImage} />
          <Text>@nickname</Text>
        </View>

        <Image style={styles.imageStyle} source={profileImage} />

        <View style={styles.interaction}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="chatbubbles-outline" size={25} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Ionicons name="arrow-up-outline" size={25} />
            <Text>3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Ionicons name="arrow-down-outline" size={25} />
            <Text>3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Ionicons name="bookmark-outline" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
