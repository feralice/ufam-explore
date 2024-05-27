import { eventSlice } from ".";
import { store } from "..";
import { IEvent } from "./types";

export const setEventData = (eventData: IEvent) => {
  store.dispatch(eventSlice.actions.setEventData(eventData));
};
