export interface CommentProp {
  id: string;
  username: string;
  text: string;
  photo: string;
  action: () => void;
}
