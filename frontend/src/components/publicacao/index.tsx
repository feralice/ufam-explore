import React from 'react';
import { View, TextInput, Image, Button, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './styles';

const PublicacaoCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.Perfil}>
        <Image
          source={require('./assets/imagem-fundo.jpg')}
          style={styles.imagePerfil}
        />
        <Text> @nickname</Text>
        <AntDesign name="ellipsis1" size={24} color="darkblue"  style={{ marginLeft: 150 }}/>
        </View>
        <Image
          source={require('./assets/imagem-fundo.jpg')}
          style={styles.imagem}
        />
        <TextInput
          placeholder="Título..."
          style={styles.input}
        />
        <TextInput
          placeholder="Digite seu texto..."
          multiline
          style={[styles.input, styles.textArea]}
        />

        <View style={styles.Icones}>
          <AntDesign name="bars" size={24} color="darkblue" />
          <AntDesign name="team" size={24} color="darkblue" />
          <AntDesign name="calendar" size={24} color="darkblue" />
          <AntDesign name="pushpino" size={24} color="darkblue" />
          <AntDesign name="smileo" size={24} color="darkblue" />
        </View> 
      </View>

      <Button
      title="Publicar"
      color='darkblue'
    />
    </View>
    
  );
};

export default PublicacaoCard;