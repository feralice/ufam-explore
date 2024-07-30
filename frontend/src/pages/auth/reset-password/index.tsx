import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import { BlueButton } from '../../../components/blue-button';
import PasswordRequirements from '../../../components/password-validations';
import { resetPassword } from '../../../services/api';
import { isPasswordValid } from '../../../utils/validations-utils';
import { styles } from './styles';

const CELL_COUNT = 6;

export const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useBlurOnFulfill({ value: token, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: token,
    setValue: setToken,
  });

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  const handleResetPassword = async () => {
    if (!/^\d{6}$/.test(token)) {
      Alert.alert('Erro', 'O token deve ser um número de 6 dígitos.');
      return;
    }
    if (!isPasswordValid(password)) {
      setPasswordError(
        'A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.'
      );
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({ token, newPassword: password });
      Toast.show('Senha redefinida com sucesso!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      setIsLoading(false);
      navigation.goBack();
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(
        'Erro',
        error.message === 'Token de redefinição de senha inválido ou expirado.'
          ? 'Token de redefinição de senha inválido ou expirado.'
          : 'Erro ao redefinir a senha.'
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
    >
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="darkblue" />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.header}>REDEFINIR SUA SENHA</Text>
        <Text style={styles.subHeader}>
          Preencha os campos abaixo para redefinir sua senha.
        </Text>
        <Text style={styles.instructions}>
          Insira o token que você recebeu por e-mail junto com sua nova senha.
        </Text>

        <Text style={styles.textStyle}>Token</Text>
        <CodeField
          ref={ref}
          {...props}
          value={token}
          onChangeText={setToken}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <Text style={styles.textStyle}>Senha</Text>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite sua Senha"
            value={password}
            onFocus={() => {
              setShowPasswordRules(true);
              setIsPasswordFocused(true);
            }}
            onBlur={() => {
              setShowPasswordRules(false);
              setIsPasswordFocused(false);
            }}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(
                isPasswordValid(text)
                  ? ''
                  : 'A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.'
              );
            }}
            secureTextEntry={hidePassword}
            style={styles.inputField}
          />
          <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <MaterialCommunityIcons
              name={hidePassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {showPasswordRules && <PasswordRequirements password={password} />}
        {passwordError ? (
          <Text style={styles.errorMessage}>{passwordError}</Text>
        ) : null}

        <Text style={styles.textStyle}>Confirmar a Senha</Text>
        <View
          style={[
            styles.boxInput,
            password !== confirmPassword ? styles.confirmPasswordInput : null,
          ]}
        >
          <TextInput
            placeholder="Digite sua Senha novamente"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={hideConfirmPassword}
            style={styles.inputField}
          />
          <Pressable
            onPress={toggleConfirmPasswordVisibility}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons
              name={hideConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>
        {confirmPasswordError ? (
          <Text style={styles.errorMessage}>{confirmPasswordError}</Text>
        ) : null}
        {password !== confirmPassword && confirmPassword.length > 0 && (
          <Text style={styles.passwordMismatch}>As senhas não coincidem.</Text>
        )}

        <BlueButton
          onPress={handleResetPassword}
          loading={isLoading}
          text={'REDEFINIR'}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
