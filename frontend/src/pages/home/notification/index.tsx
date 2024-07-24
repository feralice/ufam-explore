import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import { PostCardNoInteraction } from "../../../components/post-card/no-interaction";
import { getSavedPosts } from "../../../components/post-card/no-interaction/selectors";
import { FeedScreenNavigationProp } from "../../../routes/types";
import { styles } from "./style";
import { NotificationItem } from "../../../components/notification-box";

const Notification = () => {
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

      <Text style={[styles.title, { position: "absolute", bottom: "93%" }]}>
        Notificações
      </Text>

      <NotificationItem
        username={"Jo"}
        notificationType={"deu downvote na sua postagem"}
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></NotificationItem>
      <NotificationItem
        username={"Fer"}
        notificationType={"deu downvote na sua postagem"}
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></NotificationItem>
    </SafeAreaView>
  );
};

export default Notification;
