import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { BlueButton } from "../../components/blue-button";
import { styles } from "./styles";
import { FeedScreenNavigationProp } from "../create-post/type";
import { useNavigation } from "@react-navigation/native";

const lupa = require("../../assets/lupaf.png");
type FormData = {
  titulo: string;
  localizacao: string;
  descricao: string;
  dataInicio: Date;
  dataFinal: Date;
};

const CreateEventScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      titulo: "",
      localizacao: "",
      descricao: "",
      dataInicio: new Date(),
      dataFinal: new Date(),
    },
  });

  const [showInicioPicker, setShowInicioPicker] = useState<boolean>(false);
  const [showFinalPicker, setShowFinalPicker] = useState<boolean>(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const handleDateChange =
    (type: "dataInicio" | "dataFinal") =>
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (type === "dataInicio") setShowInicioPicker(false);
      if (type === "dataFinal") setShowFinalPicker(false);
      if (selectedDate) {
        setValue(type, selectedDate);
      }
    };

  const onSubmit = async (data: FormData) => {
    const eventData = getValues();
    try {
      // mandar pro back

      Alert.alert("Sucesso", "Evento criado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao criar o evento.");
    }
  };
  const navigation = useNavigation<FeedScreenNavigationProp>();
  {
    /* Se possivel mude o estilo e organização pro style.ts e acho que falta deixar mais claro no design que é a data de inicio e de fim, 
    e se possivel, tem como nos lugares que precisamos mandar os valores pro back colocar um  value={nome do atributo no banco?} pq me ajuda na integração 
falta colocar a seta pra voltar tb
    */
  }
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <Image
        style={{
          alignContent: "center",
          alignItems: "center",
          marginHorizontal: "auto",
          width: 100,
          height: 100,
        }}
        source={lupa}
      ></Image>
      <Text style={styles.title}>Criação de eventos</Text>
      <View style={styles.card}>
        <Text style={styles.TextExplain}>Data\Hora Inicial </Text>

        <View style={styles.row}>
          <FontAwesome name="calendar" size={24} color="black" />
          <Controller
            control={control}
            name="dataInicio"
            render={({ field: { value } }) => (
              <View style={styles.dateTimeContainer}>
                <Text> {value.toLocaleDateString()}</Text>
                <Text>{value.toLocaleTimeString()}</Text>
                <View style={styles.editContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowInicioPicker(true);
                      setMode("date");
                    }}
                  >
                    <Text style={styles.editText}>Data</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowInicioPicker(true);
                      setMode("time");
                    }}
                  >
                    <Text style={styles.editText}>Hora</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {errors.dataInicio && (
            <Text style={styles.errorText}>{errors.dataInicio.message}</Text>
          )}
        </View>
        <Text style={styles.TextExplain}>Data\Hora final</Text>
        <View style={styles.row}>
          <FontAwesome name="calendar" size={24} color="black" />
          <Controller
            control={control}
            name="dataFinal"
            render={({ field: { value } }) => (
              <View style={styles.dateTimeContainer}>
                <Text> {value.toLocaleDateString()}</Text>
                <Text>{value.toLocaleTimeString()}</Text>
                <View style={styles.editContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowFinalPicker(true);
                      setMode("date");
                    }}
                  >
                    <Text style={styles.editText}>Data</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowFinalPicker(true);
                      setMode("time");
                    }}
                  >
                    <Text style={styles.editText}>Hora</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {errors.dataFinal && (
            <Text style={styles.errorText}>{errors.dataFinal.message}</Text>
          )}
        </View>

        {showInicioPicker && (
          <DateTimePicker
            value={getValues("dataInicio")}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleDateChange("dataInicio")}
          />
        )}
        {showFinalPicker && (
          <DateTimePicker
            value={getValues("dataFinal")}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleDateChange("dataFinal")}
          />
        )}

        <View style={styles.row}>
          <MaterialIcons name="title" size={24} color="black" />
          <Controller
            control={control}
            name="titulo"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Adicionar título"
                style={styles.input}
              />
            )}
          />
          {errors.titulo && (
            <Text style={styles.errorText}>{errors.titulo.message}</Text>
          )}
        </View>

        <View style={styles.row}>
          <MaterialIcons name="subtitles" size={24} color="black" />
          <Controller
            control={control}
            name="descricao"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Adicionar descrição"
                style={styles.input}
              />
            )}
          />
          {errors.descricao && (
            <Text style={styles.errorText}>{errors.descricao.message}</Text>
          )}
        </View>

        <View style={styles.row}>
          <FontAwesome name="map-marker" size={24} color="black" />
          <Controller
            control={control}
            name="localizacao"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Adicionar local"
                style={styles.input}
              />
            )}
          />
          {errors.localizacao && (
            <Text style={styles.errorText}>{errors.localizacao.message}</Text>
          )}
        </View>
      </View>

      <BlueButton text="Salvar evento" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
export default CreateEventScreen;
