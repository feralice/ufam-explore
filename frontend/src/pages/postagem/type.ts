import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/types";

export type PostForm = {
  titulo: string;
  texto: string;
};

export type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
