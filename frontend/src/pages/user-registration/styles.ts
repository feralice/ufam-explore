import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
  },
  boxInput: {
    backgroundColor: "rgba(0, 0, 139, 0.2)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "darkblue",
    width: "80%",
    height: 60,
    marginHorizontal: "auto",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    marginHorizontal: "12%",
    fontSize: 25,
    color: "blue",
    paddingTop: 18,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  icon: {
    fontSize: 30,
  },
});
