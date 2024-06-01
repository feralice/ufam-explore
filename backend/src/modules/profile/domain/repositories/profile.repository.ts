import { CreateProfileDto } from '@modules/profile/application/dto/create-profile-request';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(profileData: CreateProfileDto) {
    return this.prisma.perfil.create({
      data: {
        nome: profileData.nome,
      },
    });
  }

  async findAll() {
    return this.prisma.perfil.findMany();
  }
}
