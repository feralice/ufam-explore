import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/config';
import { Notification } from './types';

export const fetchNotifications = createAsyncThunk<
  Notification[], // Tipo do valor de retorno
  string, // Tipo do argumento (usuarioId)
  { rejectValue: string } // Tipo do valor de rejeição
>(
  'notifications/fetchNotifications',
  async (usuarioId, { rejectWithValue }) => {
    try {
      const response = await api.get<Notification[]>(
        `/notifications/${usuarioId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
