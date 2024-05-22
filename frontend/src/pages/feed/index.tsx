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

export const FeedScreen = () => {
  return (
    <View style={ButtonStyles.ButtonContainer}>
      <View style={ButtonStyles.Background}>
        <TouchableOpacity style={ButtonStyles.Border}>
          <Text style={ButtonStyles.texto}> pedding</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ButtonStyles.Border}>
          <Text style={ButtonStyles.texto}> pedding </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ButtonStyles = StyleSheet.create({
  ButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Background: {
    width: "90%",
    height: 55,
    borderWidth: 0.5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  Border: {
    width: "50%",
    height: "96%",
    backgroundColor: "blue",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
