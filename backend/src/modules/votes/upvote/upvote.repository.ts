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

  async verifyIfUserAlreadyUpvotedPost(userId: string, postId: string):Promise<UpvoteResponseDto> {
    return await this.prisma.upvote.findFirst({
      where: {
        usuarioId: userId,
        postagemId: postId,
      },
    });
  }

  async getUpvotesCount(postId: string): Promise<number> {
    const upvotesCount = await this.prisma.upvote.count({
      where: { postagemId: postId },
    });
    return upvotesCount;
  }
}
