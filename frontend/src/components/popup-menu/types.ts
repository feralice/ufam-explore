export type IconName =
  | 'pencil'
  | 'delete'
  | 'content-save'
  | 'calendar'
  | 'dots-horizontal'
  | 'bookmark';

export interface Option {
  title: string;
  icon: IconName;
  action: () => void;
}
