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
    paddingVertical: 10,
    position: "absolute",
    top: height * 0.12,
    right: width * 0.08,
    width: 200,
  },
  option: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: height * 0.01,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  optionText: {
    marginLeft: 10,
    color: "darkblue",
  },
});
