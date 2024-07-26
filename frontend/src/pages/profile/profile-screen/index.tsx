import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ProfileScreenNavigationProp } from '../../../routes/types';
import { IStore } from '../../../store';
import { handleLogout } from '../../../utils/logout';
import { styles } from './styles';

export const ProfileScreen = () => {
  const handleProfilePicturePress = () => {
    Alert.alert(
      'Alterar foto de perfil',
      'Você pode alterar sua foto de perfil entrando em informações da conta e clicando na engrenagem para editar seu perfil'
    );
  };
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { username, fotoPerfil } = useSelector(
    (state: IStore) => state.user.user
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity
          onPress={handleProfilePicturePress}
          style={styles.profileImageContainer}
        >
          {fotoPerfil ? (
            <Image source={{ uri: fotoPerfil }} style={styles.profileImage} />
          ) : (
            <MaterialCommunityIcons name="account" size={80} color="#000" />
          )}
        </TouchableOpacity>
        <Text style={styles.profileName}>{username}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SavedPostsScreen')}
        >
          <MaterialIcons
            name="save-alt"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Publicações salvas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('UserPosts');
          }}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Minhas publicações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('DataUser');
          }}
        >
          <MaterialIcons
            name="account-circle"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Informações da conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <MaterialIcons
            name="logout"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
