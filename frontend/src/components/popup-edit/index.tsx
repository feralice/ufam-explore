import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Modal, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FeedScreenNavigationProp } from '../../routes/types';
import { deleteUser } from '../../services/api';
import { IStore } from '../../store';
import { handleLogout } from '../../utils/logout';
import { ConfirmDeleteModal } from '../modals/delete-confirm-modal';
import { styles } from './styles';
import { Option } from './types';

const PopupEdit = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const { id } = useSelector((state: IStore) => state.user.user);

  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(true);
    hideModal();
  };

  const handleEditAccount = () => {
    navigation.navigate('EditProfileInformation');
    hideModal();
  };

  const removeUser = async () => {
    await deleteUser(id);
    handleLogout();
  };

  const options: Option[] = [
    {
      title: 'Editar conta',
      icon: 'pencil',
      action: handleEditAccount,
    },
    {
      title: 'Excluir conta',
      icon: 'delete',
      action: handleDeleteAccount,
    },
  ];

  return (
    <View style={styles.popupContainer}>
      <Pressable onPress={showModal}>
        <MaterialCommunityIcons
          name="cog"
          size={28}
          color="white"
          style={styles.cogIcon}
        />
      </Pressable>

      <Modal
        transparent
        visible={visible}
        onRequestClose={hideModal}
        animationType="fade"
      >
        <Pressable style={styles.modalOverlay} onPress={hideModal}>
          <SafeAreaView style={styles.safeAreaView} />
          <View style={styles.popup}>
            {options.map((op, i) => (
              <Pressable key={i} onPress={op.action}>
                <View style={styles.option}>
                  <MaterialCommunityIcons
                    name={op.icon}
                    size={24}
                    color="darkblue"
                  />
                  <Text style={styles.optionText}>{op.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <ConfirmDeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirmAction={removeUser}
        confirmationText="Conta excluída com sucesso"
        checkboxLabel="Sim, desejo desativar minha conta."
        additionalText="Essa ação não pode ser desfeita."
      />
    </View>
  );
};

export default PopupEdit;
