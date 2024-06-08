import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../domain/repositories/post.repository';
import { DeletePostResponseDto } from '../dto/delete/delete-post-response.dto';

@Injectable()
export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(postId: string): Promise<DeletePostResponseDto> {
    try {
      console.log(`Attempting to delete post with id: ${postId}`);
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
