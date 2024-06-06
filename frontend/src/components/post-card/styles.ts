import { StyleSheet } from "react-native";
import { deviceWidth } from "../../utils/get-device-width";

const radius = 20;
const proporcao = 0.08;

export const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth * (0.8 + proporcao),
    backgroundColor: "#FFF",
    borderRadius: radius,
    borderColor: "darkblue",
    borderWidth: 1,
    margin: deviceWidth * 0.06,
    padding: 10,
    maxHeight: 360,
    overflow: "hidden",
  },

  imageStyle: {
    height: 140,
    width: "100%",
    borderRadius: radius,
    opacity: 0.9,
    justifyContent: "center",
    alignSelf: "center",
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
    alignItems: "center",
    gap: 10,
    padding: 15,
  },

  interaction: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    padding: 10,
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
    color: "white",
  },

  alignItems: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  text: {
    fontSize: 14,
    paddingBottom: 10,
  },
});
