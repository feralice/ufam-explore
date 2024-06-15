import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { BlueButton } from "../../components/blue-button";

export const UserRegistration = () => {
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const equalPassword = passwordValidation == password;
  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const handleIconPress = () => {
    setIsFirstIcon(!isFirstIcon);
  };

  return (
    <ScrollView>
      <View style={styles.modalContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <ScrollView>
            <View style={styles.boxModal}>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons style={[styles.icon]} name="close-outline" />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.bigTitle}>TERMOS E CONDIÇÕES</Text>
                <Text style={styles.bigTitle}>GERAIS DE USO</Text>
              </View>
              <View>
                <Text style={styles.text}>
                  Os serviços do Ufam Explore são fornecidos pelas pessoa
                  físicas com os seguintes nomes: Fernanda Alice Farias Duarte
                  inscrito no CPF sob o n° 705.341.322-51, Jo Pereira dos Santos
                  inscrito no CPF sob o n° 025.774.722-26, Keren Guimarães Góes
                  inscrito no CPF sob o n° 032.757.742-80, Nilton da Silva
                  Nascimento inscrito no CPF sob o n° 035.530.492-93 e Sarah
                  Julia Rolim dos Santos inscrito no CPF sob o n°
                  706.194.482-02, titulares da propriedade intelectual sobre
                  software, website, aplicativos, conteúdos e demais ativos
                  relacionados à plataforma Ufam Explore.{" "}
                </Text>
                <Text style={styles.smallTitle}>1. Do objeto</Text>
                <Text style={styles.text}>
                  A plataforma visa licenciar o uso de seu software, website,
                  aplicativos e demais ativos de propriedade intelectual,
                  fornecendo ferramentas para auxiliar e dinamizar o dia a dia
                  dos seus usuários. A plataforma caracteriza-se pela prestação
                  do seguinte serviço: Divulgação de eventos e oportunidades na
                  universidade, permitindo criação de publicações para eventos,
                  interações com as publicações e adicionar eventos à
                  calendários virtuais.
                </Text>
                <Text style={styles.smallTitle}>2. Da aceitação</Text>
                <Text style={styles.text}>
                  O presente Termo estabelece obrigações contratadas de livre e
                  espontânea vontade, por tempo indeterminado, entre a
                  plataforma e as pessoas físicas ou jurídicas, usuárias do
                  aplicativo. Ao utilizar a plataforma o usuário aceita
                  integralmente as presentes normas e compromete-se a
                  observá-las, sob o risco de aplicação das penalidade cabíveis.
                  A aceitação do presente instrumento é imprescindível para o
                  acesso e para a utilização de quaisquer serviços fornecidos
                  pela empresa. Caso não concorde com as disposições deste
                  instrumento, o usuário não deve utilizá-los.
                </Text>
                <Text style={styles.smallTitle}>3. Do acesso dos usuários</Text>
                <Text style={styles.text}>
                  Serão utilizadas todas as soluções técnicas à disposição do
                  responsável pela plataforma para permitir o acesso ao serviço
                  24 (vinte e quatro) horas por dia, 7 (sete) dias por semana.
                  No entanto, a navegação na plataforma ou em alguma de suas
                  páginas poderá ser interrompida, limitada ou suspensa para
                  atualizações, modificações ou qualquer ação necessária ao seu
                  bom funcionamento.
                </Text>
                <Text style={styles.smallTitle}>4. Do cadastro</Text>
                <Text style={styles.text}>
                  O acesso às funcionalidades da plataforma exigirá a realização
                  de um cadastro prévio e, a depender dos serviços ou produtos
                  escolhidos, o pagamento de determinado valor. Ao se cadastrar
                  o usuário deverá informar dados completos, recentes e válidos,
                  sendo de sua exclusiva responsabilidade manter referidos dados
                  atualizados, bem como o usuário se compromete com a veracidade
                  dos dados fornecidos. O usuário se compromete a não informar
                  seus dados cadastrais e/ou de acesso à plataforma a terceiros,
                  responsabilizando-se integralmente pelo uso que deles seja
                  feito. Menores de 18 anos e aqueles que não possuírem plena
                  capacidade civil deverão obter previamente o consentimento
                  expresso de seus responsáveis legais para utilização da
                  plataforma e dos serviços ou produtos, sendo de
                  responsabilidade exclusiva dos mesmos o eventual acesso por
                  menores de idade e por aqueles que não possuem plena
                  capacidade civil sem a prévia autorização. Mediante a
                  realização do cadastro o usuário declara e garante
                  expressamente ser plenamente capaz, podendo exercer e usufruir
                  livremente dos serviços e produtos. O usuário deverá fornecer
                  um endereço de e-mail válido, através do qual o site realizará
                  todas comunicações necessárias. Após a confirmação do
                  cadastro, o usuário possuirá um login e uma senha pessoal, a
                  qual assegura ao usuário o acesso individual à mesma. Desta
                  forma, compete ao usuário exclusivamente a manutenção de
                  referida senha de maneira confidencial e segura, evitando o
                  acesso indevido às informações pessoais. Toda e qualquer
                  atividade realizada com o uso da senha será de
                  responsabilidade do usuário, que deverá informar prontamente
                  em caso de uso indevido da respectiva senha. Não será
                  permitido ceder, vender, alugar ou transferir, de qualquer
                  forma, a conta, que é pessoal e intransferível. Caberá ao
                  usuário assegurar que o seu equipamento seja compatível com as
                  características técnicas que viabilize a utilização da
                  plataforma e dos serviços ou produtos. O usuário poderá, a
                  qualquer tempo, requerer o cancelamento de seu cadastro junto
                  ao aplicativo Ufam Explore. O seu descadastramento será
                  realizado o mais rapidamente possível, desde que não sejam
                  verificados débitos em aberto. O usuário, ao aceitar os Termos
                  e Política de Privacidade, autoriza expressamente a plataforma
                  a coletar, usar, armazenar, tratar, ceder ou utilizar as
                  informações derivadas do uso dos serviços, do site e quaisquer
                  plataformas, incluindo todas as informações preenchidas pelo
                  usuário no momento em que realizar ou atualizar seu cadastro,
                  além de outras expressamente descritas na Política de
                  Privacidade que deverá ser autorizada pelo usuário.
                </Text>
                <Text style={styles.smallTitle}>5. Do suporte</Text>
                <Text style={styles.text}>
                  Em caso de qualquer dúvida, sugestão ou problema com a
                  utilização da plataforma, o usuário poderá entrar em contato
                  com o suporte, através do email jo.pereira@icomp.ufam.edu.br.
                  Estes serviços de atendimento ao usuário estarão disponíveis
                  nos seguintes dias e horários: Segunda a Sexta, 09h-17h.
                </Text>
                <Text style={styles.smallTitle}>6. Das responsabilidades</Text>
                <Text style={styles.text}>
                  É de responsabilidade do usuário: a) defeitos ou vícios
                  técnicos originados no próprio sistema do usuário; b) a
                  correta utilização da plataforma, dos serviços ou produtos
                  oferecidos, prezando pela boa convivência, pelo respeito e
                  cordialidade entre os usuários; c) pelo cumprimento e respeito
                  ao conjunto de regras disposto nesse Termo de Condições Geral
                  de Uso, na respectiva Política de Privacidade e na legislação
                  nacional e internacional; d) pela proteção aos dados de acesso
                  à sua conta/perfil (login e senha). É de responsabilidade da
                  plataforma Ufam Explore: a) indicar as características do
                  serviço ou produto; b) os defeitos e vícios encontrados no
                  serviço ou produto oferecido desde que lhe tenha dado causa;
                  c) as informações que foram por ele divulgadas, sendo que os
                  comentários ou informações divulgadas por usuários são de
                  inteira responsabilidade dos próprios usuários; d) os
                  conteúdos ou atividades ilícitas praticadas através da sua
                  plataforma. A plataforma não se responsabiliza por links
                  externos contidos em seu sistema que possam redirecionar o
                  usuário à ambiente externo a sua rede. Não poderão ser
                  incluídos links externos ou páginas que sirvam para fins
                  comerciais ou publicitários ou quaisquer informações ilícitas,
                  violentas, polêmicas, pornográficas, xenofóbicas,
                  discriminatórias ou ofensivas.
                </Text>
                <Text style={styles.smallTitle}>7. Dos direitos autorais</Text>
                <Text style={styles.text}>
                  O presente Termo de Uso concede aos usuários uma licença não
                  exclusiva, não transferível e não sublicenciável, para acessar
                  e fazer uso da plataforma e dos serviços e produtos por ela
                  disponibilizados. A estrutura do site ou aplicativo, as
                  marcas, logotipos, nomes comerciais, layouts, gráficos e
                  design de interface, imagens, ilustrações, fotografias,
                  apresentações, vídeos, conteúdos escritos e de som e áudio,
                  programas de computador, banco de dados, arquivos de
                  transmissão e quaisquer outras informações e direitos de
                  propriedade intelectual de Jo Pereira dos Santos, observados
                  os termos da Lei da Propriedade Industrial (Lei nº 9.279/96),
                  Lei de Direitos Autorais (Lei n° 9.610/98) e Lei do Software
                  (Lei n° 9.609/98), estão devidamente reservados. Este Termo de
                  Uso não cede ou transfere ao usuário qualquer direito, de modo
                  que o acesso não gera qualquer direito de propriedade
                  intelectual ao usuário, exceto pela licença limitada ora
                  concedida. O uso da plataforma pelo usuário é pessoal,
                  individual e intransferível, sendo vedado qualquer uso não
                  autorizado, comercial ou não-comercial. Tais usos consistirão
                  em violação dos direitos de propriedade intelectual de Jo
                  Pereira dos Santos, puníveis nos termos da legislação
                  aplicável.
                </Text>
                <Text style={styles.smallTitle}>8. Das sanções</Text>
                <Text style={styles.text}>
                  Sem prejuízo das demais medidas legais cabíveis, Jo Pereira
                  dos Santos poderá, a qualquer momento, advertir, suspender ou
                  cancelar a conta do usuário: a) que violar qualquer
                  dispositivo do presente Termo; b) que descumprir os seus
                  deveres de usuário; c) que tiver qualquer comportamento
                  fraudulento, doloso ou que ofenda a terceiros.
                </Text>
                <Text style={styles.smallTitle}>9. Da rescisão</Text>
                <Text style={styles.text}>
                  A não observância das obrigações pactuadas neste Termo de Uso
                  ou da legislação aplicável poderá, sem prévio aviso, ensejar a
                  imediata rescisão unilateral por parte de Jo Pereira dos
                  Santos e o bloqueio de todos os serviços prestados ao usuário.
                </Text>
                <Text style={styles.smallTitle}>10. Das alterações</Text>
                <Text style={styles.text}>
                  Os itens descritos no presente instrumento poderão sofrer
                  alterações, unilateralmente e a qualquer tempo, por parte de
                  Jo Pereira dos Santos, para adequar ou modificar os serviços,
                  bem como para atender novas exigências legais. As alterações
                  serão veiculadas pelo pelo aplicativo Ufam Explore e o usuário
                  poderá optar por aceitar o novo conteúdo ou por cancelar o uso
                  dos serviços, caso seja assinante de algum serviço.
                </Text>
                <Text style={styles.smallTitle}>
                  11. Da política de privacidade
                </Text>
                <Text style={styles.text}>
                  Além do presente Termo, o usuário deverá consentir com as
                  disposições contidas na respectiva Política de Privacidade a
                  ser apresentada a todos os interessados dentro da interface da
                  plataforma.
                </Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
      <View style={styles.container}>
        <Text style={[styles.textStyle, { marginTop: 20 }]}>Nome</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={{ padding: 10, width: "100%" }}
            placeholder="Digite seu Nome"
            value={name}
            onChangeText={setName}
          ></TextInput>
        </View>
        <Text style={styles.textStyle}>Nome do Usuário</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={{ padding: 10, width: "100%" }}
            placeholder="Digite seu  Nome de Usuário"
            value={userName}
            onChangeText={setUserName}
          ></TextInput>
        </View>
        <Text style={styles.textStyle}>Email</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={{ padding: 10, width: "100%" }}
            placeholder="Digite seu  email"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>
        <Text style={styles.textStyle}>Senha</Text>
        <View style={styles.boxInput}>
          <TextInput
            style={{ padding: 10, width: "80%" }}
            secureTextEntry={hidePassword}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            maxLength={16}
          ></TextInput>
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.textStyle}>Confirmar Senha</Text>
        <View
          style={[
            styles.boxInput,
            {
              backgroundColor: equalPassword
                ? "rgba(0, 0, 139, 0.2)"
                : "rgba(255, 0, 0, 0.2)",
            },
          ]}
        >
          <TextInput
            style={{ padding: 10, width: "80%" }}
            secureTextEntry={hidePassword}
            placeholder="Digite sua senha"
            value={passwordValidation}
            onChangeText={setPasswordValidation}
            maxLength={16}
          ></TextInput>
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {equalPassword ? null : (
          <Text
            style={{
              color: "red",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 150,
            }}
          >
            Senha diferente
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            paddingTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleIconPress}
            style={{ flexDirection: "column" }}
          >
            {isFirstIcon ? (
              <Ionicons style={styles.icon} name="checkbox-outline" />
            ) : (
              <Ionicons style={styles.icon} name="checkbox" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              Concordo com os termos de uso
            </Text>
          </TouchableOpacity>
        </View>
        <BlueButton
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
          text={"CRIAR CONTA"}
        />
      </View>
    </ScrollView>
  );
};
