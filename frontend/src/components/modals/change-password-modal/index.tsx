import { View } from 'react-native';
import { BlueButton } from '../../blue-button';
import ConfirmationModal from '../confirm-modal';
import styles from './styles';

const ChangePasswordModal = () => {
  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={true}
        onClose={() => {}}
        onConfirm={() => {}}
        loading={false}
        text="Sua senha foi criada com sucesso!"
        showButtons={false}
      >
        <View>
          <BlueButton
            onPress={() => {}}
            loading={false}
            text={'ENTRAR'}
          ></BlueButton>
        </View>
      </ConfirmationModal>
    </View>
  );
};

export default ChangePasswordModal;
