import { eventSlice } from ".";
import { store } from "..";
import { EventType } from "./types";

export const setEventData = (eventData: EventType) => {
  store.dispatch(eventSlice.actions.setEventData(eventData));
};
