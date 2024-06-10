import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import FooterWithModals from "../../components/fotter-bottoms";
import TagList from "../../components/tags-select";
import { getAllTags } from "../../services/api";
import { IStore } from "../../store";
import { setAllTags, setTagsForNewPost } from "../../store/post/actions";
import { FeedScreenNavigationProp } from "../create-post/type";
import { styles } from "./styles";

export const AddTagScreen = () => {
  const [localTags, setLocalTags] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [warning, setWarning] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
        console.error("Failed to fetch tags:", error);
      }
      setLoading(false);
    };
    loadTags();
  }, []);

  const addTag = () => {
    if (text.trim() !== "") {
      if (localTags.includes(text.trim())) {
        setWarning("Você já adicionou essa tag.");
        setTimeout(() => setWarning(""), 3000);
      } else {
        if (editIndex !== null) {
          const newTags = [...localTags];
          newTags[editIndex] = text.trim();
          setLocalTags(newTags);
          setEditIndex(null);
        } else {
          setLocalTags([...localTags, text.trim()]);
        }
        setText("");
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
        return { id: Date.now().toString(), nome: tagName };
      }
    });

    setTagsForNewPost(selectedTags);
    navigation.goBack();
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
        <Text style={styles.header}>Editar tags</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquise ou crie uma tag"
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTag}
          />
          <Pressable style={styles.searchButton} onPress={addTag}>
            <AntDesign name="search1" size={20} color="black" />
          </Pressable>
        </View>
        <Text style={styles.warning}>{warning}</Text>
        <Text style={styles.subheader}>Tags adicionadas</Text>
        <TagList
          tags={localTags}
          onEdit={editTag}
          onRemove={removeTag}
          selected
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.subheader}>Tags disponíveis</Text>
            <TagList
              tags={allTags.map((tag) => tag.nome)}
              onAdd={(tag) => {
                if (!localTags.includes(tag)) {
                  setLocalTags([...localTags, tag]);
                } else {
                  setWarning("Você já adicionou essa tag.");
                  setTimeout(() => setWarning(""), 3000);
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
