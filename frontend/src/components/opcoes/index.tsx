import React, { useState } from 'react';
import { TouchableOpacity, View, Modal, SafeAreaView, StyleSheet, Text } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import { styles } from "./styles";


const PopupMenu = () => {
  const [visible, setVisible] = useState(false);
  const options = [
    {
      title: '     Adicionar ao calendário',
      icon: 'calendar',
      action: () => alert("adicionando calendario")  
    },


    {
      title: 'Editar post',
      icon: 'edit',
      action: () => alert("editando post")  
    },


    {
      title: 'Salvar post',
      icon: 'save',
      action: () => alert("Salvando post")  
    },


    {
      title: 'Excluir post',
      icon: 'delete',
      action: () => alert("Excluindo post")  
    }
  ]


  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <AntDesign
          name="ellipsis1"
          size={24}
          color="darkblue"
          style={{ marginLeft: 500 }}
        />
      </TouchableOpacity>


      <Modal transparent visible={visible}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setVisible(false)}>
          <SafeAreaView style={{ flex: 1}} />
         
          <View style={styles.popup}>
            {options.map((op, i)=>(
              <TouchableOpacity key={i} onPress={() => op.action}>
             
              <View style={styles.option}>
             
              <AntDesign name={op.icon} size={24} color={"darkblue"}/>
              <Text>{op.title}</Text>
             
              </View>
              </TouchableOpacity>


            ))}
          </View>


        </TouchableOpacity>
      </Modal>
    </View>
  );
};


export default PopupMenu;