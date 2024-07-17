import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Modal, Pressable, SafeAreaView, Text, View } from "react-native";
import { FeedScreenNavigationProp } from "../../routes/types";
import { Option } from "./types";
import { styles } from "./styles";

const PopupComment = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleDeleteComment = () => {
    console.log("deletando");
  };

  const options: Option[] = [
    {
      title: "Deletar comentario",
      icon: "delete",
      action: handleDeleteComment,
    },
  ];

  return (
    <View style={styles.popupContainer}>
      <Pressable onPress={showModal}>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={18}
          color="white"
          style={styles.cogDots}
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
    </View>
  );
};

export default PopupComment;
