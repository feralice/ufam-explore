import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  modalOverlay: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  popup: {
    borderRadius: 8,
    borderColor: "darkblue",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 10,
    position: "absolute",
    top: 20,
    right: 20,
    width: 200,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.01,
    borderBottomColor: "#ccc",
  },
  optionText: {
    color: "darkblue",
  },
  cogIcon: {
    position: "absolute",
    top: 20, 
    right: 20,
    padding: 10,
  }
});
