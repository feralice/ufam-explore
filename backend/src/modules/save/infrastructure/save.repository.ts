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

  async verifyIfUserAlreadySavedPost(
    userId: string,
    postId: string,
  ): Promise<boolean> {
    const save = await this.prisma.salvar.findFirst({
      where: {
        usuarioId: userId,
        postagemId: postId,
      },
    });
    return save !== null;
  }

  async findSave(usuarioId: string, postagemId: string) {
    return this.prisma.salvar.findFirst({
      where: {
        usuarioId,
        postagemId,
      },
    });
  }
  async deleteSave(usuarioId: string, postagemId: string) {
    return await this.prisma.salvar.deleteMany({
      where: {
        usuarioId,
        postagemId,
      },
    });
  }
}
