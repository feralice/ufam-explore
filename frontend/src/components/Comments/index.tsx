import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IStore } from '../../store';
import PopupComment from '../popup-comment';
import { styles } from './styles';
import { CommentProp } from './type';

export const Comments = ({ username, photo, text }: CommentProp) => {
  const { user } = useSelector((state: IStore) => state.user);
  const isCommentOwner = user.username === username;
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const dotsRef = useRef<View>(null);

  const handleDotsPress = () => {
    dotsRef.current?.measure((fx, fy, width, height, px, py) => {
      setModalPosition({ x: px - 9 * width, y: py - 0.5 * height });
      setShowModal(true);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <Image style={styles.imagePerfil} source={{ uri: photo }} />
      ) : (
        <MaterialCommunityIcons name="account" size={30} color="#000" />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.username}>@{username}</Text>
          {isCommentOwner && (
            <Pressable ref={dotsRef} onPress={handleDotsPress}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={16}
                color="#000"
              />
            </Pressable>
          )}
        </View>
        <Text style={styles.message}>{text}</Text>
      </View>
      {showModal && (
        <PopupComment
          position={modalPosition}
          visible={showModal}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};
