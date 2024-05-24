export type ProfileType = {
  id: string;
  nome: Profiles;
};

export enum Profiles {
  INTERNO = "INTERNO",
  EXTERNO = "EXTERNO",
  EMPRESA = "EMPRESA",
}

export type UserType = {
  perfilId: number;
  nome: string;
  username: string;
  email: string;
  senha: string;
  funcao: string;
  fotoPerfil?: string;
  biografia?: string;
  cnpj?: string;
};

export type UserInitialStateType = {
  profile: ProfileType;
  user: UserType;
};
