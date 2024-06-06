import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  popup: {
    borderRadius: 8,
    borderColor: "darkblue",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 10,
    position: "absolute",
    top: 30,
    right: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomColor: "#ccc",
  },
  texto: {
    color: "darkblue",
  },
});
