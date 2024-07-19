export interface PopupCommentProps {
  id: string;
  position: { x: number; y: number };
  visible: boolean;
  onClose: () => void;
}
