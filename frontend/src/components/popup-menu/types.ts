type IconName = "calendar" | "edit" | "save" | "delete" | "ellipsis1";

export interface Option {
  title: string;
  icon: IconName;
  action: () => void;
}
