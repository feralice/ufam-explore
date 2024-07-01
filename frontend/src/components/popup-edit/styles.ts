import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 4,
  },
  modalOverlay: {
    flex: 1,
    zIndex: 4,
  },
  safeAreaView: {
    flex: 1,
    zIndex: 4,
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
    zIndex: 4,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.01,
    borderBottomColor: "#ccc",
    zIndex: 4,
  },
  optionText: {
    zIndex: 4,
    color: "darkblue",
  },
  cogIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 4,
  },
});
