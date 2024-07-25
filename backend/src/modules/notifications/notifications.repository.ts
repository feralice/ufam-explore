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
      select: {
        postagemId: true,
        usuario: {
          select: {
            username: true,
          },
        },
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
      select: {
        postagemId: true,
        usuario: {
          select: {
            username: true,
          },
        },
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
      select: {
        conteudo: true,
        postagemId: true,
        usuario: {
          select: {
            username: true,
          },
        },
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
      select: {
        postagemId: true,
        usuario: {
          select: {
            username: true,
          },
        },
      },
    });
  }
}
