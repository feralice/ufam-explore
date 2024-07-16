import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton } from '../../components/blue-button';
import { CustomInput } from '../../components/inputs';
import ConfirmationModal from '../../components/modals/confirm-modal';
import { FeedScreenNavigationProp } from '../../routes/types';
import { editPost } from '../../services/api';
import { IStore } from '../../store';
import { updateCurrentPost } from '../../store/post/actions';
import { styles } from './style';

const img = require('../../assets/img_test.jpg');

export const EditPostScreen = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const post = useSelector((state: IStore) => state.post.currentPost);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.titulo || '');
      setText(post.texto || '');
      setImage(post.imagemUrl || null);
    }
  }, [post]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post não encontrado.</Text>
      </View>
    );
  }

  const handleClick = async () => {
    setLoading(true);
    try {
      const updatePostDto = {
        titulo: title,
        texto: text,
      };

      const response = await editPost(
        post.id,
        updatePostDto,
        image || undefined
      );

      if (response.status === 200) {
        const updatedPost = {
          ...post,
          titulo: title,
          texto: text,
          imagemUrl: image || post.imagemUrl,
        };
        updateCurrentPost(updatedPost);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível editar o post. Tente novamente.');
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos da permissão para acessar a galeria para que isso funcione.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <ConfirmationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleClick}
          loading={loading}
          text="Você tem certeza que deseja fazer essas alterações?"
        />
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.card}>
          <View style={styles.perfil}>
            <Image source={img} style={styles.imagePerfil} />
            <Text>@{post.usuario?.username}</Text>
          </View>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagem} />
          ) : null}
          <Pressable onPress={handleImagePicker} style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>Editar Imagem</Text>
          </Pressable>
          <CustomInput
            placeholder="Título..."
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <CustomInput
            placeholder="Digite seu texto..."
            multiline
            height={200}
            style={[styles.input, styles.textArea]}
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <View style={styles.icones}>
            <AntDesign name="tago" size={24} color="darkblue" />
            <AntDesign name="calendar" size={24} color="darkblue" />
          </View>
        </View>

        <BlueButton
          onPress={() => setModalVisible(true)}
          loading={loading}
          text="Salvar Edição"
        />
      </View>
    </ScrollView>
  );
};
