import { IEvent } from "../store/event/types";

export const formatEventDto = (values: IEvent) => {
  return {
    ...values,
    dataInicio: values.dataInicio.toISOString(),
    dataFinal: values.dataFinal.toISOString(),
  };
};

export const parseEventDto = (dto: any): IEvent => {
  return {
    ...dto,
    dataInicio: new Date(dto.dataInicio),
    dataFinal: new Date(dto.dataFinal),
  };
};
