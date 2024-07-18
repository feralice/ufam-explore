import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    paddingTop: 35,
    alignItems: "center",
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
    width: windowWidth - 40,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
  dateTimeContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editContainer: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  editText: {
    color: "#003366",
    marginTop: 5,
  },
  label: {
    color: "#003366",
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    width: "100%",
    paddingHorizontal: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontSize: 16,
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
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  icon: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
