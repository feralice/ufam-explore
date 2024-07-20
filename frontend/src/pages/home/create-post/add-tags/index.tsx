import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import FooterWithModals from '../../../../components/fotter-bottoms';
import TagList from '../../../../components/tags-select';
import { FeedScreenNavigationProp } from '../../../../routes/types';
import { getAllTags } from '../../../../services/api';
import { IStore } from '../../../../store';
import { setAllTags, setTagsForNewPost } from '../../../../store/post/actions';
import { styles } from './styles';

export const AddTagScreen = () => {
  const [localTags, setLocalTags] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [warning, setWarning] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const navigation = useNavigation<FeedScreenNavigationProp>();
  const allTags = useSelector((state: IStore) => state.post.tags);
  const tagsForNewPost = useSelector(
    (state: IStore) => state.post.tagsForNewPost
  );

  useFocusEffect(
    React.useCallback(() => {
      const combinedTags = new Set([
        ...tagsForNewPost.map((tag) => tag.nome),
        ...localTags,
      ]);
      setLocalTags([...combinedTags]);
    }, [tagsForNewPost])
  );

  useEffect(() => {
    const loadTags = async () => {
      setLoading(true);
      try {
        const response = await getAllTags();
        setAllTags(response.data);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
      setLoading(false);
    };
    loadTags();
  }, []);

  const searchTag = (input: string) => {
    setIsSearching(true);
    const searchText = input.trim().toLowerCase();
    if (searchText === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    const results = allTags
      .filter((tag) => tag.nome.toLowerCase().includes(searchText))
      .map((tag) => tag.nome);
    setSearchResults(results);
    setIsSearching(false);
  };

  const addTag = () => {
    const trimmedText = text.trim();
    if (trimmedText !== '') {
      const existingTagIndex = localTags.findIndex(
        (tag) => tag.toLowerCase() === trimmedText.toLowerCase()
      );
      if (existingTagIndex !== -1) {
        setWarning('Você já adicionou essa tag.');
        setTimeout(() => setWarning(''), 3000);
      } else {
        if (editIndex !== null) {
          const newTags = [...localTags];
          newTags[editIndex] = trimmedText;
          setLocalTags(newTags);
          setEditIndex(null);
        } else {
          setLocalTags([...localTags, trimmedText]);
        }
        setText('');
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...localTags];
    newTags.splice(index, 1);
    setLocalTags(newTags);
  };

  const editTag = (index: number) => {
    const tagToEdit = localTags[index];
    setText(tagToEdit);
    setEditIndex(index);
  };

  const saveTags = () => {
    const selectedTags = localTags.map((tagName) => {
      const existingTag = allTags.find((t) => t.nome === tagName);
      if (existingTag) {
        return existingTag;
      } else {
        return { id: Date.now().toString(), nome: tagName, tipo: '' };
      }
    });

    setTagsForNewPost(selectedTags);
    navigation.goBack();
  };

  const areasTags = allTags.filter((tag) => tag.tipo === 'area');
  const cursosTags = allTags.filter((tag) => tag.tipo === 'curso');
  const outrasTags = allTags.filter(
    (tag) => tag.tipo !== 'area' && tag.tipo !== 'curso'
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.appContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.header}>Adicionar tags</Text>
        <View style={styles.infoContainer}>
          <Pressable onPress={toggleModal} style={styles.infoButton}>
            <AntDesign name="infocirlceo" size={24} color="black" />
          </Pressable>
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Adicione tags relevantes ao seu post. Se o conteúdo estiver
                relacionado a uma área ou curso específico, não se esqueça de
                incluir essas tags. Você pode buscar por tags existentes ou
                criar novas caso não encontre uma que corresponda ao seu
                interesse.
              </Text>
              <Pressable onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquise ou crie uma tag"
            value={text}
            onChangeText={(input) => {
              setText(input);
              searchTag(input);
            }}
            onSubmitEditing={addTag}
          />
          <Pressable style={styles.searchButton} onPress={addTag}>
            <AntDesign name="search1" size={20} color="black" />
          </Pressable>
        </View>
        {isSearching && <ActivityIndicator />}
        <Text style={styles.warning}>{warning}</Text>
        {localTags.length > 0 && (
          <Text style={styles.subheader}>Tags adicionadas</Text>
        )}
        <TagList
          tags={localTags}
          onEdit={editTag}
          onRemove={removeTag}
          selected
        />

        {searchResults.length > 0 && (
          <Text style={styles.subheader}>Resultados da Pesquisa</Text>
        )}
        <TagList
          tags={searchResults}
          onAdd={(tag) => {
            if (!localTags.includes(tag)) {
              setLocalTags([...localTags, tag]);
            } else {
              setWarning('Você já adicionou essa tag.');
              setTimeout(() => setWarning(''), 3000);
            }
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.subheader}>Áreas Disponíveis</Text>
            <TagList
              tags={areasTags.map((tag) => tag.nome)}
              onAdd={(tag) => {
                if (!localTags.includes(tag)) {
                  setLocalTags([...localTags, tag]);
                } else {
                  setWarning('Você já adicionou essa tag.');
                  setTimeout(() => setWarning(''), 3000);
                }
              }}
            />
            <Text style={styles.subheader}>Cursos Disponíveis</Text>
            <TagList
              tags={cursosTags.map((tag) => tag.nome)}
              onAdd={(tag) => {
                if (!localTags.includes(tag)) {
                  setLocalTags([...localTags, tag]);
                } else {
                  setWarning('Você já adicionou essa tag.');
                  setTimeout(() => setWarning(''), 3000);
                }
              }}
            />
            <Text style={styles.subheader}>Outras Tags</Text>
            <TagList
              tags={outrasTags.map((tag) => tag.nome)}
              onAdd={(tag) => {
                if (!localTags.includes(tag)) {
                  setLocalTags([...localTags, tag]);
                } else {
                  setWarning('Você já adicionou essa tag.');
                  setTimeout(() => setWarning(''), 3000);
                }
              }}
            />
          </>
        )}
      </ScrollView>
      <FooterWithModals
        onCancel={() => navigation.goBack()}
        onSave={saveTags}
      />
    </View>
  );
};

export default AddTagScreen;
