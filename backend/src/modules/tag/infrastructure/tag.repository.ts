import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

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

  async getTagsByArea() {
    return this.prisma.area.findMany({
      include: {
        cursos: {
          include: {
            postagens: {
              include: {
                tags: true,
              },
            },
          },
        },
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

  async getTagsByCurso() {
    return this.prisma.curso.findMany({
      include: {
        postagens: {
          include: {
            tags: true,
          },
        },
      },
    });
  }

  async getOtherTags() {
    const tagsInCurso = await this.getTagsByCurso();
    const tagsInArea = await this.getTagsByArea();

    const allRelatedTagIds = new Set(
      [...tagsInCurso, ...tagsInArea].map((tag) => tag.id),
    );

    const otherTags = await this.prisma.tag.findMany({
      where: {
        id: {
          notIn: Array.from(allRelatedTagIds),
        },
      },
    });

    return otherTags;
  }
}
