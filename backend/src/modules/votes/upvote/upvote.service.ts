import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from 'src/modules/post/post.repository';
import { UpvoteResponseDto } from './dto/upvote-response.dto';
import { UpvoteRepository } from './upvote.repository';

@Injectable()
export class UpvoteService {
  constructor(
    private readonly upvoteRepository: UpvoteRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async upvotePost(userId: string, postId: string): Promise<UpvoteResponseDto> {
    try {
      await this.verifyIfPostExists(postId);
      await this.ensureUserHasNotUpvoted(userId, postId);

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
