import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: CreateUserDto): Promise<Usuario> {
    const {
      perfilId,
      nome,
      username,
      email,
      senha,
      funcao,
      fotoPerfil,
      biografia,
      cnpj,
    } = userData;

    return this.prisma.usuario.create({
      data: {
        perfil: {
          connect: { id: perfilId },
        },
        nome,
        username,
        email,
        senha,
        funcao,
        fotoPerfil,
        biografia,
        cnpj,
      },
    });
  }

  async getUserById(id: string): Promise<Usuario> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data: userData,
    });
  }

  async getUserByEmail(email: string): Promise<Usuario> {
    return this.prisma.usuario.findUnique({
      where: {
        email,
      },
    });
  }
}
