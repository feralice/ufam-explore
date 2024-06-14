import { IEventState } from "./types";

const dataInicio = new Date();

export const EventInitialState: IEventState = {
  evento: {
    dataInicio: dataInicio,
    dataFinal: new Date(dataInicio.getDay() + 1),
    localizacao: "",
    titulo: "",
  },
};
