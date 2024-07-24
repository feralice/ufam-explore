import { useState } from 'react';
import { Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import ConfirmationModal from '../confirm-modal';
import styles from './styles';
import { ConfirmDeleteModalProps } from './types';

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  visible,
  onClose,
  onConfirmAction,
  confirmationText,
  checkboxLabel,
  additionalText,
}) => {
  const [isSelected, setSelection] = useState(false);
  const [error, setError] = useState('');

  const toggleCheckbox = () => {
    setSelection(!isSelected);
    if (error) {
      setError('');
    }
  };

  const handleConfirm = async () => {
    if (!isSelected) {
      setError('Você deve marcar o checkbox para confirmar.');
      return;
    }

    try {
      await onConfirmAction();
      setError('');
      Toast.show('Exclusão realizada com sucesso!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      onClose();
    } catch (error) {
      console.error(error);
      setError('Não foi possível completar a ação');
    }
  };

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={visible}
        onClose={onClose}
        onConfirm={handleConfirm}
        loading={false}
        text={confirmationText}
        confirmDisabled={!isSelected}
      >
        <View style={styles.modalContent}>
          <Checkbox.Item
            label={checkboxLabel}
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={toggleCheckbox}
            color="#00186DDA"
          />
          {isSelected && (
            <Text style={styles.checkboxText}>{additionalText}</Text>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </ConfirmationModal>
    </View>
  );
};
