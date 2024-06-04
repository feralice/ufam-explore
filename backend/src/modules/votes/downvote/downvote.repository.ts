import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
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
  ): Promise<boolean> {
    const downvote = await this.prisma.downvote.findFirst({
      where: {
        usuarioId: userId,
        postagemId: postId,
      },
    });
    return !!downvote;
  }

  async getDownvotesCount(postId: string): Promise<number> {
    const downvote = await this.prisma.downvote.count({
      where: { postagemId: postId },
    });
    return downvote;
  }

  async deleteDownvote(userId: string, postId: string) {
    await this.prisma.downvote.deleteMany({
      where: {
        postagemId: postId,
        usuarioId: userId,
      },
    });
  }
}
