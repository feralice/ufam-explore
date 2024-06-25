import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SavePostRepository {
  constructor(private prisma: PrismaService) {}

  async savePost(usuarioId: string, postagemId: string) {
    return this.prisma.salvar.create({
      data: {
        usuarioId,
        postagemId,
        data: new Date(),
      },
    });
  }
  async getSavedPostsByUser(usuarioId: string) {
    return this.prisma.salvar.findMany({
      where: {
        usuarioId,
      },
      include: {
        postagem: true,
      },
    });
  }
}
