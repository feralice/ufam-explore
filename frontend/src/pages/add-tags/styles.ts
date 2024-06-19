import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00186D",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  warning: {
    color: "red",
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00186D",
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tagWrapper: {
    margin: 4,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#00186D",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  selectedTag: {
    backgroundColor: "#4f83cc",
  },
  tagText: {
    color: "white",
    marginLeft: 4,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 4,
    padding: 4,
  },
  removeButtonText: {
    color: "white",
  },
  frequentTag: {
    backgroundColor: "#6c5ce7",
  },
  addButtonText: {
    color: "white",
    marginLeft: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
  },
  infoButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#00186DDA",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
