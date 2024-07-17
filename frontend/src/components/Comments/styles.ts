import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imagePerfil: {
    borderRadius: 50,
    width: 30,
    height: 30,
    marginRight: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginVertical: 10,
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    fontWeight: "light",
    fontSize: 13,
  },
  button: {
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  message: {
    marginTop: 5,
    fontSize: 13,
  },
});
