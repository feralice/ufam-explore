import { Injectable, NotFoundException } from '@nestjs/common';
import { Postagem } from '@prisma/client';
import { PostRepository } from '../../infrastructure/repositories/post.repository';

@Injectable()
export class GetPostByIdService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(postId: string): Promise<Postagem> {
    const post = await this.postRepository.getPostById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
