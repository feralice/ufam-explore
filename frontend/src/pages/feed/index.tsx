<<<<<<< Updated upstream
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect } from "react";
import { FlatList, Image, ListRenderItem, View } from "react-native";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { BottomSelection } from "../../components/botton-selection";
import { PostCard } from "../../components/postCard";
import { RootStackParamList } from "../../routes/types";
import { getAllPosts } from "../../services/api";
import { IStore } from "../../store";
import { setAllPosts } from "../../store/post/actions";
import { IPost } from "../../store/post/types";
import { feedStyles } from "./styles";

const logoPhoto = require("../../assets/UfamExplore.png");
=======
import { ScreenHeight } from "@rneui/base";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../components/cards/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { PostCard } from "../../components/cards/index";
import { Botton_navigation } from "../../components/botton-selection";
import { PublicacaoCard } from "../../components/publicacao";
>>>>>>> Stashed changes

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export const FeedScreen = () => {
  const posts = useSelector((store: IStore) => store.post.posts);
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const fetchAllPosts = useCallback(async () => {
    try {
      //TODO: mudar o id quando login for feito
      const response = await getAllPosts(
        "1151183c-0355-43a2-91d0-f9f3453faf27"
      );
      setAllPosts(response.data); 
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllPosts();
    const intervalId = setInterval(fetchAllPosts, 30000);
    return () => clearInterval(intervalId);
  }, [fetchAllPosts]);

  const renderPost: ListRenderItem<IPost> = useCallback(
    ({ item }) => <PostCard key={item.id} post={item} />,
    []
  );

  return (
<<<<<<< Updated upstream
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={feedStyles.container}>
              <Image source={logoPhoto} />
            </View>
            <View style={feedStyles.bottomSelectionContainer}>
              <BottomSelection />
            </View>
          </>
        }
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />
      <View style={feedStyles.fabContainer}>
        <FAB
          style={feedStyles.fab}
          icon="pencil"
          color="white"
          onPress={() => navigation.navigate("Post")}
        />
=======
    <View>
      <View style={{ alignItems: "center", paddingTop: 10 }}>
        <Image source={require("../../../assets/tituloufam.png")}></Image>
      </View>

      <View style={{ padding: 30, marginTop: -40 }}>
        <Botton_navigation></Botton_navigation>
      </View>
      <View style={{ marginTop: 20 }}>
        <PublicacaoCard></PublicacaoCard>
>>>>>>> Stashed changes
      </View>
    </View>
  );
};
