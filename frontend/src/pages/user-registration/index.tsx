import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { BlueButton } from "../../components/blue-button";
import TermsModal from "../../components/modals/terms-modal";
import PasswordRequirements from "../../components/password-validations";
import { LoginScreenNavigationProp } from "../../routes/types";
import { createUser } from "../../services/api";
import { ICreateUserRequest } from "../../services/types";
import { IStore } from "../../store";
import { UserInitialState } from "../../store/user/state";
import { cursos } from "../../utils/courses";
import { validatePassword } from "../../utils/validate-password";
import { styles } from "./styles";

export const UserRegistration = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const profileId = useSelector((state: IStore) => state.user.profile.id);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    trigger,
  } = useForm<ICreateUserRequest>({
    defaultValues: UserInitialState.user,
    shouldUnregister: false,
  });

  const [passwordValidation, setPasswordValidation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isFirstIcon, setIsFirstIcon] = useState(false);
  const [confirmPasswordVisited, setConfirmPasswordVisited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmit = async (data: ICreateUserRequest) => {
    setIsLoading(true);

    try {
      const passwordValid = validatePassword(data.senha);

      if (passwordValid !== true) {
        Alert.alert("Erro", passwordValid);
        return;
      }

      if (data.senha !== passwordValidation) {
        Alert.alert("Erro", "As senhas não coincidem.");
        return;
      }

      if (!isFirstIcon) {
        Alert.alert("Erro", "Você deve concordar com os termos de uso.");
        return;
      }

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
    } catch (error: any) {
      if (error.response.status === 409) {
        Alert.alert("Erro", "Usuário já cadastrado.");
        return;
      }

      console.error("Erro ao criar usuário:", error);
      Alert.alert(
        "Erro",
        "Não foi possível criar a conta. Por favor, tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
      navigation.navigate("Login");
    }
  };

  const handleInputChange = async (
    field:
      | "perfilId"
      | "nome"
      | "username"
      | "email"
      | "senha"
      | "curso"
      | ("perfilId" | "nome" | "username" | "email" | "senha" | "curso")[]
      | readonly (
          | "perfilId"
          | "nome"
          | "username"
          | "email"
          | "senha"
          | "curso"
        )[]
      | undefined,
    value: string
  ) => {
    await trigger(field);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setPasswordValidation(text);
    setConfirmPasswordVisited(true);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButtonIcon}
        >
          <Ionicons name="arrow-back" size={24} color="darkblue" />
        </Pressable>
        <Text style={styles.title}>Criação de Conta</Text>

        {/* Nome */}
        <Text style={styles.textStyle}>Nome</Text>
        <View style={styles.boxInput}>
          <Controller
            control={control}
            name="nome"
            rules={{
              required: "Nome é obrigatório",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s']*$/,
                message: "O nome deve conter apenas letras e espaços",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite seu Nome"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                    handleInputChange("nome", text);
                  }}
                  value={value}
                />
              </>
            )}
          />
        </View>
        {errors.nome && (
          <Text style={styles.errorMessage}>{errors.nome.message}</Text>
        )}

        {/* Usuário */}
        <Text style={styles.textStyle}>Usuário</Text>
        <View style={styles.boxInput}>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Nome de usuário é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9_]*$/,
                message: "O usuário deve conter apenas letras, números e _",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite seu Nome de Usuário"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                    handleInputChange("username", text);
                  }}
                  value={value}
                />
              </>
            )}
          />
        </View>
        {errors.username && (
          <Text style={styles.errorMessage}>{errors.username.message}</Text>
        )}

        {/* Email e Curso (se perfilId for 1) */}
        {profileId === 1 ? (
          <>
            <Text style={styles.textStyle}>Email institucional</Text>
            <View style={styles.boxInput}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[\w.-]*@[\w-]+(\.[\w-]+)+$/i,
                    message: "Por favor, insira um email válido",
                  },
                  validate: (value) => {
                    const domain = value.split("@")[1];
                    return (
                      domain.includes("ufam") ||
                      "Por favor, insira um email institucional da UFAM"
                    );
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={styles.inputField}
                      placeholder="Digite seu email institucional"
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                        handleInputChange("email", text);
                      }}
                      value={value}
                    />
                  </>
                )}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorMessage}>{errors.email.message}</Text>
            )}

            {/* Curso */}
            <Text style={styles.textStyle}>Curso</Text>
            <View style={styles.boxInput}>
              <Controller
                control={control}
                name="curso"
                rules={{
                  required: "Curso é obrigatório",
                }}
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
            {errors.curso && (
              <Text style={styles.errorMessage}>{errors.curso.message}</Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.textStyle}>Email</Text>
            <View style={styles.boxInput}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[\w.-]*@[\w-]+(\.[\w-]+)+$/i,
                    message: "Por favor, insira um email válido",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputField}
                    placeholder="Digite seu email"
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text);
                      handleInputChange("email", text);
                    }}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorMessage}>{errors.email.message}</Text>
            )}
          </>
        )}

        {/* Senha */}
        <Text style={styles.textStyle}>Senha</Text>
        <View style={styles.boxInput}>
          <Controller
            control={control}
            name="senha"
            rules={{
              required: "Senha é obrigatória",
              validate: validatePassword,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.inputField}
                  secureTextEntry={hidePassword}
                  placeholder="Digite sua Senha"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                    handleInputChange("senha", text);
                  }}
                  value={value}
                  maxLength={16}
                />
                <Pressable
                  onPress={togglePasswordVisibility}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={hidePassword ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
                </Pressable>
              </>
            )}
          />
        </View>
        {errors.senha && errors.senha.type === "required" && (
          <Text style={styles.errorMessage}>{errors.senha.message}</Text>
        )}

        {/* Requisitos de Senha */}
        {getValues("senha") && (
          <PasswordRequirements password={getValues("senha")} />
        )}

        {/* Confirmar Senha */}
        <Text style={styles.textStyle}>Confirmar Senha</Text>
        <View
          style={[
            styles.boxInput,
            confirmPasswordVisited && getValues("senha") !== passwordValidation
              ? styles.confirmPasswordInput
              : null,
          ]}
        >
          <TextInput
            style={styles.inputField}
            secureTextEntry={hidePassword}
            placeholder="Digite sua Senha novamente"
            value={passwordValidation}
            onChangeText={handleConfirmPasswordChange}
            maxLength={16}
          />
          <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {confirmPasswordVisited &&
          getValues("senha") !== passwordValidation && (
            <Text style={styles.errorMessage}>As senhas não coincidem.</Text>
          )}

        {/* Checkbox de Concordo com os termos */}
        <View style={styles.checkboxContainer}>
          <Pressable onPress={() => setIsFirstIcon(!isFirstIcon)}>
            <Ionicons
              name={isFirstIcon ? "checkbox" : "checkbox-outline"}
              size={30}
              color={isFirstIcon ? "blue" : "darkgray"}
            />
          </Pressable>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.checkboxText}>
              Concordo com os termos de uso
            </Text>
          </Pressable>
        </View>

        {/* Botão de Registro */}
        <BlueButton
          onPress={handleSubmit(onSubmit)}
          text={isLoading ? "Carregando..." : "Criar Conta"}
        />
        {/* Modal de Termos de Uso */}
        <TermsModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

export default UserRegistration;
