import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "./style";
import { NotificationProp } from "./type";

export const NotificationItem = (props: NotificationProp) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.text}>
        @{props.username} {props.notificationType}
      </Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};
