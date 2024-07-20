import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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
      <View style={styles.modalContainer}>
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  courseItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  courseText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#002E7D',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default CursoModal;
