import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../application/dto/create/create-user.dto';
import { UpdateUserDto } from '../application/dto/update/update-user.dto';

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
      curso,
      fotoPerfil,
      biografia,
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
        curso,
        fotoPerfil,
        biografia,
      },
    });
  }

  async getUserById(id: string): Promise<Usuario> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async updateUser(
    id: string,
    userData: UpdateUserDto,
    imageUrl?: string,
  ): Promise<Usuario> {
    const dataToUpdate: any = { ...userData };
    if (imageUrl) {
      dataToUpdate.fotoPerfil = imageUrl;
    }

    return this.prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async updateUserToken(id: string, data: Partial<Usuario>): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async findUserByResetToken(resetToken: string): Promise<Usuario> {
    return this.prisma.usuario.findFirst({
      where: {
        resetToken,
      },
    });
  }
  async getUserByEmail(email: string): Promise<Usuario> {
    return this.prisma.usuario.findUnique({
      where: {
        email,
      },
    });
  }
  async getUserByUsername(username: string): Promise<Usuario> {
    return this.prisma.usuario.findUnique({
      where: { username },
    });
  }

  async deleteUser(id: string): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
  
  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { senha: newPassword },
    });
  }
}
