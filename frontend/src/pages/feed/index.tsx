import { ScreenHeight } from "@rneui/base";
import React from "react";

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";

export const FeedScreen = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.userInfo}>
        <Image
          style={styles.imagePerfil}
          source={require("../../../../frontend/img_test.jpg")}
        />
        <Text> @NICK NAME </Text>
      </View>

      <Image
        style={styles.imageStyle}
        source={require("../../../../frontend/img_test.jpg")}
      />

      <View style={styles.interaction}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="chatbubbles-outline" size={25}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
          <Ionicons name="arrow-up-outline" size={25}></Ionicons>
          <Text> 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="arrow-down-outline" size={25}></Ionicons>
          <Text> 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="bookmark-outline" size={25}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};
