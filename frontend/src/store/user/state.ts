import { Profiles, UserInitialStateType } from "./types";

export const UserInitialState: UserInitialStateType = {
  profile: {
    id: 0,
    nome: Profiles.INTERNO,
  },
  user: {
    id: "",
    perfilId: 0,
    nome: "",
    username: "",
    email: "",
    curso: "",
  },
};
