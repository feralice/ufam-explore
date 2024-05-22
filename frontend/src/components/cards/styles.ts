import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const radius = 20;
const proporcao = 0.08;

export const styles = StyleSheet.create({
  // area para estyle do card
  cardContainer: {
    width: deviceWidth * (0.8 + proporcao),
    backgroundColor: "#f3f9ff",
    height: 220,
    borderRadius: radius,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 40,
    margin: deviceWidth * 0.06,
  },

  imageStyle: {
    height: 120,
    width: deviceWidth * (0.78 + proporcao),
    borderRadius: radius,
    opacity: 0.9,
    marginLeft: 5,
    justifyContent: "flex-start",
  },

  imagePerfil: {
    display: "flex",
    alignItems: "center",
    borderRadius: 50,
    width: 30,
    height: 30,
  },

  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },

  interaction: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 5,
    padding: "auto",
    paddingTop: 7,
  },

  icon: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    padding: "auto",
  },

  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -35,
  },
});
