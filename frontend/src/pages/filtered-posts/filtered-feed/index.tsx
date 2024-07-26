import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
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
import { PostCard } from '../../../components/post-card';

const areas = ['Biológicas', 'Exatas', 'Humanas'];
const tempos = ['Hoje', 'Esta semana', 'Este mês'];

const FilteredFeed = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('Curso');
  const [selectedArea, setSelectedArea] = useState<string>('Área');
  const [selectedTempo, setSelectedTempo] = useState<string>('Tempo');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const filters = [
    { label: selectedArea, type: 'area' },
    { label: selectedCourse, type: 'curso' },
    { label: selectedTempo, type: 'tempo' },
  ];

  const toggleFilter = (filterType: string) => {
    setModalType(filterType);
    setModalVisible(true);
  };

  const selectCourse = (course: string) => {
    setSelectedCourse(course);
    updateFilters(course);
  };

  const selectArea = (area: string) => {
    setSelectedArea(area);
    updateFilters(area);
  };

  const selectTempo = (tempo: string) => {
    setSelectedTempo(tempo);
    updateFilters(tempo);
  };

  const updateFilters = (filter: string) => {
    setSelectedFilters((prevSelectedFilters: string[]) =>
      prevSelectedFilters.includes(filter)
        ? prevSelectedFilters.filter((item: string) => item !== filter)
        : [...prevSelectedFilters, filter]
    );
    setModalVisible(false);
  };

  const removeSelectedFilter = (filter: string) => {
    if (filter === selectedCourse) setSelectedCourse('Curso');
    if (filter === selectedArea) setSelectedArea('Área');
    if (filter === selectedTempo) setSelectedTempo('Tempo');
    setSelectedFilters((prevSelectedFilters) =>
      prevSelectedFilters.filter((item) => item !== filter)
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSelectedArea('Área');
    setSelectedCourse('Curso');
    setSelectedTempo('Tempo');
  };

  const fetchFilteredPosts = async () => {
    setFirstLoad(false);
    if (
      selectedArea === 'Área' &&
      selectedCourse === 'Curso' &&
      selectedTempo === 'Tempo'
    ) {
      Alert.alert('Erro', 'Por favor, selecione ao menos um filtro.');
      return;
    }
    setLoading(true);
    try {
      const fetchedPosts = await getFilteredPosts(
        selectedArea !== 'Área' ? selectedArea : undefined,
        selectedCourse !== 'Curso' ? selectedCourse : undefined,
        selectedTempo !== 'Tempo' ? selectedTempo : undefined
      );
      setPosts(fetchedPosts.data);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível buscar as postagens. Tente novamente.'
      );
      console.error('Erro ao buscar postagens:', error);
    } finally {
      setLoading(false);
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
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.type}
            style={[
              styles.filterButton,
              selectedFilters.includes(filter.label) &&
                styles.filterButtonSelected,
            ]}
            onPress={() => toggleFilter(filter.type)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilters.includes(filter.label) &&
                  styles.filterTextSelected,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {filter.label}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={
                selectedFilters.includes(filter.label) ? '#FFF' : '#002E7D'
              }
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fetchButton}
          onPress={fetchFilteredPosts}
        >
          <Text style={styles.fetchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#002E7D" />
      ) : selectedFilters.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <MaterialCommunityIcons
            name="file-search-outline"
            size={80}
            color="#002E7D"
          />
          <Text style={styles.emptyStateText}>
            Filtre por área, curso ou publicações recentes
          </Text>
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={80}
            color="#002E7D"
          />
          <Text style={styles.emptyStateText}>Nenhuma postagem encontrada</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
        />
      )}
      {modalType === 'curso' && (
        <CursoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectCourse={selectCourse}
          searchText={searchText}
          setSearchText={setSearchText}
          filteredCourses={filteredCourses}
        />
      )}
      {modalType === 'area' && (
        <AreaModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectArea={selectArea}
          areas={areas}
        />
      )}
      {modalType === 'tempo' && (
        <TempoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectTempo={selectTempo}
          tempos={tempos}
        />
      )}
    </View>
  );
};

export default FilteredFeed;