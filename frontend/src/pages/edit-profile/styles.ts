import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  profileSection: {
    width: "100%",
    backgroundColor: "#00186D",
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
  profileName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  cogIcon: {
    position: "absolute",
    top: 20, 
    right: 20,
    padding: 10,
  }
});
