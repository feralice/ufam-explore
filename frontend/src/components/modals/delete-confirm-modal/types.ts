export interface ConfirmDeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmAction: () => Promise<void>;
  confirmationText: string;
  checkboxLabel: string;
  additionalText: string;
}
