import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    marginVertical: 15,
    backgroundColor: "#FFFFFF",
    width: "90%",
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  closeIcon: {
    fontSize: 30,
    color: "blue",
  },
  bigTitle: {
    color: "blue",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  smallTitle: {
    color: "blue",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 4,
  },
  text: {
    fontSize: 12,
    paddingBottom: 8,
    textAlign: "justify",
  },
});
