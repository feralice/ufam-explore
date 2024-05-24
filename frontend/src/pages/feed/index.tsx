import { Image, ScrollView, View } from "react-native";
import { FAB } from "react-native-paper";
import { BottomSelection } from "../../components/botton-selection";
import { PostCard } from "../../components/cards/index";
import { feedStyles } from "./styles";

const logoPhoto = require("../../assets/UfamExplore.png");

export const FeedScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View style={feedStyles.container}>
            <Image source={logoPhoto}></Image>
          </View>

          <View style={feedStyles.bottomSelectionContainer}>
            <BottomSelection />
          </View>

          <View>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
          </View>
        </View>
      </ScrollView>

      <View style={feedStyles.fabContainer}>
        <FAB
          style={feedStyles.fab}
          icon="pencil"
          color="white"
          onPress={() =>
            console.log("Colocar a navegação pra pagina de fazer postagem")
          }
        />
      </View>
    </View>
  );
};
