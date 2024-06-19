import { Profiles, UserInitialStateType } from "./types";

export const UserInitialState: UserInitialStateType = {
  profile: {
    id: 0,
    nome: Profiles.INTERNO,
  },
  user: {
    id: "",
    perfilId: 1,
    nome: "",
    username: "",
    email: "",
    senha: "",
    curso: "",
  },
};
