import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(nome: string) {
    return this.prisma.tag.create({
      data: {
        nome,
      },
    });
  }

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async findByName(nome: string) {
    return this.prisma.tag.findFirst({
      where: {
        nome,
      },
    });
  }

  async findIdsByName(tags: string[]) {
    return this.prisma.tag.findMany({
      where: {
        nome: {
          in: tags,
        },
      },
      select: {
        id: true,
      },
    });
  }
}
