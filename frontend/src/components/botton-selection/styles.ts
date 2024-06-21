import { StyleSheet } from "react-native";

export const ButtonStyles = (selectedTab: number) =>
  StyleSheet.create({
    buttonContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 30,
      color: "cadetblue",
    },
    background: {
      width: "90%",
      height: 45,
      justifyContent: "center",
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 5,
      paddingRight: 5,
    },
    borderLeft: {
      width: "50%",
      height: "96%",
      backgroundColor: selectedTab == 0 ? "darkblue" : "cornflowerblue",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    borderRight: {
      width: "50%",
      height: "96%",
      backgroundColor: selectedTab == 1 ? "darkblue" : "cornflowerblue",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    leftText: {
      color: selectedTab == 0 ? "#fff" : "#000",
      fontSize: 18,
      fontWeight: "700",
    },
    rightText: {
      color: selectedTab == 1 ? "#fff" : "#000",
      fontSize: 18,
      fontWeight: "700",
    },
  });
