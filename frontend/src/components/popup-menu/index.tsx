import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { FeedScreenNavigationProp } from '../../routes/types';
import { deletePost } from '../../services/api';
import { IStore } from '../../store';
import { handleAddToCalendar } from '../../utils/calendar-utils';
import ConfirmationModal from '../modals/confirm-modal';
import { SaveToCalendarModal } from '../modals/save-to-calendar-modal';
import { styles } from './styles';
import { Option } from './types';

const PopupMenu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [addedEvents, setAddedEvents] = useState<string[]>([]);

  const navigation = useNavigation<FeedScreenNavigationProp>();
  const post = useSelector((state: IStore) => state.post.currentPost);
  const currentUser = useSelector((state: IStore) => state.user.user);
  const event = useSelector((state: IStore) => state.event.evento);
  const isPostOwner = post?.usuario.id === currentUser.id;

  if (!isPostOwner && !event.id) {
    return null;
  }

  const handleDeletePost = async () => {
    setLoading(true);
    try {
      const response = await deletePost(post?.id ?? '');
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Post excluído com sucesso');
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o post');
    } finally {
      setLoading(false);
      setModalVisible(false);
      setVisible(false);
    }
  };

  const handleSavePost = () => {
    setVisible(false);
    alert('Salvando post');
  };

  const options: Option[] = [];

  if (event.id) {
    options.push({
      title: 'Adicionar ao calendário',
      icon: 'calendar',
      action: () =>
        post &&
        handleAddToCalendar(
          post,
          event,
          setCalendarModalVisible,
          addedEvents,
          setAddedEvents
        ),
    });
  }

  if (isPostOwner) {
    options.unshift(
      {
        title: 'Editar post',
        icon: 'pencil',
        action: () => {
          setVisible(false);
          navigation.navigate('EditPost');
        },
      },
      {
        title: 'Excluir post',
        icon: 'delete',
        action: () => {
          setModalVisible(true);
        },
      }
    );
  }

  return (
    <View style={styles.popupContainer}>
      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeletePost}
        text="Você tem certeza que deseja apagar o post?"
        loading={loading}
      />
      <SaveToCalendarModal
        visible={calendarModalVisible}
        onClose={() => setCalendarModalVisible(false)}
      />
      <Pressable onPress={() => setVisible(!visible)}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={32}
          color="darkblue"
        />
      </Pressable>

      <Modal transparent visible={visible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <SafeAreaView style={styles.safeAreaView} />
          <View style={styles.popup}>
            {options.map((op, i) => (
              <Pressable key={i} onPress={op.action}>
                <View style={styles.option}>
                  <MaterialCommunityIcons
                    name={op.icon}
                    size={24}
                    color="darkblue"
                  />
                  <Text style={styles.optionText}>{op.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default PopupMenu;
