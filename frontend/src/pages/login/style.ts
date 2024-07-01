import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  imagem: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  input: {
    backgroundColor: "rgba(0, 0, 139, 0.2)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "darkblue",
    padding: 10,
    marginVertical: 10,
    color: "darkblue",
    width: screenWidth * 0.8,
  },
  textArea: {
    height: 50,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth * 0.8,
  },
  passwordTextInput: {
    flex: 1,
    color: "darkblue",
  },
  text: {
    color: "darkblue",
  },
  textAbaixo: {
    color: "darkblue",
    textDecorationLine: "underline",
  },
});
