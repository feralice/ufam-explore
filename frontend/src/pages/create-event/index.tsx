import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BlueButton } from "../../components/blue-button";

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
  {
    /* Se possivel mude o estilo e organização pro style.ts e acho que falta deixar mais claro no design que é a data de inicio e de fim, 
    e se possivel, tem como nos lugares que precisamos mandar os valores pro back colocar um  value={nome do atributo no banco?} pq me ajuda na integração 
falta colocar a seta pra voltar tb
    */
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criação de eventos</Text>
      <View style={styles.card}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#003366",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dateTimeContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  editText: {
    color: "#003366",
    marginLeft: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
});

export default CreateEventScreen;
