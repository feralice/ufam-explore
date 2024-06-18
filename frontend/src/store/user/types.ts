export interface IProfile {
  id: number;
  nome: Profiles;
}

export enum Profiles {
  INTERNO = "INTERNO",
  EXTERNO = "EXTERNO",
}

export interface IUser {
  perfilId: number;
  nome: string;
  username: string;
  email: string;
  senha: string;
  funcao: string;
  fotoPerfil?: string;
  biografia?: string;
  cnpj?: string;
}

export type UserInitialStateType = {
  profile: IProfile;
  user: IUser;
};
