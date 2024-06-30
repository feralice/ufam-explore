import { StyleSheet } from "react-native";
import { deviceWidth } from "../../../utils/get-device-width";

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
    borderRadius: 20,
    padding: 35,
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
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  modalButtonConfirm: {
    backgroundColor: "#00186DDA",
  },
  modalButtonTextCancel: {
    color: "black",
    fontWeight: "bold",
  },
  modalButtonTextConfirm: {
    color: "white",
    fontWeight: "bold",
  },
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    width: deviceWidth * 0.4,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerButton: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
  },
  checkBoxContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
