import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type PasswordRequirementsProps = {
  password: string;
};

type Requirement = {
  label: string;
  test: (password: string) => boolean;
};

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
}) => {
  const requirements: Requirement[] = [
    {
      label: "Senha deve ter pelo menos 8 caracteres",
      test: (pw) => pw.length >= 8,
    },
    {
      label: "Senha deve ter pelo menos um caractere maiúsculo",
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      label: "Senha deve ter pelo menos um caractere minúsculo",
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      label: "Senha deve conter pelo menos um número",
      test: (pw) => /[0-9]/.test(pw),
    },
    {
      label: "Senha deve conter pelo menos um caractere especial",
      test: (pw) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

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

const styles = StyleSheet.create({
  requirementsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(91, 123, 252, 0.3)",
    borderRadius: 15,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  requirementText: {
    fontSize: 14,
    color: "darkblue",
  },
});

export default PasswordRequirements;
