import React, { useState } from 'react';
import { View, Text, TextInput, Pressable} from 'react-native';
import { styles } from './styles';
import { BlueButton } from '../../../components/blue-button';
import { isEmailValid } from '../../../utils/validations-utils';
import { FeedScreenNavigationProp } from '../../../routes/types';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ResetPasswordEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation<FeedScreenNavigationProp>();

  return (
    
    <View style={styles.container}>

    <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="darkblue" />
      </Pressable>

      <Text style={styles.header}>RECUPERAÇÃO DE SENHA</Text>
      <Text style={styles.subHeader}>Para redefinir sua senha, informe o e-mail cadastrado na sua conta, e aguarde o recebimento do e-mail com instruções</Text>
      
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
          />
        </View>
        {emailError ? (
          <Text style={styles.errorMessage}>{emailError}</Text>
        ) : null}
      
        <BlueButton 
            onPress={() => {}}
            loading={false}
            text={'ENVIAR'}
            >
        </BlueButton>
    </View>
  );
};