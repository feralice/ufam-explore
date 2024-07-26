import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { BlueButton } from '../../../components/blue-button';
import { FeedScreenNavigationProp } from '../../../routes/types';
import { forgotPassword } from '../../../services/api';
import { isEmailValid } from '../../../utils/validations-utils';
import { styles } from './styles';

export const ResetPasswordEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const handleSend = async () => {
    if (!isEmailValid(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    }
    setIsLoading(true);
    try {
      await forgotPassword(email);
      Toast.show('Email enviado com sucesso!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      setIsLoading(false);
      navigation.navigate('ResetPasswordScreen');
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(
        'Erro',
        error.message === 'Usuário não encontrado.'
          ? 'Usuário não encontrado.'
          : 'Erro ao enviar email de redefinição de senha.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color="darkblue"
          />
        </Pressable>

        <Text style={styles.header}>RECUPERAÇÃO DE SENHA</Text>
        <Text style={styles.subHeader}>
          Para redefinir sua senha, informe o e-mail cadastrado na sua conta, e
          aguarde o recebimento do e-mail com instruções
        </Text>

        <View style={styles.boxInput}>
          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(
                isEmailValid(text) ? '' : 'Por favor, insira um email válido.'
              );
            }}
            style={styles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {emailError ? (
          <Text style={styles.errorMessage}>{emailError}</Text>
        ) : null}

        <BlueButton onPress={handleSend} loading={isLoading} text={'ENVIAR'} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
