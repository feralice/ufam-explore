import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { UpvoteResponseDto } from './dto/upvote-response.dto';

@Injectable()
export class UpvoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upvotePost(userId: string, postId: string): Promise<UpvoteResponseDto> {
    return await this.prisma.upvote.create({
      data: {
        postagemId: postId,
        usuarioId: userId,
      },
    });
  }
  async verifyIfUserAlreadyUpvotedPost(
    postId: string,
    userId: string,
  ): Promise<boolean> {
    const upvote = await this.prisma.upvote.findFirst({
      where: {
        postagemId: postId,
        usuarioId: userId,
      },
    });

    return !!upvote;
  }

  async getUpvotesCount(postId: string): Promise<number> {
    const upvotesCount = await this.prisma.upvote.count({
      where: { postagemId: postId },
    });
    return upvotesCount;
  }

  async deleteUpvote(userId: string, postId: string): Promise<void> {
    await this.prisma.upvote.deleteMany({
      where: {
        postagemId: postId,
        usuarioId: userId,
      },
    });
  }
}
