import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface TempoModalProps {
  visible: boolean;
  onClose: () => void;
  selectTempo: (tempo: string) => void;
  tempos: string[];
}

const TempoModal: React.FC<TempoModalProps> = ({
  visible,
  onClose,
  selectTempo,
  tempos,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecione um período</Text>
          <FlatList
            data={tempos}
            keyExtractor={(item: any) => item}
            renderItem={({ item }: { item: string }) => (
              <TouchableOpacity
                style={styles.tempoItem}
                onPress={() => selectTempo(item)}
              >
                <Text style={styles.tempoText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TempoModal;
