import React from 'react';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';

interface CursoModalProps {
  visible: boolean;
  onClose: () => void;
  selectCourse: (course: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  filteredCourses: string[];
}

const CursoModal: React.FC<CursoModalProps> = ({
  visible,
  onClose,
  selectCourse,
  searchText,
  setSearchText,
  filteredCourses,
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
          <Text style={styles.modalTitle}>Selecione um curso</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={filteredCourses}
            keyExtractor={(item: any) => item}
            renderItem={({ item }: { item: string }) => (
              <TouchableOpacity
                style={styles.courseItem}
                onPress={() => selectCourse(item)}
              >
                <Text style={styles.courseText}>{item}</Text>
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

export default CursoModal;
