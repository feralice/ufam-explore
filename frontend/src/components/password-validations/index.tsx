import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { requirements } from "./constant";
import { styles } from "./styles";
import { PasswordRequirementsProps } from "./types";

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
}) => {
  return (
    <View style={styles.requirementsContainer}>
      {requirements.map((req, index) => (
        <View key={index} style={styles.requirementItem}>
          <Ionicons
            name={req.test(password) ? "checkmark-circle" : "close-circle"}
            size={16}
            color={req.test(password) ? "green" : "red"}
            style={styles.icon}
          />
          <Text style={styles.requirementText}>{req.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default PasswordRequirements;
