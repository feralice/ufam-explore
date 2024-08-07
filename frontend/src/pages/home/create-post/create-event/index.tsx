import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BlueButton } from '../../../../components/blue-button';
import { FeedScreenNavigationProp } from '../../../../routes/types';
import { createEvent } from '../../../../services/api';
import { setEventData } from '../../../../store/event/actions';
import { EventInitialState } from '../../../../store/event/state';
import { IEvent } from '../../../../store/event/types';
import { createEventSchema } from '../../../../utils/schemas/create-evet-schema';
import { styles } from './styles';

const lupa = require('../../../../assets/lupa.png');

const CreateEventScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<IEvent>({
    defaultValues: EventInitialState.evento,
    resolver: yupResolver(createEventSchema),
  });

  const navigation = useNavigation<FeedScreenNavigationProp>();

  const [showInicioPicker, setShowInicioPicker] = useState<boolean>(false);
  const [showFinalPicker, setShowFinalPicker] = useState<boolean>(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const handleDateChange =
    (type: 'dataInicio' | 'dataFinal') =>
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (type === 'dataInicio') setShowInicioPicker(false);
      if (type === 'dataFinal') setShowFinalPicker(false);
      if (selectedDate) {
        setValue(type, selectedDate.toISOString());
      }
    };

  const onSubmit = async () => {
    try {
      const values = getValues();
      const eventData = await createEvent(values);
      setEventData(eventData.data);
      Alert.alert('Sucesso', 'Evento criado com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o evento.');
    } finally {
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Image style={styles.image} source={lupa} />
        <Text style={styles.title}>Criação de eventos</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Data e Hora Inicial *</Text>
          <View style={styles.row}>
            <FontAwesome name="calendar" size={24} color="black" />
            <Controller
              control={control}
              name="dataInicio"
              render={({ field: { value } }) => (
                <View style={styles.dateTimeContainer}>
                  <Text>{new Date(value).toLocaleDateString()}</Text>
                  <Pressable
                    onPress={() => {
                      setShowInicioPicker(true);
                      setMode('date');
                    }}
                  >
                    <Text style={styles.editText}>Editar Data</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
          <View style={styles.row}>
            <FontAwesome name="clock-o" size={24} color="black" />
            <Controller
              control={control}
              name="dataInicio"
              render={({ field: { value } }) => (
                <View style={styles.dateTimeContainer}>
                  <Text>
                    {new Date(value).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setShowInicioPicker(true);
                      setMode('time');
                    }}
                  >
                    <Text style={styles.editText}>Editar Hora</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
          {errors.dataInicio && (
            <Text style={styles.errorText}>{errors.dataInicio.message}</Text>
          )}
          <Text style={styles.label}>Data e Hora Final *</Text>
          <View style={styles.row}>
            <FontAwesome name="calendar" size={24} color="black" />
            <Controller
              control={control}
              name="dataFinal"
              render={({ field: { value } }) => (
                <View style={styles.dateTimeContainer}>
                  <Text>{new Date(value).toLocaleDateString()}</Text>
                  <Pressable
                    onPress={() => {
                      setShowFinalPicker(true);
                      setMode('date');
                    }}
                  >
                    <Text style={styles.editText}>Editar Data</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
          <View style={styles.row}>
            <FontAwesome name="clock-o" size={24} color="black" />
            <Controller
              control={control}
              name="dataFinal"
              render={({ field: { value } }) => (
                <View style={styles.dateTimeContainer}>
                  <Text>
                    {new Date(value).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setShowFinalPicker(true);
                      setMode('time');
                    }}
                  >
                    <Text style={styles.editText}>Editar Hora</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
          {errors.dataFinal && (
            <Text style={styles.errorText}>{errors.dataFinal.message}</Text>
          )}
          {showInicioPicker && (
            <DateTimePicker
              value={new Date(getValues('dataInicio'))}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={handleDateChange('dataInicio')}
            />
          )}
          {showFinalPicker && (
            <DateTimePicker
              value={new Date(getValues('dataFinal'))}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={handleDateChange('dataFinal')}
            />
          )}
          <View style={styles.row}>
            <View style={styles.editContainer}>
              <MaterialIcons
                name="title"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Controller
                control={control}
                name="titulo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Adicionar título *"
                    style={styles.input}
                  />
                )}
              />
            </View>
          </View>
          {errors.titulo && (
            <Text style={styles.errorText}>{errors.titulo.message}</Text>
          )}
          <View style={styles.row}>
            <MaterialIcons
              name="subtitles"
              size={24}
              color="black"
              style={styles.icon}
            />
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
                  multiline
                  numberOfLines={3}
                />
              )}
            />
          </View>
          {errors.descricao && (
            <Text style={styles.errorText}>{errors.descricao.message}</Text>
          )}
          <View style={styles.row}>
            <FontAwesome
              name="map-marker"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Controller
              control={control}
              name="localizacao"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Adicionar local *"
                  style={styles.input}
                />
              )}
            />
          </View>
          {errors.localizacao && (
            <Text style={styles.errorText}>{errors.localizacao.message}</Text>
          )}
        </View>

        <BlueButton text="Salvar evento" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

export default CreateEventScreen;
