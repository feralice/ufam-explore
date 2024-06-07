import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FooterWithModals from "../../components/fotter-bottoms";
import { getAllTags as fetchAllTags } from "../../services/api";
import { IStore } from "../../store";
import { setAllTags, setTagsForNewPost } from "../../store/post/actions";
import { Tag } from "../../store/post/types";
import { FeedScreenNavigationProp } from "../create-post/type";
import { styles } from "./styles";

export const AddTagScreen = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [warning, setWarning] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<FeedScreenNavigationProp>();
  const dispatch = useDispatch();
  const allTags = useSelector((state: IStore) => state.post.tags);

  useEffect(() => {
    const loadTags = async () => {
      setLoading(true);
      try {
        const response = await fetchAllTags();
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
      if (tags.includes(text.trim())) {
        setWarning("Você já adicionou essa tag.");
        setTimeout(() => setWarning(""), 3000);
      } else {
        if (editIndex !== null) {
          const newTags = [...tags];
          newTags[editIndex] = text.trim();
          setTags(newTags);
          setEditIndex(null);
        } else {
          setTags([...tags, text.trim()]);
        }
        setText("");
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const editTag = (index: number) => {
    const tagToEdit = tags[index];
    setText(tagToEdit);
    setEditIndex(index);
  };

  const saveTags = () => {
    const selectedTags = tags
      .map((tagName) => {
        return allTags.find((t) => t.nome === tagName);
      })
      .filter((tag): tag is Tag => Boolean(tag));

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
          <TouchableOpacity style={styles.searchButton} onPress={addTag}>
            <AntDesign name="search1" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.warning}>{warning}</Text>
        <Text style={styles.subheader}>Tags adicionadas</Text>
        <View style={styles.tagContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tagWrapper}>
              <TouchableOpacity
                onPress={() => editTag(index)}
                style={[styles.tag, styles.selectedTag]}
              >
                <AntDesign name="tag" size={14} color="white" />
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity
                  onPress={() => removeTag(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.subheader}>Tags disponíveis</Text>
            <View style={styles.tagContainer}>
              {allTags.map((tag, index) => (
                <View key={index} style={styles.tagWrapper}>
                  <TouchableOpacity
                    style={styles.tag}
                    onPress={() => {
                      if (!tags.includes(tag.nome)) {
                        setTags([...tags, tag.nome]);
                      } else {
                        setWarning("Você já adicionou essa tag.");
                        setTimeout(() => setWarning(""), 3000);
                      }
                    }}
                  >
                    <AntDesign name="tag" size={14} color="white" />
                    <Text style={styles.tagText}>{tag.nome}</Text>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
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
