import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "darkblue",
    padding: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
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
    height: 200,
  },
  icones: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    width: "100%",
  },
  iconeWrapper: {
    alignItems: "center",
  },
  iconeText: {
    marginTop: 5,
    color: "darkblue",
    fontSize: 12,
  },
  perfil: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  imagePerfil: {
    borderRadius: 50,
    width: 30,
    height: 30,
    marginRight: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
  },
  tagWrapper: {
    backgroundColor: "rgba(0, 0, 139, 0.2)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "darkblue",
    padding: 5,
    margin: 5,
  },
  tagText: {
    color: "darkblue",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

