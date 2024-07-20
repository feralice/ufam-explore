import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { cursos } from '../../../utils/courses';

const FilteredFeed = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('Cursos');

  const filters = ['Exatas', selectedCourse, 'Esta semana'];

  const toggleFilter = (filter: string) => {
    if (filter === 'Cursos' || cursos.includes(filter)) {
      setModalVisible(true);
    } else {
      setSelectedFilters((prevSelectedFilters: string[]) =>
        prevSelectedFilters.includes(filter)
          ? prevSelectedFilters.filter((item: string) => item !== filter)
          : [...prevSelectedFilters, filter]
      );
    }
  };

  const selectCourse = (course: string) => {
    setSelectedCourse(course);
    setSelectedFilters((prevSelectedFilters: string[]) =>
      prevSelectedFilters.includes(course)
        ? prevSelectedFilters.filter((item: string) => item !== course)
        : [...prevSelectedFilters, course]
    );
    setModalVisible(false);
  };

  const removeSelectedCourse = () => {
    setSelectedCourse('Cursos');
    setSelectedFilters((prevSelectedFilters) =>
      prevSelectedFilters.filter((item) => item !== selectedCourse)
    );
  };

  const filteredCourses = cursos.filter((course) =>
    course.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/UfamExplore.png')}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilters.includes(filter) && styles.filterButtonSelected,
            ]}
            onPress={() => toggleFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilters.includes(filter) && styles.filterTextSelected,
              ]}
            >
              {filter}
            </Text>
            {filter === selectedCourse && filter !== 'Cursos' && (
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="#FFF"
                onPress={removeSelectedCourse}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          name="file-search-outline"
          size={100}
          color="#7E7E7E"
        />
        <Text style={styles.infoText}>
          Filtre por área, curso ou publicações recentes
        </Text>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#002E7D',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#00186DDA',
  },
  filterText: {
    color: '#002E7D',
  },
  filterTextSelected: {
    color: '#FFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#7E7E7E',
    fontSize: 16,
    textAlign: 'center',
  },
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

export default FilteredFeed;
