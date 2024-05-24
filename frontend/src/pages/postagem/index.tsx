import { Image, ScrollView, View } from "react-native";
import { FAB } from "react-native-paper";
import { BottomSelection } from "../../components/botton-selection";
import { PostCard } from "../../components/cards/index";

import { PublicacaoCard } from "../../components/publicacao/index";

const logoPhoto = require("../../assets/UfamExplore.png");

export const PostScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <PublicacaoCard></PublicacaoCard>
    </View>
  );
};
