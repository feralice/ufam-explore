import { StyleSheet } from "react-native";
import { deviceWidth } from "../../utils/get-device-width";

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  containerButton: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
  },
});
