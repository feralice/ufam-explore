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
    paddingBottom: 35,
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
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textStyle: {
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
});
