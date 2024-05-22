import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";

export const ButtonStyles = (selectedTab: number) =>
  StyleSheet.create({
    ButtonContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
      color: "cadetblue",
    },
    Background: {
      width: "90%",
      height: 55,
      borderWidth: 0.5,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 5,
      paddingRight: 5,
    },
    BorderLeft: {
      width: "50%",
      height: "96%",
      backgroundColor: selectedTab == 0 ? "darkblue" : "cornflowerblue",
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    BorderRight: {
      width: "50%",
      height: "96%",
      backgroundColor: selectedTab == 1 ? "darkblue" : "cornflowerblue",
      borderRadius: 15,
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
  });
