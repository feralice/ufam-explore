import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { eventSlice } from "./event";
import { IEventState } from "./event/types";
import { postSlice } from "./post";
import { PostInitialStateType } from "./post/types";
import { userSlice } from "./user";
import { UserInitialStateType } from "./user/types";

const rootReducer = combineReducers({
  post: postSlice.reducer,
  event: eventSlice.reducer,
  user: userSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export interface IStore {
  post: PostInitialStateType;
  event: IEventState;
  user: UserInitialStateType;
}

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
