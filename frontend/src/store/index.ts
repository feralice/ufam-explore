import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { commentSlice } from './comment';
import { ICommentState } from './comment/types';
import { eventSlice } from './event';
import { IEventState } from './event/types';
import { notificationsReducer, NotificationState } from './notifications/slice';
import { postSlice } from './post';
import { PostInitialStateType } from './post/types';
import { userSlice } from './user';
import { UserInitialStateType } from './user/types';

const rootReducer = combineReducers({
  post: postSlice.reducer,
  event: eventSlice.reducer,
  user: userSlice.reducer,
  comment: commentSlice.reducer,
  notifications: notificationsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export interface IStore {
  post: PostInitialStateType;
  event: IEventState;
  user: UserInitialStateType;
  comment: ICommentState;
  notifications: NotificationState;
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
