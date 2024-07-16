import React, {useState} from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import ConfirmationModal from '../confirm-modal';
import styles from './styles';

const SaveToCalendarModal = () => {
    const [isSelected, setSelection] = useState(false);


  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={true}
        onClose={() => {}}
        onConfirm={() => {}}
        loading={false}
        text="Evento salvo no Google Agenda!"
        showButtons={false}
      >

      <Pressable
          style={styles.botao} 
          onPress={() => {}}
        >
          <Text style={styles.textoBotao}>OK</Text>
        </Pressable>

      </ConfirmationModal>
    </View>
  );
};

export default SaveToCalendarModal;