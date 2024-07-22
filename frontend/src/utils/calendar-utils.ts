// utils/calendar-utils.ts
import * as Calendar from 'expo-calendar';
import { Alert, Platform } from 'react-native';
import { IEvent } from '../store/event/types';

export const handleAddToCalendar = async (
  post: { eventoId?: string | null },
  event: IEvent,
  setCalendarModalVisible: (visible: boolean) => void,
  addedEvents: string[],
  setAddedEvents: (events: string[]) => void
) => {
  if (!post?.eventoId) {
    Alert.alert('Erro', 'Nenhum evento associado ao post.');
    return;
  }

  if (addedEvents.includes(post.eventoId)) {
    Alert.alert('Aviso', 'Este evento já foi adicionado ao calendário.');
    return;
  }

  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === 'granted') {
    let defaultCalendarSource: Calendar.Source;
    let calendarId: string;

    if (Platform.OS === 'ios') {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      defaultCalendarSource = defaultCalendar.source;
      calendarId = defaultCalendar.id;
    } else {
      defaultCalendarSource = {
        isLocalAccount: true,
        name: 'Ufam Explore Calendar',
        type: Calendar.SourceType.LOCAL,
      };
      calendarId = await Calendar.createCalendarAsync({
        title: 'Ufam Explore Calendar',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
    }

    const newEvent = {
      title: event.titulo,
      startDate: new Date(event.dataInicio),
      endDate: new Date(event.dataFinal),
      timeZone: 'GMT-4',
      location: event.localizacao,
      notes: event.descricao,
    };

    try {
      await Calendar.createEventAsync(calendarId, newEvent);
      setAddedEvents([...addedEvents, post.eventoId]);
      setCalendarModalVisible(true);
    } catch (error) {
      console.error('Erro ao criar evento no calendário:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o evento ao calendário.');
    }
  } else {
    Alert.alert('Permissão negada', 'Não foi possível acessar o calendário.');
  }
};
