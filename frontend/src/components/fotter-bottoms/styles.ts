// styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 16,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#00186D",
    padding: 16,
    borderRadius: 4,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  modalButtonConfirm: {
    backgroundColor: "#6c5ce7",
  },
  modalButtonTextCancel: {
    color: "black",
    fontWeight: "bold",
  },
  modalButtonTextConfirm: {
    color: "white",
    fontWeight: "bold",
  },
});
