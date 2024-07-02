import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  profileSection: {
    width: "100%",
    backgroundColor: "rgba(0, 24, 109, 0.9)",
    alignItems: "center",
    paddingVertical: 50,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 50,
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 50,
    padding: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  texto: {
    color: "darkblue",
    fontSize: 20,
    right: 30,
  },
  textoAlternativo: {
    color: "black",
    fontSize: 15,
    right: 30,
    marginBottom: 20,
  },
  inputField: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  BoxInput: {
    backgroundColor: "rgba(0, 0, 139, 0.1)",
    width: 250,
    height: 30,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 3,
    borderColor: "darkblue",
  },
});
