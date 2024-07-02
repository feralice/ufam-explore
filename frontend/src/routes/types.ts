import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Post: undefined;
  ExtendPost: undefined;
  EditPost: undefined;
  AddTag: undefined;
  CreateEvent: undefined;
  Login: undefined;
  UserOption: undefined;
  InternalSignUp: undefined;
  ExternalSignUp: undefined;
  Profile: undefined;
  InformationUser: undefined;
  DataUser: undefined;
  SavedPostsScreen: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type FeedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
