import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import AreaModal from '../../../components/modals/filters/area';
import CursoModal from '../../../components/modals/filters/course';
import TempoModal from '../../../components/modals/filters/time';
import { PostCard } from '../../../components/post-card';
import { IStore } from '../../../store';
import { IPost } from '../../../store/post/types';
import { areas, cursos, cursosPorArea, tempos } from '../../../utils/courses';
import { styles } from './styles';

const FilteredFeed = () => {
  const allPosts = useSelector((state: IStore) => state.post.posts);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('Curso');
  const [selectedArea, setSelectedArea] = useState<string>('Área');
  const [selectedTempo, setSelectedTempo] = useState<string>('Tempo');
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [showHelpText, setShowHelpText] = useState(false);

  const filters = useMemo(
    () => [
      { label: selectedArea, type: 'area' },
      { label: selectedCourse, type: 'curso' },
      { label: selectedTempo, type: 'tempo' },
    ],
    [selectedArea, selectedCourse, selectedTempo]
  );

  const filteredCourses = useMemo(() => {
    const cursosFiltrados =
      selectedArea === 'Área' ? cursos : cursosPorArea[selectedArea] || [];
    return cursosFiltrados.filter((course) =>
      course.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, selectedArea]);

  const updateFilters = useCallback((filter: string) => {
    setSelectedFilters((prevSelectedFilters) =>
      prevSelectedFilters.includes(filter)
        ? prevSelectedFilters.filter((item) => item !== filter)
        : [...prevSelectedFilters, filter]
    );
    setModalVisible(false);
    setShowHelpText(true);
  }, []);

  const selectCourse = useCallback(
    (course: string) => {
      setSelectedCourse(course);
      updateFilters(course);
    },
    [updateFilters]
  );

  const selectArea = useCallback(
    (area: string) => {
      setSelectedArea(area);
      setSelectedCourse('Curso');
      updateFilters(area);
    },
    [updateFilters]
  );

  const selectTempo = useCallback(
    (tempo: string) => {
      setSelectedTempo(tempo);
      updateFilters(tempo);
    },
    [updateFilters]
  );

  const toggleFilter = useCallback((filterType: string) => {
    setModalType(filterType);
    setModalVisible(true);
  }, []);

  const removeSelectedFilter = useCallback(
    (filter: string) => {
      if (filter === selectedCourse) setSelectedCourse('Curso');
      if (filter === selectedArea) setSelectedArea('Área');
      if (filter === selectedTempo) setSelectedTempo('Tempo');
      setSelectedFilters((prevSelectedFilters) =>
        prevSelectedFilters.filter((item) => item !== filter)
      );
      setShowHelpText(true);
    },
    [selectedCourse, selectedArea, selectedTempo]
  );

  const clearFilters = useCallback(() => {
    setSelectedFilters([]);
    setSelectedArea('Área');
    setSelectedCourse('Curso');
    setSelectedTempo('Tempo');
    setSearchText('');
    setPosts([]);
    setShowHelpText(false);
    setFirstLoad(true);
  }, []);

  const filterPosts = useCallback(() => {
    setLoading(true);
    let filteredPosts = allPosts;

    if (selectedArea !== 'Área') {
      const areaCourses = cursosPorArea[selectedArea] || [];
      filteredPosts = filteredPosts.filter((post: IPost) =>
        post.tags?.some(
          (tag) => tag.nome === selectedArea || areaCourses.includes(tag.nome)
        )
      );
    }

    if (selectedCourse !== 'Curso') {
      filteredPosts = filteredPosts.filter((post: IPost) =>
        post.tags?.some((tag) => tag.nome === selectedCourse)
      );
    }

    if (selectedTempo !== 'Tempo') {
      const currentDate = new Date();
      let dateCondition: Date;
      switch (selectedTempo) {
        case 'Hoje':
          dateCondition = new Date(currentDate.setHours(0, 0, 0, 0));
          break;
        case 'Esta semana':
          dateCondition = new Date(
            currentDate.setDate(currentDate.getDate() - 7)
          );
          break;
        case 'Este mês':
          dateCondition = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          break;
        default:
          dateCondition = new Date(currentDate);
      }
      filteredPosts = filteredPosts.filter(
        (post: IPost) =>
          post.createdAt && new Date(post.createdAt) >= dateCondition
      );
    }

    if (searchText) {
      filteredPosts = filteredPosts.filter(
        (post: IPost) =>
          post.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
          post.texto.toLowerCase().includes(searchText.toLowerCase()) ||
          post.tags?.some((tag) =>
            tag.nome.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }

    setPosts(filteredPosts);
    setLoading(false);
    setFirstLoad(false);
  }, [allPosts, selectedArea, selectedCourse, selectedTempo, searchText]);

  const renderPost = useCallback(
    ({ item }: { item: IPost }) => <PostCard key={item.id} post={item} />,
    []
  );

  const keyExtractor = useCallback((item: IPost) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Image
              style={styles.logo}
              source={require('../../../assets/UfamExplore.png')}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por título, texto, evento ou tags"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                setShowHelpText(true);
              }}
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
                      selectedFilters.includes(filter.label)
                        ? '#FFF'
                        : '#002E7D'
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
            {showHelpText && (
              <Text style={styles.helpText}>
                Clique em "Buscar" para aplicar os filtros selecionados.
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.fetchButton}
                onPress={filterPosts}
              >
                <Text style={styles.fetchButtonText}>Buscar</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPost}
        ListEmptyComponent={
          !firstLoad && !loading ? (
            <View style={styles.emptyStateContainer}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={80}
                color="#002E7D"
              />
              <Text style={styles.emptyStateText}>
                Nenhuma postagem encontrada
              </Text>
            </View>
          ) : firstLoad && !loading ? (
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
          ) : null
        }
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#002E7D" /> : null
        }
      />
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
