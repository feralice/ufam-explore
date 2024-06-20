import { Postagem } from '@prisma/client';
import { PostRepository } from '../../infrastructure/repositories/post.repository';

export class GetPostByCourseTagService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(userId: string): Promise<Postagem[]> {
    const courseByPersonId = await this.postRepository.courseByPersonId(userId);
    return await this.postRepository.getByCourseTag(courseByPersonId.curso);
  }
}
