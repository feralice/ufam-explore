import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { CommentProp } from './type';
import PopupComment from '../popup-comment';

export const Comments = ({ name, photo, text }: CommentProp) => {
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
          <Text style={styles.username}>@{name}</Text>
          <Pressable ref={dotsRef} onPress={handleDotsPress}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={16}
              color="#000"
            />
          </Pressable>
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
