import { IEventState } from "./types";

const dataInicio = new Date().toISOString();

export const EventInitialState: IEventState = {
  evento: {
    dataInicio: dataInicio,
    dataFinal: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
    localizacao: "",
    titulo: "",
  },
};

export const ClearEventData: IEventState = {
  evento: {
    dataInicio: "",
    dataFinal:"",
    localizacao: "",
    titulo: "",
  },
};
