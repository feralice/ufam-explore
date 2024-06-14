import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#003366",
    textAlign: "center",
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dateTimeContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  editText: {
    color: "#003366",
    marginLeft: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});
