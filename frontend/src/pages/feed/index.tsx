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
import { styles } from "../../components/cards/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { PostCard } from "../../components/cards/index";
import { Botton_navigation } from "../../components/botton-selection";

export const FeedScreen = () => {
  return (
    <View>
      <View style={{ alignItems: "center", paddingTop: 10 }}>
        <Image source={require("../../../assets/tituloufam.png")}></Image>
      </View>

      <View style={{ padding: 30, marginTop: -40 }}>
        <Botton_navigation></Botton_navigation>
      </View>
      <View style={{ marginTop: 20 }}>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
      </View>
    </View>
  );
};
