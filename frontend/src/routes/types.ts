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
  UserRegistration: undefined;
  Profile: undefined;
  informationUser: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type FeedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
