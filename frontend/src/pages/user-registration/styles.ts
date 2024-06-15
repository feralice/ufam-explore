import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxModal: {
    alignContent: "center",
    backgroundColor: "#FFFFFF",
    width: "92%",
    height: "92%",
    marginHorizontal: "4%",
  },
  bigTitle: {
    color: "blue",
    fontSize: 25,
    fontWeight: "bold",
  },
  smallTitle: {
    color: "blue",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 4,
  },
  text: {
    fontSize: 10,
    paddingBottom: 8,
  },
});
