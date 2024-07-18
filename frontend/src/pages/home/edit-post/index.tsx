import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { useSelector } from 'react-redux';
import { BlueButton } from '../../../components/blue-button';
import { CustomInput } from '../../../components/inputs';
import ConfirmationModal from '../../../components/modals/confirm-modal';
import { FeedScreenNavigationProp } from '../../../routes/types';
import { editPost } from '../../../services/api';
import { IEditPostRequest } from '../../../services/types';
import { IStore } from '../../../store';
import { updateCurrentPost } from '../../../store/post/actions';
import { styles } from './style';

export const EditPostScreen = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { fotoPerfil } = useSelector((state: IStore) => state.user.user);
  const [loading, setLoading] = useState(false);
  const post = useSelector((state: IStore) => state.post.currentPost);
  const event = useSelector((state: IStore) => state.event.evento);
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
      const updatePostDto: IEditPostRequest = {
        titulo: title,
        texto: text,
        eventoId: event?.id || undefined,
      };

      const response = await editPost(
        post.id,
        updatePostDto,
        image || undefined
      );

      if (response.status === 200) {
        Toast.show('Publicação atualizada com sucesso!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
        const updatedPost = {
          ...post,
          titulo: title,
          texto: text,
          imagemUrl: image || post.imagemUrl,
          eventoId: event?.id || undefined,
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

  const handleTagButtonPress = () => {
    Alert.alert(
      'Feature em andamento',
      'A edição de tags será uma feature futura.'
    );
  };

  const navigateToCreateEventScreen = () => {
    navigation.navigate('EditEventScreen');
  };

  const handleBackPress = () => {
    navigation.goBack();
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
        <Pressable onPress={handleBackPress} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.card}>
          <View style={styles.perfil}>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={styles.imagePerfil} />
            ) : (
              <MaterialCommunityIcons
                name="account"
                size={30}
                color="#000"
                style={styles.imagePerfil}
              />
            )}
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
          {event && (
            <Pressable
              onPress={navigateToCreateEventScreen}
              style={styles.eventInfoContainer}
            >
              <Text style={styles.eventTitle}>Evento Associado:</Text>
              <Text>Título: {event.titulo}</Text>
              <Text>Localização: {event.localizacao}</Text>
              <Text>Descrição: {event.descricao}</Text>
              <Text>
                Data Início:
                {`${new Date(event.dataInicio).toLocaleDateString()} ${new Date(
                  event.dataInicio
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </Text>
              <Text>
                Data Final:
                {`${new Date(event.dataFinal).toLocaleDateString()} ${new Date(
                  event.dataFinal
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </Text>
            </Pressable>
          )}
          <View style={styles.icones}>
            <View style={styles.iconWithLabel}>
              <AntDesign
                name="tago"
                size={24}
                color="darkblue"
                onPress={handleTagButtonPress}
              />
              <Text style={styles.iconLabel}>Editar Tags</Text>
            </View>
            <View style={styles.iconWithLabel}>
              <AntDesign
                name="calendar"
                size={24}
                color="darkblue"
                onPress={navigateToCreateEventScreen}
              />
              <Text style={styles.iconLabel}>Editar Evento</Text>
            </View>
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
