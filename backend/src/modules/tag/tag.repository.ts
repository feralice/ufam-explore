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
}
