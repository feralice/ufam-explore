import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { FeedScreenNavigationProp } from "../../../routes/types";
import { updateCurrentPost } from "../../../store/post/actions";
import { HashtagInPost } from "../../hashtags";
import { styles } from "../styles";
import { PostCardProps } from "../types";

export const PostCardNoInteraction = ({ post }: PostCardProps) => {
  const handleClick = () => {
    navigation.navigate("ExtendPostProfile");
    updateCurrentPost(post);
  };

  const navigation = useNavigation<FeedScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Pressable onPress={handleClick}>
          <View style={styles.userInfo}>
            {post.usuario?.fotoPerfil ? (
              <Image
                style={styles.imagePerfil}
                source={{ uri: post.usuario.fotoPerfil }}
              />
            ) : (
              <MaterialCommunityIcons
                name="account"
                size={30}
                color="#FFFFFF"
                style={styles.imagePerfil}
              />
            )}
            <Text>@{post.usuario?.username}</Text>
          </View>

          {post.imagemUrl && (
            <Image style={styles.imageStyle} source={{ uri: post.imagemUrl }} />
          )}

          <Text style={styles.title}>{post.titulo}</Text>
          <Text style={styles.text} numberOfLines={5}>
            {post.texto}
          </Text>

          {post.tags && post.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {post.tags.map((tag) => (
                <HashtagInPost key={tag.id} name={tag.nome} />
              ))}
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};
