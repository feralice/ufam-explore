import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
});
