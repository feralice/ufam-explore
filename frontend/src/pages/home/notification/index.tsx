import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationItem } from '../../../components/notification-box';
import { FeedScreenNavigationProp } from '../../../routes/types';
import { getPostById } from '../../../services/api';
import { AppDispatch, IStore } from '../../../store';
import { fetchNotifications } from '../../../store/notifications/actions';
import { setCurrentPost } from '../../../store/post/actions';
import { styles } from './style';

const Notification: React.FC = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const notifications = useSelector(
    (state: IStore) => state.notifications.notifications
  );
  const loadingNotifications = useSelector(
    (state: IStore) => state.notifications.loading
  );
  const error = useSelector((state: IStore) => state.notifications.error);
  const user = useSelector((state: IStore) => state.user.user);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotifications(user.id));
    }
  }, [user?.id, dispatch]);

  const handleNotificationPress = async (postId: string) => {
    setLoadingPost(true);
    try {
      const post = await getPostById(postId);
      setCurrentPost(post.data);
      navigation.navigate('ExtendPost');
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPost(false);
    }
  };

  if (loadingNotifications || loadingPost) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color="darkblue"
          />
        </Pressable>
        <Text style={styles.title}>Notificações</Text>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>
            Você ainda não tem nenhuma notificação.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) =>
            item.usuario && (
              <NotificationItem
                username={item.usuario.username}
                notificationType={item.message}
                onPress={() => handleNotificationPress(item.postagemId)}
              />
            )
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default Notification;
