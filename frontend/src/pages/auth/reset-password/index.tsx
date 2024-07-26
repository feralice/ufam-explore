import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { styles } from './styles';
import { BlueButton } from '../../../components/blue-button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FeedScreenNavigationProp } from '../../../routes/types';
import { isPasswordValid } from '../../../utils/validations-utils';
import PasswordRequirements from '../../../components/password-validations';

export const ResetPasswordScreen = () => {
    

  return (
    <View style={styles.container}>

      <Text style={styles.header}>REDEFINIR SUA SENHA</Text>
      <Text style={styles.subHeader}>Preencha os campos abaixo:</Text>

 
        <BlueButton 
            onPress={() => {}}
            loading={false}
            text={'ENTRAR'}
            >
        </BlueButton>
    </View>
  );
};