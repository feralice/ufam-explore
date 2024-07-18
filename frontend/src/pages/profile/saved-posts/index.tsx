import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { PostCardNoInteraction } from '../../../components/post-card/no-interaction';
import { getSavedPosts } from '../../../components/post-card/no-interaction/selectors';
import { FeedScreenNavigationProp } from '../../../routes/types';
import { styles } from './styles';

const SavedPostsScreen = () => {
  const savedPosts = useSelector(getSavedPosts);
  const navigation = useNavigation<FeedScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="darkblue" />
      </Pressable>

      <Text style={styles.title}>Posts Salvos</Text>
      <FlatList
        data={savedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCardNoInteraction post={item} />}
      />
    </SafeAreaView>
  );
};

export default SavedPostsScreen;
