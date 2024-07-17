export type IconName =
  | "pencil"
  | "delete"
  | "cog";

export interface Option {
  title: string;
  icon: IconName;
  action: () => void;
}

