import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../routes/types";

type ChooseUserTypeScreenProp = StackNavigationProp<
  RootStackParamList,
  "UserOption"
>;

export const UserOption = () => {
  const navigation = useNavigation<ChooseUserTypeScreenProp>();

  return (
    <View style={styles.container}>
      <Button
        title="Usuário Interno"
        onPress={() => navigation.navigate("InternalSignUp")}
      />
      <Button
        title="Usuário Externo"
        onPress={() => navigation.navigate("ExternalSignUp")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
