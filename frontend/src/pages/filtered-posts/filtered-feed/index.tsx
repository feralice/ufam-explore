import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AreaModal from '../../../components/modals/filters/area';
import CursoModal from '../../../components/modals/filters/course';
import TempoModal from '../../../components/modals/filters/time';
import { getFilteredPosts } from '../../../services/api';
import { cursos } from '../../../utils/courses';
import { styles } from './styles';

const areas = ['Biológicas', 'Exatas', 'Humanas'];
const tempos = ['Hoje', 'Esta semana', 'Este mês'];

const FilteredFeed = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('Cursos');
  const [selectedArea, setSelectedArea] = useState<string>('Área');
  const [selectedTempo, setSelectedTempo] = useState<string>('Tempo');
  const [posts, setPosts] = useState<any[]>([]);

  const filters = [selectedArea, selectedCourse, selectedTempo];

  const toggleFilter = (filter: string, type: string) => {
    if (type === 'curso' || type === 'area' || type === 'tempo') {
      setModalType(type);
      setModalVisible(true);
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

  const selectArea = (area: string) => {
    setSelectedArea(area);
    setSelectedFilters((prevSelectedFilters: string[]) =>
      prevSelectedFilters.includes(area)
        ? prevSelectedFilters.filter((item: string) => item !== area)
        : [...prevSelectedFilters, area]
    );
    setModalVisible(false);
  };

  const selectTempo = (tempo: string) => {
    setSelectedTempo(tempo);
    setSelectedFilters((prevSelectedFilters: string[]) =>
      prevSelectedFilters.includes(tempo)
        ? prevSelectedFilters.filter((item: string) => item !== tempo)
        : [...prevSelectedFilters, tempo]
    );
    setModalVisible(false);
  };

  const removeSelectedFilter = (filter: string) => {
    if (filter === selectedCourse) setSelectedCourse('Cursos');
    if (filter === selectedArea) setSelectedArea('Área');
    if (filter === selectedTempo) setSelectedTempo('Tempo');
    setSelectedFilters((prevSelectedFilters) =>
      prevSelectedFilters.filter((item) => item !== filter)
    );
  };

  const fetchFilteredPosts = async () => {
    try {
      const fetchedPosts = await getFilteredPosts(
        selectedArea !== 'Área' ? selectedArea : undefined,
        selectedCourse !== 'Cursos' ? selectedCourse : undefined,
        selectedTempo !== 'Tempo' ? selectedTempo : undefined
      );
      setPosts(fetchedPosts.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    }
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
            onPress={() => toggleFilter(filter, filter.toLowerCase())}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilters.includes(filter) && styles.filterTextSelected,
              ]}
            >
              {filter}
            </Text>
            {(filter === selectedCourse ||
              filter === selectedArea ||
              filter === selectedTempo) &&
              filter !== 'Cursos' &&
              filter !== 'Área' &&
              filter !== 'Tempo' && (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={20}
                  color="#FFF"
                  onPress={() => removeSelectedFilter(filter)}
                />
              )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.fetchButton} onPress={fetchFilteredPosts}>
        <Text style={styles.fetchButtonText}>Buscar Postagens</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.titulo}</Text>
            <Text style={styles.postText}>{item.texto}</Text>
          </View>
        )}
      />
      <CursoModal
        visible={modalVisible && modalType === 'curso'}
        onClose={() => setModalVisible(false)}
        selectCourse={selectCourse}
        searchText={searchText}
        setSearchText={setSearchText}
        filteredCourses={filteredCourses}
      />
      <AreaModal
        visible={modalVisible && modalType === 'area'}
        onClose={() => setModalVisible(false)}
        selectArea={selectArea}
        areas={areas}
      />
      <TempoModal
        visible={modalVisible && modalType === 'tempo'}
        onClose={() => setModalVisible(false)}
        selectTempo={selectTempo}
        tempos={tempos}
      />
    </View>
  );
};

export default FilteredFeed;
