import { Profiles, UserInitialStateType } from "./types";

export const UserInitialState: UserInitialStateType = {
  profile: {
    id: "",
    nome: Profiles.INTERNO,
  },
  user: {
    perfilId: 1,
    nome: "",
    username: "",
    email: "",
    senha: "",
    funcao: "",
  },
};
