import { Injectable } from '@nestjs/common';
import { Postagem } from '@prisma/client';
import { PostRepository } from '../../infrastructure/repositories/post.repository';

@Injectable()
export class GetPostByTagService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(tagName: string): Promise<Postagem[]> {
    return await this.postRepository.getByTag(tagName);
  }
}
