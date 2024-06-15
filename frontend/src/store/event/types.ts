export interface IEvent {
  id?: string;
  dataInicio: string;
  dataFinal: string;
  localizacao: string;
  titulo: string;
  descricao?: string;
}

export interface IEventState {
  evento: IEvent;
}
