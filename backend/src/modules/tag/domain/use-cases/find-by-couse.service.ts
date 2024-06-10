import { Tag } from '@prisma/client';
import { TagRepository } from '../../infrastructure/tag.repository';

export class FindByCourseService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getTagsByCourse(): Promise<Tag[]> {
    return this.tagRepository.getTagsByCurso();
  }
}
