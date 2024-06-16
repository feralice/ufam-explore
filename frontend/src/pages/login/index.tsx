import { KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Text, SafeAreaView, View, Button} from 'react-native';
import { Card } from 'react-native-paper';
import { styles } from './style'; 
import { BlueButton } from "../../components/blue-button";


const img_ufam = require('../../assets/LogoFaculdade.png')
const img = require('../../assets/UfamExplore.png')

const Login = () => {
  return (
    <KeyboardAvoidingView>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}> 
        <Image source={img_ufam}/>
        <Image source={img}/>
        </View>
  
        <View>

        <Text style={styles.text}>E-MAIL</Text>
         <TextInput
            placeholder="nome@domínio.com"          
            style={[styles.input, styles.textArea]}
          />

          <Text style={styles.text}>SENHA</Text>
          <TextInput
            placeholder="*******"          
            style={[styles.input, styles.textArea]}
          />

          <View style={styles.container}>

          </View>
          <BlueButton onPress={function (): void {
            throw new Error('Function not implemented.');
          } } text={'ENTRAR'}/>
        </View>

        <View style={styles.container}>
          <Text style={styles.textAbaixo}>Criar conta</Text>
          <Text style={styles.textAbaixo}>Esqueci minha senha</Text>
        </View>

        
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default Login;