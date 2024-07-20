import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(nome: string) {
    return this.prisma.tag.create({
      data: { nome },
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
  async findCoursesByAreaId(areaId: string): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: { areaId },
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

  async findByNames(names: string[]) {
    return this.prisma.tag.findMany({
      where: {
        nome: {
          in: names,
        },
      },
    });
  }

  async createMany(names: string[]) {
    const createdTags = [];
    for (const name of names) {
      const tag = await this.prisma.tag.create({
        data: { nome: name },
      });
      createdTags.push(tag);
    }
    return createdTags;
  }
}
