import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { BlueButton } from "../../components/blue-button";
import TermsModal from "../../components/modals/terms-modal";
import { LoginScreenNavigationProp } from "../../routes/types";
import { createUser } from "../../services/api";
import { ICreateUserRequest } from "../../services/types";
import { IStore } from "../../store";
import { UserInitialState } from "../../store/user/state";
import { cursos } from "../../utils/courses";
import { styles } from "./styles";

export const UserRegistration = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { control, handleSubmit, getValues, reset } =
    useForm<ICreateUserRequest>({
      defaultValues: UserInitialState.user,

      // Aqui abaixo é a validação que vai ser preciso criar para validar os campos
      // crie um schema yup dentro da pasta frontend\src\utils\schemas e apos isso coloque o schema abaixo no parametro

      //resolver: yupResolver(createPostSchema),
    });

  const [passwordValidation, setPasswordValidation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isFirstIcon, setIsFirstIcon] = useState(false);

  const profileId = useSelector((state: IStore) => state.user.profile.id);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmit = async (data: ICreateUserRequest) => {
    if (data.senha !== passwordValidation) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (!isFirstIcon) {
      Alert.alert("Erro", "Você deve concordar com os termos de uso.");
      return;
    }

    try {
      const userData = { ...data, perfilId: profileId };
      await createUser(userData);
      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso! Agora realize o login com a conta criada."
      );
      reset();
      setPasswordValidation("");
      setIsFirstIcon(false);
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      Alert.alert(
        "Erro",
        "Não foi possível criar a conta. Por favor, tente novamente mais tarde."
      );
    } finally {
      navigation.navigate("Login");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonIcon}
        >
          <Ionicons name="arrow-back" size={24} color="darkblue" />
        </TouchableOpacity>

        <Text style={styles.title}>Criação de Conta</Text>

        <Text style={styles.textStyle}>Nome</Text>
        <View style={styles.boxInput}>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputField}
                placeholder="Digite seu Nome"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <Text style={styles.textStyle}>Usuário</Text>
        <View style={styles.boxInput}>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputField}
                placeholder="Digite seu Nome de Usuário"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        {profileId === 1 ? (
          <>
            <Text style={styles.textStyle}>Email institucional</Text>
            <View style={styles.boxInput}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputField}
                    placeholder="Digite seu email institucional"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>

            <Text style={styles.textStyle}>Curso</Text>
            <View style={styles.boxInput}>
              <Controller
                control={control}
                name="curso"
                render={({ field: { onChange, value } }) => (
                  <Picker
                    selectedValue={value}
                    style={styles.inputField}
                    onValueChange={onChange}
                  >
                    <Picker.Item label="Selecione um curso" value="" />

                    {cursos.map((curso) => (
                      <Picker.Item label={curso} value={curso} key={curso} />
                    ))}
                  </Picker>
                )}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.textStyle}>Email</Text>
            <View style={styles.boxInput}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputField}
                    placeholder="Digite seu email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </>
        )}

        <Text style={styles.textStyle}>Senha</Text>
        <View style={styles.boxInput}>
          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputField}
                secureTextEntry={hidePassword}
                placeholder="Digite sua Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={16}
              />
            )}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.textStyle}>Confirmar Senha</Text>
        <View
          style={[
            styles.boxInput,
            {
              backgroundColor:
                getValues("senha") === passwordValidation
                  ? "rgba(0, 0, 139, 0.1)"
                  : "rgba(255, 0, 0, 0.1)",
            },
          ]}
        >
          <TextInput
            style={styles.inputField}
            secureTextEntry={hidePassword}
            placeholder="Digite sua Senha novamente"
            value={passwordValidation}
            onChangeText={setPasswordValidation}
            maxLength={16}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {getValues("senha") !== passwordValidation && (
          <Text style={styles.passwordMismatch}>As senhas não coincidem.</Text>
        )}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsFirstIcon(!isFirstIcon)}>
            <Ionicons
              name={isFirstIcon ? "checkbox" : "checkbox-outline"}
              size={30}
              color={isFirstIcon ? "blue" : "darkgray"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.checkboxText}>
              Concordo com os termos de uso
            </Text>
          </TouchableOpacity>
        </View>

        <BlueButton onPress={handleSubmit(onSubmit)} text="CRIAR CONTA" />
      </View>

      <TermsModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};
