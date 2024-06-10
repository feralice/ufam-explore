import { Tag } from '@prisma/client';
import { TagRepository } from '../../infrastructure/tag.repository';

export class FindOthersTagsService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getOthersTags(): Promise<Tag[]> {
    return this.tagRepository.getOtherTags();
  }
}
