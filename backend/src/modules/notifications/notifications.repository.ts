import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findUpvotesByUser(usuarioId: string) {
    return this.prisma.upvote.findMany({
      where: {
        postagem: {
          usuarioId,
        },
        NOT: {
          usuarioId,
        },
      },
      include: {
        usuario: true,
        postagem: true,
      },
    });
  }

  async findDownvotesByUser(usuarioId: string) {
    return this.prisma.downvote.findMany({
      where: {
        postagem: {
          usuarioId,
        },
        NOT: {
          usuarioId,
        },
      },
      include: {
        usuario: true,
        postagem: true,
      },
    });
  }

  async findCommentsByUser(usuarioId: string) {
    return this.prisma.comentario.findMany({
      where: {
        postagem: {
          usuarioId,
        },
        NOT: {
          usuarioId,
        },
      },
      include: {
        usuario: true,
        postagem: true,
      },
    });
  }

  async findSavedPostsByUser(usuarioId: string) {
    return this.prisma.salvar.findMany({
      where: {
        postagem: {
          usuarioId,
        },
        NOT: {
          usuarioId,
        },
      },
      include: {
        usuario: true,
        postagem: true,
      },
    });
  }
}
