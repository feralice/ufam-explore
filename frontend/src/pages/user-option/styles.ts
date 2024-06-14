import { StyleSheet } from "react-native";

export const ButtonStyles = (selectedTab: number) =>
  StyleSheet.create({
    ButtonContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 30,
      color: "cadetblue",
      height: "50%",
    },
    Background: {
      width: "75%",
      height: 250,
      justifyContent: "space-between",
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 5,
      paddingRight: 5,
    },
    BorderLeft: {
      width: "50%",
      height: "96%",
      backgroundColor:
        selectedTab == 0 ? "rgba(0, 0, 139, 0.3)" : "rgba(0, 0, 139, 0.2)",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    BorderRight: {
      width: "50%",
      height: "96%",
      backgroundColor:
        selectedTab == 1 ? "rgba(0, 0, 139, 0.3)" : "rgba(0, 0, 139, 0.2)",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    textoEsquerda: {
      color: selectedTab == 0 ? "#fff" : "#000",
      fontSize: 18,
      fontWeight: "700",
    },
    textoDireita: {
      color: selectedTab == 1 ? "#fff" : "#000",
      fontSize: 18,
      fontWeight: "700",
    },
    textStyle: {
      marginHorizontal: "12%",
      fontSize: 25,
      color: "blue",
      paddingTop: 18,
    },
  });
