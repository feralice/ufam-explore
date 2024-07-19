import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCommentDto } from '../application/dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const { conteudo, usuarioId, postagemId } = createCommentDto;

    return this.prisma.comentario.create({
      data: {
        conteudo,
        usuarioId,
        postagemId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findByPost(postId: string) {
    return this.prisma.comentario.findMany({
      where: {
        postagemId: postId,
      },
      include: {
        usuario: {
          select: {
            username: true,
            fotoPerfil: true,
          },
        },
      },
    });
  }

  async delete(commentId: string) {
    return this.prisma.comentario.delete({
      where: {
        id: commentId,
      },
    });
  }
}
