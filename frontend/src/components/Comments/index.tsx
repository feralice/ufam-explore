import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { CommentProp } from './type';

export const Comments = ({ name, photo, text, action }: CommentProp) => {
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
          <Pressable onPress={action}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={16}
              color="#000"
            />
          </Pressable>
        </View>
        <Text style={styles.message}>{text}</Text>
      </View>
    </View>
  );
};
