import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#003366",
    textAlign: "center",
  },
  boxInput: {
    backgroundColor: "rgba(0, 0, 139, 0.1)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "darkblue",
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  textStyle: {
    marginTop: 20,
    fontSize: 18,
    color: "darkblue",
    marginBottom: 10,
    alignSelf: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  inputField: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxText: {
    color: "blue",
    textDecorationLine: "underline",
    marginLeft: 10,
  },
  passwordMismatch: {
    color: "red",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  backButtonIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    marginTop: 4,
  },
  confirmPasswordInput: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  pickerIcon: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: "black",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
  },
  inputAndroid: {
    color: "black",
    fontSize: 16,
    paddingVertical: 12,
    width: "100%",
  },
  placeholder: {
    color: "#9EA0A4",
    fontSize: 16,
  },
});
