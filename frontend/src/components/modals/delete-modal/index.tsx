import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import ConfirmationModal from '../confirm-modal';
import { Checkbox, Text } from 'react-native-paper';
import styles from './styles';

const DeleteModal = () => {
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
        text="Deseja desativar sua conta?"
      >
        <View style={styles.modalContent}>
          <Checkbox.Item
            label="Sim, desejo desativar minha conta."
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={toggleCheckbox}
          />
          {isSelected && (
          <Text style={styles.checkboxText}>
            Essa ação não pode ser desfeita.
          </Text>
        )}
        </View>
      </ConfirmationModal>
    </View>
  );
};

export default DeleteModal;
