import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import ConfirmationModal from '../confirm-modal';
import { Checkbox, Text } from 'react-native-paper';
import styles from './styles';

const ChangeModal = () => {
    const [isSelected, setSelection] = useState(false);

    const toggleCheckbox = () => {
        setSelection(!isSelected);
      };

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={true}
        onClose={() => {}}
        onConfirm={() => {}}
        loading={false}
        text="Deseja salvar essas alterações?"
      >
        <View style={styles.modalContent}>
          <Checkbox.Item
            label="Sim, desejo salvar essas alterações"
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={toggleCheckbox}
          />
        </View>
      </ConfirmationModal>
    </View>
  );
};

export default ChangeModal;



