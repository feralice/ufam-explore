import { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import ConfirmationModal from '../confirm-modal';
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
