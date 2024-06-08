export interface TagListProps {
  tags: string[];
  onEdit?: (index: number) => void;
  onRemove?: (index: number) => void;
  onAdd?: (tag: string) => void;
  selected?: boolean;
}
