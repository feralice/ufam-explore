import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface AreaModalProps {
  visible: boolean;
  onClose: () => void;
  selectArea: (area: string) => void;
  areas: string[];
}

const AreaModal: React.FC<AreaModalProps> = ({
  visible,
  onClose,
  selectArea,
  areas,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecione uma área</Text>
          <FlatList
            data={areas}
            keyExtractor={(item: any) => item}
            renderItem={({ item }: { item: string }) => (
              <TouchableOpacity
                style={styles.areaItem}
                onPress={() => selectArea(item)}
              >
                <Text style={styles.areaText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AreaModal;
