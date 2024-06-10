import { Injectable, NotFoundException } from '@nestjs/common';
import { DeletePostResponseDto } from '../../application/dto/delete/delete-post-response.dto';
import { PostRepository } from '../../infrastructure/repositories/post.repository';

@Injectable()
export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(postId: string): Promise<DeletePostResponseDto> {
    try {
      const post = await this.postRepository.deletePost(postId);
      if (!post) {
        throw new NotFoundException(
          'Post not found or not authorized to delete',
        );
      }
      return new DeletePostResponseDto('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}
