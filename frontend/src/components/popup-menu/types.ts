export type IconName =
  | "pencil"
  | "delete"
  | "content-save"
  | "calendar"
  | "dots-horizontal";

export interface Option {
  title: string;
  icon: IconName;
  action: () => void;
}
