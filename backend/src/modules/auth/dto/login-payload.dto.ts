import { Usuario } from "@prisma/client";

export class LoginPayload {
  id: string;
  typeUser: number;

  constructor(user: Usuario) {
    this.id = user.id;
    this.typeUser = user.perfilId;
  }
}