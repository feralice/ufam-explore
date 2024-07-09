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
        data: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
