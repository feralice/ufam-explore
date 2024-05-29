import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from '../../../modules/post/post.repository';
import { DownvoteRepository } from './downvote.repository';
import { DownvoteResponseDto } from './dto/downvote-response.dto';

@Injectable()
export class DownvoteService {
  constructor(
    private readonly downvoteRepository: DownvoteRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async downvotePost(
    userId: string,
    postId: string,
  ): Promise<DownvoteResponseDto> {
    try {
      await this.verifyIfPostExists(postId);
      await this.ensureUserHasNotDownvoted(userId, postId);

      return await this.downvoteRepository.downvotePost(userId, postId);
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

  private async ensureUserHasNotDownvoted(userId: string, postId: string) {
    const alreadyUpvoted =
      await this.downvoteRepository.verifyIfUserAlreadyDownvotedPost(
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
