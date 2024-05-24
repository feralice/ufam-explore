import { StyleSheet } from "react-native";
import { deviceWidth } from "../../utils/get-device-width";

const radius = 20;
const proporcao = 0.08;

export const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth * (0.8 + proporcao),
    backgroundColor: "#f3f9ff",
    height: 250,
    borderRadius: radius,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderColor: "darkblue",
    borderWidth: 1,
    margin: deviceWidth * 0.06,
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
  },

  alignItems: {
    paddingHorizontal: 10,
  },
});
