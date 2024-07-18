import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { RootStackParamList } from '../../../routes/types';
import { ButtonStyles, styles } from './styles';

type ChooseUserTypeScreenProp = StackNavigationProp<
  RootStackParamList,
  'UserOption'
>;

export const UserOption: React.FC = () => {
  const navigation = useNavigation<ChooseUserTypeScreenProp>();

  const navigateToInternalSignUp = () => {
    navigation.navigate('InternalSignUp');
  };

  const navigateToExternalSignUp = () => {
    navigation.navigate('ExternalSignUp');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleGoBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </Pressable>

      <View style={ButtonStyles(1).background}>
        <Pressable
          style={ButtonStyles(1).leftBox}
          onPress={navigateToInternalSignUp}
        >
          <Image source={require('../../../assets/equipe.png')} />
          <Text style={ButtonStyles(1).leftText}>Sou de dentro da UFAM</Text>
        </Pressable>

        <Pressable
          style={ButtonStyles(2).rightBox}
          onPress={navigateToExternalSignUp}
        >
          <Image source={require('../../../assets/professores.png')} />
          <Text style={ButtonStyles(2).rightText}>Sou de fora da UFAM</Text>
        </Pressable>
      </View>
    </View>
  );
};
