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
    height: 100,
    width: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    padding: 0,
    borderRadius: 50,
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#F0F0F0",
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 15,
    gap: 20,
    paddingHorizontal: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#000000",
  },
});
