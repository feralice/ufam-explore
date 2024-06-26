import { StyleSheet } from "react-native";

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
    width: "100%",
  },
  textArea: {
    height: 50,
    width: 300,
  },
  text: {
    color: "darkblue",
  },
  textAbaixo: {
    color: "darkblue",
    textDecorationLine: "underline",
  },
});
