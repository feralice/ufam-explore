import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { DownvoteResponseDto } from './dto/downvote-response.dto';

@Injectable()
export class DownvoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async downvotePost(
    userId: string,
    postId: string,
  ): Promise<DownvoteResponseDto> {
    return await this.prisma.downvote.create({
      data: {
        postagemId: postId,
        usuarioId: userId,
      },
    });
  }

  async verifyIfUserAlreadyDownvotedPost(
    userId: string,
    postId: string,
  ): Promise<DownvoteResponseDto> {
    return await this.prisma.downvote.findFirst({
      where: {
        usuarioId: userId,
        postagemId: postId,
      },
    });
  }

  async getDownvotesCount(postId: string): Promise<number> {
    const downvote = await this.prisma.downvote.count({
      where: { postagemId: postId },
    });
    return downvote;
  }
}
