import { IPost } from "../store/post/types";

export type RootStackParamList = {
  Home: undefined;
  Post: undefined;
  ExtendPost: { post: IPost };
  EditPost: undefined;
  AddTag: undefined;
};
