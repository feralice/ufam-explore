export interface IEvent {
  id?: string;
  dataInicio: Date;
  dataFinal: Date;
  localizacao: string;
  titulo: string;
  descricao?: string;
}

export interface IEventState {
  evento: IEvent;
}
