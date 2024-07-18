import { StyleSheet } from "react-native";

export const ButtonStyles = (selectedTab: number) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 30,
      color: "cadetblue",
      height: "100%",
    },
    background: {
      width: "75%",
      height: 250,
      justifyContent: "space-between",
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 5,
      paddingRight: 5,
    },
    leftBox: {
      width: "50%",
      height: "96%",
      backgroundColor:
        selectedTab === 1 ? "rgba(0, 0, 139, 0.3)" : "rgba(0, 0, 139, 0.2)",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1.5,
      marginRight: 10,
      borderColor: selectedTab === 1 ? "darkblue" : "transparent",
    },
    rightBox: {
      width: "50%",
      height: "96%",
      backgroundColor:
        selectedTab === 2 ? "rgba(0, 0, 139, 0.3)" : "rgba(0, 0, 139, 0.2)",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: selectedTab === 2 ? "darkblue" : "transparent",
    },
    space: {
      width: 10,
    },
    leftText: {
      color: selectedTab === 1 ? "#fff" : "#000",
      fontSize: 18,
      fontWeight: "700",
      textAlign: "center",
    },
    rightText: {
      color: selectedTab === 2 ? "#fff" : "#000",
      fontSize: 18,
      fontWeight: "700",
      textAlign: "center",
    },
    textStyle: {
      marginHorizontal: "12%",
      fontSize: 25,
      color: "blue",
      paddingTop: 18,
    },
    backButtonIcon: {
      position: "absolute",
      top: 40,
      left: 20,
    },
  });

  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    backButton: {
      position: "absolute",
      top: 50,
      left: 20,
      zIndex: 10,
    },
  });
  