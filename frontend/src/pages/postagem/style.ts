import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    gap: 10,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "darkblue",
    padding: 10,
    margin: 10,
  },
  input: {
    backgroundColor: "rgba(0, 0, 139, 0.2)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "darkblue",
    padding: 10,
    margin: 15,
    color: "darkblue",
  },
  textArea: {
    height: 200,
  },
  imagem: {
    width: 300,
    height: 200,
    borderRadius: 10,
    margin: 15,
  },
  icones: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  perfil: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },
  imagePerfil: {
    display: "flex",
    alignItems: "center",
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  publicarButton: {
    backgroundColor: "darkblue",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    marginTop: 20,
  },
  publicarButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default styles;
