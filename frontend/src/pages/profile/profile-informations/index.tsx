import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import PopupEdit from '../../../components/popup-edit';
import { FeedScreenNavigationProp } from '../../../routes/types';
import { IStore } from '../../../store';
import { styles } from './styles';

export const ProfileInformationScreen = () => {
  const user = useSelector((state: IStore) => state.user.user);
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const handleProfilePicturePress = () => {
    Alert.alert(
      'Alterar foto de perfil',
      'Você pode alterar sua foto de perfil clicando na engrenagem e indo para editar seu perfil'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Pressable
          onPress={handleProfilePicturePress}
          style={
            user.fotoPerfil ? styles.profileImage : styles.profileImageContainer
          }
        >
          {user.fotoPerfil ? (
            <Image
              source={{ uri: user.fotoPerfil }}
              style={styles.profileImage}
            />
          ) : (
            <MaterialCommunityIcons name="account" size={80} color="#000" />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={26} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.profileName}>{user.username}</Text>
        <PopupEdit />
      </View>

      <View>
        <Text style={styles.texto}>NOME</Text>
        <Text style={styles.textoAlternativo}>{user.nome}</Text>
        <Text style={styles.texto}>NOME DE USUÁRIO</Text>
        <Text style={styles.textoAlternativo}>{user.username}</Text>
        <Text style={styles.texto}>E-MAIL</Text>
        <Text style={styles.textoAlternativo}>{user.email}</Text>
        {user.perfilId === 1 && (
          <>
            <Text style={styles.texto}>CURSO</Text>
            <Text style={styles.textoAlternativo}>{user.curso}</Text>
          </>
        )}
      </View>
    </View>
  );
};
