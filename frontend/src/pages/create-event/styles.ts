import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    paddingTop: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 15,
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
    paddingTop: 10,
    flexDirection: "row",
  },
  editText: {
    color: "#003366",
    marginTop: 5,
  },
  TextExplain: {
    color: "#003366",
    marginLeft: 10,
    fontWeight: "bold",
  },
  label: {
    color: "#003366",
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
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
  image: {
    alignSelf: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    width: 100,
    height: 100,
  },
  icon: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  required: {
    color: "red",
  },
});
