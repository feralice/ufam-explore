import { useState } from 'react';
import { View, Text} from 'react-native';
import { Checkbox } from 'react-native-paper';
import ConfirmationModal from '../confirm-modal';
import styles from './styles';
import { BlueButton } from '../../blue-button';

const ChangePasswordModal = () => {
  
  return (
    <View style={styles.container}>  
        <Text>teste</Text>
      <ConfirmationModal
        visible={true}
        onClose={() => {}}
        onConfirm={() => {}}
        loading={false}
        text="Sua senha foi criada com sucesso"
        showButtons={false}
      >
        <View>
            <BlueButton 
                onPress={() => {}}
                loading={false}
                text={'ENTRAR'}
            >
            </BlueButton>
          
        </View>
      </ConfirmationModal>
    </View>
  );
};

export default ChangePasswordModal;
