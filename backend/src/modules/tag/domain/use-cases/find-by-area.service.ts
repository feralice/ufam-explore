import { Tag } from '@prisma/client';
import { TagRepository } from '../../infrastructure/tag.repository';

export class FindByAreaService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getTagsByArea(): Promise<Tag[]> {
    return this.tagRepository.getTagsByArea();
  }
}
