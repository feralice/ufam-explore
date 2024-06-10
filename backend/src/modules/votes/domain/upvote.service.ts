import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from '../../post/infrastructure/repositories/post.repository';
import { UpvoteResponseDto } from '../application/upvote/dto/upvote-response.dto';
import { UpvoteRepository } from '../infrastructure/upvote.repository';

@Injectable()
export class UpvoteService {
  constructor(
    private readonly upvoteRepository: UpvoteRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async upvotePost(userId: string, postId: string): Promise<UpvoteResponseDto> {
    try {
      await this.verifyIfPostExists(postId);

      return await this.upvoteRepository.upvotePost(userId, postId);
    } catch (error) {
      this.handleUpvoteError(error);
    }
  }

  private async verifyIfPostExists(postId: string) {
    const post = await this.postRepository.getPostById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
  }

  async getUpvotesInAPost(postId: string) {
    return await this.upvoteRepository.getUpvotesCount(postId);
  }

  async deleteUpvote(userId: string, postId: string) {
    try {
      await this.verifyIfPostExists(postId);
      await this.upvoteRepository.deleteUpvote(userId, postId);
    } catch (error) {
      this.handleUpvoteError(error);
    }
  }

  private async ensureUserHasNotUpvoted(userId: string, postId: string) {
    const alreadyUpvoted =
      await this.upvoteRepository.verifyIfUserAlreadyUpvotedPost(
        userId,
        postId,
      );
    if (alreadyUpvoted) {
      throw new BadRequestException('Post already upvoted');
    }
  }

  private handleUpvoteError(error: any) {
    if (error.response?.statusCode !== HttpStatus.BAD_REQUEST) {
      throw new BadRequestException('Error upvoting post');
    }
    throw error;
  }
}
