export interface IProfile {
  id: number;
  nome: Profiles;
}

export enum Profiles {
  INTERNO = "INTERNO",
  EXTERNO = "EXTERNO",
}

export interface IUser {
  id?: string;
  perfilId: number;
  nome: string;
  username: string;
  email: string;
  senha: string;
  curso?: string;
  fotoPerfil?: string;
  biografia?: string;
  passwordValidation?: string;
}

export type UserInitialStateType = {
  profile: IProfile;
  user: IUser;
};
