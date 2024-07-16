export interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  text: string;
  children?: React.ReactNode;
  showButtons?: boolean;
}
