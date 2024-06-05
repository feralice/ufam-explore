import AntDesign from "@expo/vector-icons/AntDesign";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { CustomInput } from "../../components/inputs";
import PopupMenu from "../../components/opcoes";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./style";
import { RootStackParamList } from "../../routes/types";
import { TextInput } from "react-native-paper";
const img = require("../../assets/img_test.jpg");

type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, "ExtendPost">;

export const PostScreenExtend = () => {
  const route = useRoute<PostDetailsScreenRouteProp>();
  const { post } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <View style={styles.cardContainer}>
        <View style={styles.userInfo}>
          <Image style={styles.imagePerfil} source={img} />
          <Text>@{post.usuario.username}</Text>
        </View>

        <View style={styles.alignItems}>
          {post.imagemUrl ? (
            <Image style={styles.imageStyle} source={{ uri: post.imagemUrl }} />
          ) : (
            <>
              <Text style={styles.title}>{post.titulo}</Text>
            </>
          )}
        </View>

        <View style={styles.interaction}>
          <Pressable style={styles.icon}>
            <Ionicons name="chatbubbles-outline" size={25} />
          </Pressable>

          <Pressable style={styles.icon}>
            <MaterialCommunityIcons
              name={
                post.userUpvoted ? "arrow-up-bold" : "arrow-up-bold-outline"
              }
              size={post.userUpvoted ? 26 : 24}
              color={post.userUpvoted ? "green" : "black"}
            />
            <Text>{post.upvotes}</Text>
          </Pressable>

          <Pressable style={styles.icon}>
            <MaterialCommunityIcons
              name={
                post.userDownvoted
                  ? "arrow-down-bold"
                  : "arrow-down-bold-outline"
              }
              size={post.userDownvoted ? 26 : 24}
              color={post.userDownvoted ? "red" : "black"}
            />
            <Text>{post.downvotes}</Text>
          </Pressable>

          <Pressable style={styles.icon}>
            <Ionicons name="bookmark-outline" size={25} />
          </Pressable>
        </View>
        <ScrollView>
          <Text style={styles.text}>{post.texto}</Text>
        </ScrollView>
      </View>
    </View>
  );
};
